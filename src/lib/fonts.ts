import {
  Playfair_Display,
  EB_Garamond,
  Alex_Brush,
  Libre_Baskerville,
  Be_Vietnam_Pro,
} from "next/font/google";

/**
 * Font mapping theo mẫu Song Hỷ Đỏ (chungdoi.com):
 * - Fz Qellia → Playfair Display (tên cô dâu/chú rể)
 * - Baskerville → Libre Baskerville (thứ, tháng, ÚT NAM/NỮ)
 * - Alex Brush → ký tự "&"
 * - EB Garamond → nội dung serif, tiêu đề section
 * - Be Vietnam Pro → UI / body
 */

export const fontDisplay = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const fontSerif = EB_Garamond({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
  variable: "--font-serif",
  display: "swap",
});

export const fontClassic = Libre_Baskerville({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
  variable: "--font-classic",
  display: "swap",
});

export const fontScript = Alex_Brush({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
  display: "swap",
});

export const fontSans = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const fontVariables = [
  fontDisplay.variable,
  fontSerif.variable,
  fontClassic.variable,
  fontScript.variable,
  fontSans.variable,
].join(" ");
