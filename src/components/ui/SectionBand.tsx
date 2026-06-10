import { cn } from "@/lib/utils";

/**
 * Dải tiêu đề màu đỏ rượu vắt ngang trang (vd: "THÔNG TIN LỄ CƯỚI").
 * Đây là motif lặp lại của mẫu Song Hỷ Đỏ.
 */
export function SectionBand({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <div className={cn("section-band w-full py-4 sm:py-5", className)}>
      <h2 className="font-serif font-semibold leading-snug">{title}</h2>
    </div>
  );
}
