/**
 * Mô hình dữ liệu cho một thiệp cưới.
 *
 * Đây là "hợp đồng" (contract) trung tâm: mọi section component chỉ nhận dữ liệu
 * theo các interface dưới đây. Khi muốn dựng thiệp cho cặp đôi khác, chỉ cần
 * thay đổi object trong src/data/wedding.ts mà KHÔNG sửa component.
 */

/** Một người trong cặp đôi (cô dâu hoặc chú rể) */
export interface Person {
  /** Tên đầy đủ, vd: "Phan Gia Khánh" */
  fullName: string;
  /** Tên hiển thị ở hero/cover, vd: "Gia Khánh" */
  shortName: string;
  /** Vai trò trong gia đình, vd: "Út Nam", "Út Nữ" */
  title?: string;
  /** Ảnh chân dung (đường dẫn trong /public hoặc URL) */
  photo?: string;
}

/** Thông tin cha mẹ một bên */
export interface Parents {
  /** Cha */
  father: string;
  /** Mẹ */
  mother: string;
  /** Địa chỉ gia đình */
  address?: string;
  /** Tiền tố, mặc định "Ông Bà" */
  prefix?: string;
}

/** Một mốc thời gian + lịch âm tương ứng */
export interface WeddingDate {
  /** Ngày dương dạng ISO (YYYY-MM-DD) dùng cho countdown/tính toán */
  iso: string;
  /** Thứ trong tuần, vd: "Chủ Nhật" */
  weekday: string;
  /** Ngày, vd: "14" */
  day: string;
  /** Tháng, vd: "06" */
  month: string;
  /** Năm, vd: "2026" */
  year: string;
  /** Giờ, vd: "10:30" */
  time?: string;
  /** Mô tả lịch âm, vd: "Tức ngày 29/04 năm Bính Ngọ" */
  lunar?: string;
}

/** Một sự kiện (lễ tại gia / tiệc nhà hàng) */
export interface WeddingEvent {
  /** Tiêu đề, vd: "Lễ Thành Hôn", "Tiệc Cưới" */
  label: string;
  /** Nơi tổ chức, vd: "Tư Gia", "Trung tâm tiệc cưới Sun Palace" */
  venueName: string;
  /** Địa chỉ đầy đủ */
  address?: string;
  /** Thời điểm diễn ra */
  date: WeddingDate;
  /** Link Google Maps (embed hoặc share) */
  mapUrl?: string;
  /** iframe src trực tiếp từ Google Maps embed */
  mapEmbedUrl?: string;
  /** Toạ độ để render bản đồ tùy chọn */
  coordinates?: { lat: number; lng: number };
}

/** Một mốc trong lịch trình ngày cưới */
export interface ScheduleItem {
  /** Giờ, vd: "17:30" */
  time: string;
  /** Hoạt động, vd: "Đón khách" */
  activity: string;
  /** Mốc chính thức — hiển thị nổi bật (vd: Đón khách, Khai tiệc) */
  main?: boolean;
  /** Thời gian ước lượng, không phải mốc cố định */
  estimate?: boolean;
}

/** Một ảnh trong album cưới */
export interface GalleryImage {
  src: string;
  alt?: string;
}

/** Một tài khoản nhận mừng cưới (phong bao) */
export interface GiftAccount {
  /** Chủ tài khoản: "groom" | "bride" hoặc tên hiển thị */
  owner: string;
  bankName?: string;
  accountNumber?: string;
  accountHolder?: string;
  /** Đường dẫn ảnh QR (VietQR/MoMo) */
  qrImage?: string;
}

/** Một lời chúc trong sổ lưu bút */
export interface Wish {
  id: string;
  name: string;
  message: string;
  /** Tên người nhận thiệp lúc gửi lời chúc */
  invitedAs?: string;
  /** ISO timestamp */
  createdAt: string;
}

/** Trạng thái xác nhận tham dự */
export type RsvpStatus = "attending_1" | "attending_2" | "declined";

/** Một xác nhận tham dự tiệc cưới */
export interface RsvpRecord {
  id: string;
  guestId?: string;
  guestName: string;
  status: RsvpStatus;
  headcount: number;
  createdAt: string;
  updatedAt: string;
}

/** Cấu hình giao diện / theme cho thiệp */
export interface ThemeConfig {
  /** Tên mẫu, vd: "song-hy-do" */
  template: string;
  /** Nhạc nền (đường dẫn trong /public/audio) */
  music?: string;
}

/** Toàn bộ dữ liệu của một thiệp cưới */
export interface WeddingData {
  groom: Person;
  bride: Person;
  groomParents: Parents;
  brideParents: Parents;
  /** Câu chào ở hero, vd: "Welcome to our wedding" */
  welcomeText?: string;
  /** Lễ thành hôn (thường tại gia) */
  ceremony: WeddingEvent;
  /** Tiệc cưới (nhà hàng) - cũng là mốc đếm ngược */
  reception: WeddingEvent;
  schedule: ScheduleItem[];
  gallery: GalleryImage[];
  giftAccounts: GiftAccount[];
  /** Lời cảm ơn ở footer */
  thankYouText?: string;
  theme: ThemeConfig;
}

/** Props chung mà mọi section component nhận */
export interface SectionProps {
  data: WeddingData;
  className?: string;
}
