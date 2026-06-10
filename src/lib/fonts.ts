import {
  Cormorant_Garamond,
  EB_Garamond,
  Dancing_Script,
  Be_Vietnam_Pro,
} from "next/font/google";

/**
 * Bộ font cho mẫu thiệp. Dùng next/font/google làm mặc định (có hỗ trợ tiếng Việt).
 *
 * Trang mẫu gốc dùng các font bản quyền local (DFVN New Eddy, Alex Brush, SVN-HC...).
 * Nếu cần khớp 100%, agent có thể:
 *   1. Copy file font vào public/fonts/
 *   2. Đổi sang next/font/local và cập nhật biến CSS bên dưới.
 *
 * Các biến CSS (--font-display, --font-serif, --font-script, --font-sans)
 * được map trong tailwind.config.ts -> fontFamily.
 */

// Tên cô dâu/chú rể, tiêu đề lớn (thanh lịch, nét mảnh)
export const fontDisplay = Cormorant_Garamond({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

// Nội dung kiểu serif (tên cha mẹ, lời mời...)
export const fontSerif = EB_Garamond({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
  variable: "--font-serif",
  display: "swap",
});

// Ký tự "&", chữ ký, nét viết tay
export const fontScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-script",
  display: "swap",
});

// Body / UI text
export const fontSans = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

/** Gộp class biến font để gắn vào <html> hoặc <body> trong layout.tsx */
export const fontVariables = [
  fontDisplay.variable,
  fontSerif.variable,
  fontScript.variable,
  fontSans.variable,
].join(" ");
