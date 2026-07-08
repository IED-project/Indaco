import "./globals.css";
import localFont from "next/font/local";

const suisse = localFont({
  src: [
    { path: "./fonts/SuisseIntlTrial-Thin.otf", weight: "100", style: "normal" },
    { path: "./fonts/SuisseIntlTrial-Light.otf", weight: "300", style: "normal" },
    { path: "./fonts/SuisseIntlTrial-Book.otf", weight: "350", style: "normal" },
    { path: "./fonts/SuisseIntlTrial-Regular.otf", weight: "400", style: "normal" },
    { path: "./fonts/SuisseIntlTrial-Medium.otf", weight: "500", style: "normal" },
    { path: "./fonts/SuisseIntlTrial-Semibold.otf", weight: "600", style: "normal" },
    { path: "./fonts/SuisseIntlTrial-Bold.otf", weight: "700", style: "normal" },
    { path: "./fonts/SuisseIntlTrial-Black.otf", weight: "900", style: "normal" },
  ],
  variable: "--font-suisse",
  display: "swap",
});

export const metadata = {
  title: "Andrea Fortuna — indaco® | Designer & Founder",
  description:
    "Designer e founder di indaco. Do forma a brand, prodotti digitali e direzioni visive con chiarezza e carattere.",
  keywords: [
    "brand designer",
    "digital designer",
    "3D",
    "brand identity",
    "indaco",
    "Andrea Fortuna",
  ],
  openGraph: {
    title: "Andrea Fortuna — indaco®",
    description:
      "Designer e founder di indaco. Brand, prodotti digitali e direzioni visive con chiarezza e carattere.",
    locale: "it_IT",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#090212",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="it" className={suisse.variable}>
      <body>{children}</body>
    </html>
  );
}
