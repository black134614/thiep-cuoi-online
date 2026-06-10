import { InvitationView } from "@/components/InvitationView";
import { weddingData } from "@/data/wedding";

/**
 * Trang thiệp demo. Dữ liệu lấy từ src/data/wedding.ts.
 *
 * Định hướng mở rộng (multi-tenant): tạo route động
 * src/app/thiep/[slug]/page.tsx để mỗi cặp đôi có 1 link riêng,
 * load dữ liệu theo slug thay vì dùng weddingData tĩnh.
 */
export default function HomePage() {
  return <InvitationView data={weddingData} />;
}
