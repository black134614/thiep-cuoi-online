import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";

export class BlobNotConfiguredError extends Error {
  constructor() {
    super("BLOB_NOT_CONFIGURED");
    this.name = "BlobNotConfiguredError";
  }
}

export class PersistWriteError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PersistWriteError";
  }
}

/** Đang chạy trên Vercel (serverless, filesystem read-only). */
export function isVercelRuntime(): boolean {
  return process.env.VERCEL === "1";
}

function getBlobToken(): string | undefined {
  return process.env.BLOB_READ_WRITE_TOKEN;
}

/** Có thể ghi Blob. */
export function hasBlobStorage(): boolean {
  return !!getBlobToken();
}

export function getStorageMode(): "blob" | "file" | "readonly" {
  if (hasBlobStorage()) return "blob";
  if (isVercelRuntime()) return "readonly";
  return "file";
}

export function assertCanPersist(): void {
  if (isVercelRuntime() && !hasBlobStorage()) {
    throw new BlobNotConfiguredError();
  }
}

async function loadBlobModule() {
  return import("@vercel/blob");
}

async function readJsonFromBlob<T>(pathname: string): Promise<T | null> {
  if (!hasBlobStorage()) return null;

  try {
    const { list } = await loadBlobModule();
    const { blobs } = await list({
      prefix: pathname,
      limit: 1,
      token: getBlobToken(),
    });

    const blob = blobs.find((b) => b.pathname === pathname) ?? blobs[0];
    if (!blob?.url) return null;

    const res = await fetch(blob.url, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

async function writeJsonToBlob<T>(pathname: string, data: T): Promise<void> {
  const token = getBlobToken();
  if (!token) {
    throw new BlobNotConfiguredError();
  }

  try {
    const { put } = await loadBlobModule();
    await put(pathname, JSON.stringify(data, null, 2), {
      access: "public",
      allowOverwrite: true,
      addRandomSuffix: false,
      contentType: "application/json",
      token,
    });
  } catch (err) {
    const detail =
      err instanceof Error ? `${err.name}: ${err.message}` : String(err);
    throw new PersistWriteError(detail);
  }
}

function readJsonFromFile<T>(filePath: string): T | null {
  if (isVercelRuntime()) return null;
  try {
    if (!existsSync(filePath)) return null;
    return JSON.parse(readFileSync(filePath, "utf-8")) as T;
  } catch {
    return null;
  }
}

function writeJsonToFile<T>(filePath: string, data: T): void {
  const dir = path.dirname(filePath);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

/** Đọc JSON: ưu tiên Blob, sau đó file local (chỉ dev). */
export async function loadJsonStore<T>(
  blobPathname: string,
  localPath: string,
): Promise<T | null> {
  const fromBlob = await readJsonFromBlob<T>(blobPathname);
  if (fromBlob !== null) return fromBlob;
  return readJsonFromFile<T>(localPath);
}

/** Ghi JSON lên Blob (Vercel) hoặc file (local). */
export async function saveJsonStore<T>(
  blobPathname: string,
  localPath: string,
  data: T,
): Promise<"blob" | "file"> {
  if (hasBlobStorage()) {
    await writeJsonToBlob(blobPathname, data);
    return "blob";
  }

  assertCanPersist();

  try {
    writeJsonToFile(localPath, data);
    return "file";
  } catch (err) {
    const msg = err instanceof Error ? err.message : "File write failed";
    throw new PersistWriteError(msg);
  }
}

export function toPersistErrorResponse(err: unknown): {
  status: number;
  error: string;
} {
  const message = err instanceof Error ? err.message : String(err);

  if (
    err instanceof BlobNotConfiguredError ||
    message === "BLOB_NOT_CONFIGURED"
  ) {
    return { status: 503, error: BLOB_SETUP_MESSAGE };
  }

  if (err instanceof PersistWriteError) {
    return {
      status: 500,
      error: `Không lưu được dữ liệu (${message}). Kiểm tra Vercel Blob Store đã Connect đúng project và Redeploy.`,
    };
  }

  return {
    status: 500,
    error: `Lỗi máy chủ: ${message}`,
  };
}

import { BLOB_SETUP_MESSAGE } from "@/lib/persistMessages";