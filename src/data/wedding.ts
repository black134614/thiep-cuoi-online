import type { WeddingData } from "@/types/wedding";

export const weddingData: WeddingData = {
  welcomeText: "Welcome to our wedding",

  groom: {
    fullName: "Phan Gia Khánh",
    shortName: "Gia Khánh",
    title: "Út Nam",
    photo: "https://cdn.chungdoi.com/uploads/c02e1621-d290-41cd-acf7-fbeb6d1847a8.jpg",
  },
  bride: {
    fullName: "Phạm Quỳnh Anh",
    shortName: "Quỳnh Anh",
    title: "Út Nữ",
    photo: "https://cdn.chungdoi.com/uploads/c02e1621-d290-41cd-acf7-fbeb6d1847a8.jpg",
  },

  groomParents: {
    prefix: "Ông Bà",
    father: "Phan Văn Hoàng",
    mother: "Lê Thị Mai",
    address: "Số 85 Nguyễn Thái Sơn, Phường 4, Gò Vấp, TP. Hồ Chí Minh",
  },
  brideParents: {
    prefix: "Ông Bà",
    father: "Phạm Văn Mạnh",
    mother: "Huỳnh Thị Kim Oanh",
    address: "Ngõ 95 Láng Hạ, Láng Hạ, Đống Đa, Hà Nội",
  },

  ceremony: {
    label: "Lễ Thành Hôn",
    venueName: "Tư Gia",
    date: {
      iso: "2026-06-01T09:00:00+07:00",
      weekday: "Thứ Hai",
      day: "01",
      month: "06",
      year: "2026",
      time: "09:00",
      lunar: "Tức ngày 16/04 năm Bính Ngọ",
    },
  },

  reception: {
    label: "Tiệc Cưới",
    venueName: "Trung Tâm Hội Nghị Tiệc Cưới Sun Palace",
    address: "Sun Palace, 170 Kinh Dương Vương, Phường 13, Quận 6, Hồ Chí Minh",
    date: {
      iso: "2026-06-14T10:30:00+07:00",
      weekday: "Chủ Nhật",
      day: "14",
      month: "06",
      year: "2026",
      time: "10:30",
      lunar: "Tức ngày 29/04 năm Bính Ngọ",
    },
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Sun+Palace+170+Kinh+Duong+Vuong+Quan+6",
    coordinates: { lat: 10.7459, lng: 106.6298 },
  },

  schedule: [
    { time: "17:30", activity: "Đón khách" },
    { time: "18:30", activity: "Khai tiệc" },
    { time: "18:45", activity: "Rót rượu, cắt bánh" },
    { time: "19:00", activity: "Phục vụ món chính" },
    { time: "21:00", activity: "Kết thúc tiệc" },
  ],

  gallery: [
    { src: "https://cdn.chungdoi.com/uploads/8ac4c9ca-3642-4870-9ef4-d559c3255672.jpg", alt: "Ảnh cưới 1" },
    { src: "https://cdn.chungdoi.com/uploads/4a9236f5-0335-4ed2-b5e4-c7a12af7a59f.jpg", alt: "Ảnh cưới 2" },
    { src: "https://cdn.chungdoi.com/uploads/65527b43-885b-401f-bbbf-ce4d5c6fe39d.jpg", alt: "Ảnh cưới 3" },
    { src: "https://cdn.chungdoi.com/uploads/685fc899-3e8d-4ae7-8074-624034297969.jpg", alt: "Ảnh cưới 4" },
    { src: "https://cdn.chungdoi.com/uploads/eb68249e-6e45-4452-8c3b-b7076b462c0b.jpg", alt: "Ảnh cưới 5" },
    { src: "https://cdn.chungdoi.com/uploads/25e2ccda-823e-459e-ad42-5d033ab080b7.jpg", alt: "Ảnh cưới 6" },
  ],

  giftAccounts: [
    {
      owner: "Chú rể",
      bankName: "Vietcombank",
      accountNumber: "0123456789",
      accountHolder: "PHAN GIA KHANH",
    },
    {
      owner: "Cô dâu",
      bankName: "Techcombank",
      accountNumber: "9876543210",
      accountHolder: "PHAM QUYNH ANH",
    },
  ],

  thankYouText: "Gia đình xin chân thành cảm ơn quý khách đã đến chung vui.",

  theme: {
    template: "song-hy-do",
    music: undefined,
  },
};
