import type { WeddingData } from "@/types/wedding";

const VENUE_ADDRESS =
  "Ấp Phước An, Phước Vinh, Châu Thành, Tây Ninh";

const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d244.44596407737953!2d105.94639148713959!3d11.397720471922826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e0!3m2!1sen!2s!4v1782176408743!5m2!1sen!2s";

const MAP_OPEN_URL =
  "https://www.google.com/maps/search/?api=1&query=11.397720471922826,105.94639148713959";

const ALBUM_FILES = [
  "DSC01851.jpg",
  "DSC01892.jpg",
  "DSC01912.jpg",
  "DSC01917.jpg",
  "DSC01941.jpg",
  "DSC01946.jpg",
  "DSC02077.jpg",
  "DSC02095.jpg",
  "DSC02130.jpg",
  "DSC02172.jpg",
  "DSC02186.jpg",
  "DSC02221.jpg",
  "DSC02234.jpg",
  "DSC02256.jpg",
  "DSC02265.jpg",
  "DSC02267_(2).jpg",
  "DSC02305.jpg",
  "DSC02341.jpg",
  "DSC02345.jpg",
  "DSC02367.jpg",
  "DSC02380.jpg",
  "DSC02415.jpg",
  "DSC02421.jpg",
  "DSC02531.jpg",
  "DSC02557.jpg",
] as const;

const HERO_PHOTO = `/images/Album/${ALBUM_FILES[0]}`;

export const weddingData: WeddingData = {
  welcomeText: "Welcome to our wedding",

  groom: {
    fullName: "Trần Văn Mẫn",
    shortName: "Văn Mẫn",
    title: "Chú rể",
    photo: HERO_PHOTO,
  },
  bride: {
    fullName: "Trần Hồng Ngân",
    shortName: "Hồng Ngân",
    title: "Cô dâu",
    photo: HERO_PHOTO,
  },

  groomParents: {
    prefix: "Ông Bà",
    father: "Trần Văn Minh",
    mother: "Nguyễn Thị Giàu",
    address: VENUE_ADDRESS,
  },
  brideParents: {
    prefix: "Ông Bà",
    father: "Trần Hồng Điệp",
    mother: "Nguyễn Thị Hà",
    address: "Ấp 6, xã Tân Thành, Tây Ninh",
  },

  ceremony: {
    label: "Lễ Thành Hôn",
    venueName: "Tư Gia",
    address: VENUE_ADDRESS,
    date: {
      iso: "2026-08-23T09:00:00+07:00",
      weekday: "Chủ Nhật",
      day: "23",
      month: "08",
      year: "2026",
      time: "09:00",
      lunar: "Tức ngày 11/07 năm Bính Ngọ",
    },
  },

  reception: {
    label: "Tiệc Cưới",
    venueName: "Tư Gia",
    address: VENUE_ADDRESS,
    date: {
      iso: "2026-08-23T10:30:00+07:00",
      weekday: "Chủ Nhật",
      day: "23",
      month: "08",
      year: "2026",
      time: "10:30",
      lunar: "Tức ngày 11/07 năm Bính Ngọ",
    },
    mapUrl: MAP_OPEN_URL,
    mapEmbedUrl: MAP_EMBED_URL,
    coordinates: { lat: 11.397720471922826, lng: 105.94639148713959 },
  },

  schedule: [
    { time: "09:00", activity: "Đón khách" },
    { time: "10:30", activity: "Khai tiệc" },
  ],

  gallery: ALBUM_FILES.map((file, i) => ({
    src: `/images/Album/${file}`,
    alt: `Ảnh cưới ${i + 1}`,
  })),

  giftAccounts: [
    {
      owner: "Chú rể",
      bankName: "Techcombank",
      qrImage: "/images/QR_code.png",
    },
  ],

  thankYouText: "Gia đình xin chân thành cảm ơn quý khách đã đến chung vui.",

  theme: {
    template: "song-hy-do",
    music: "/Theme_music.mp3",
  },
};
