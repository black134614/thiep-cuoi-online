import { cn } from "@/lib/utils";

/** Khung giới hạn chiều rộng nội dung, canh giữa. Dùng trong mọi section. */
export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-3xl px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}
