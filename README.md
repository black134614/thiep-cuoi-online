# Thiệp Cưới Online — mẫu "Song Hỷ Đỏ"

Website thiệp cưới online (one-page), dựng lại theo mẫu
[chungdoi.com / Song Hỷ Đỏ](https://chungdoi.com/mau-thiep/song-hy-do/demo).

Đây là **khung sườn (scaffold)** do Project Manager dựng sẵn. Mỗi section là một
component độc lập có "hợp đồng" rõ ràng để các agent nhỏ hơn implement song song.

---

## 1. Tech stack

| Hạng mục    | Lựa chọn                          |
| ----------- | --------------------------------- |
| Framework   | Next.js 14 (App Router)           |
| Ngôn ngữ    | TypeScript (strict)               |
| Styling     | Tailwind CSS + design tokens      |
| Font        | next/font (Google) — xem `lib/fonts.ts` |
| Data        | Object tĩnh `src/data/wedding.ts` (1 nguồn sự thật) |

## 2. Chạy dự án

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build production
npm run lint     # kiểm tra lint
npm run typecheck
```

## 3. Cấu trúc thư mục

```
src/
├─ app/
│  ├─ layout.tsx            # <html>, font, metadata SEO
│  ├─ page.tsx              # render thiệp với weddingData
│  ├─ globals.css           # Tailwind + class dùng chung (.section-band, ...)
│  └─ api/wishes/route.ts   # API sổ lưu bút (in-memory, cần thay DB)
├─ components/
│  ├─ InvitationView.tsx    # lắp ráp 10 section theo thứ tự
│  ├─ sections/             # ⭐ MỖI FILE = 1 NHIỆM VỤ CHO 1 AGENT
│  │  ├─ CoverScreen.tsx
│  │  ├─ WeddingInfo.tsx
│  │  ├─ Gallery.tsx
│  │  ├─ ReceptionInfo.tsx
│  │  ├─ Countdown.tsx
│  │  ├─ Venue.tsx
│  │  ├─ Timeline.tsx
│  │  ├─ Guestbook.tsx
│  │  ├─ GiftEnvelope.tsx
│  │  └─ Footer.tsx
│  ├─ ui/                   # primitive: Container, SectionBand, Button
│  └─ decor/                # trang trí: DoubleHappiness (chữ 囍)
├─ data/wedding.ts          # ⭐ NỘI DUNG THIỆP — sửa ở đây, không sửa component
├─ types/wedding.ts         # interface dữ liệu (contract)
└─ lib/                     # fonts.ts, utils.ts (countdown, cn, ...)
```

## 4. Nguyên tắc cho mọi agent

1. **Không sửa `src/types/wedding.ts`** trừ khi thực sự cần thêm field — báo PM trước.
2. Component **chỉ đọc dữ liệu qua props `data: WeddingData`**, không hardcode nội dung.
3. Dùng **design token** (màu `wine/cream/gold/crimson`, font `display/serif/script/sans`)
   thay vì màu/đơn vị tuỳ ý. Token định nghĩa trong `tailwind.config.ts`.
4. Dùng lại primitive trong `components/ui` và `components/decor`.
5. Mobile-first, responsive. Giữ `npm run typecheck` và `npm run lint` sạch.
6. Mỗi section tự quản lý `'use client'` nếu cần tương tác (state, effect).

## 5. Bảng phân công (mỗi dòng giao cho 1 agent)

| Section            | File                              | Việc chính                                   |
| ------------------ | --------------------------------- | -------------------------------------------- |
| 1. Cover           | `sections/CoverScreen.tsx`        | Hero mở thiệp, animation chữ Hỷ, nút Mở thiệp |
| 2. Thông tin lễ    | `sections/WeddingInfo.tsx`        | Cha mẹ 2 bên, tên cặp đôi, ngày lễ           |
| 3. Album ảnh       | `sections/Gallery.tsx`            | Carousel coverflow + lightbox                |
| 4. Thông tin tiệc  | `sections/ReceptionInfo.tsx`      | Giờ tiệc, đón khách / khai tiệc              |
| 5. Đếm ngược       | `sections/Countdown.tsx`          | Countdown realtime + lịch tháng + .ics       |
| 6. Địa điểm        | `sections/Venue.tsx`              | Nhúng Google Maps + chỉ đường                |
| 7. Lịch trình      | `sections/Timeline.tsx`           | Timeline dọc có animation                    |
| 8. Sổ lưu bút      | `sections/Guestbook.tsx`          | Form + gọi `/api/wishes` + danh sách         |
| 9. Phong bao       | `sections/GiftEnvelope.tsx`       | Animation mở phong bao, QR, copy STK         |
| 10. Footer         | `sections/Footer.tsx`             | Lời cảm ơn, trang trí                        |
| Backend            | `app/api/wishes/route.ts`         | Thay in-memory bằng DB thật                  |
| Assets             | `public/images/`, `lib/fonts.ts`  | Ảnh thật + (tuỳ chọn) font local cho khớp 100% |

> Mỗi file section đã có sẵn skeleton render được + danh sách `TODO(agent-...)`.
> Agent chỉ cần mở đúng file của mình và hoàn thiện theo TODO.

## 6. Mở rộng nhiều cặp đôi (tương lai)

Tạo `src/app/thiep/[slug]/page.tsx`, load dữ liệu theo `slug` từ DB/CMS và truyền vào
`<InvitationView data={...} />`. Toàn bộ section đã sẵn sàng vì chỉ phụ thuộc `WeddingData`.

## 7. Tài nguyên tham khảo

Bản tải về của trang mẫu nằm trong `reference/` (đã được `.gitignore`). Dùng để đối chiếu
màu sắc, bố cục, nội dung. Không import trực tiếp vào source.
