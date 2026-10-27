import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nimbup.com"),
  title: "Nimbup — Turn any document into short lessons",
  description:
    "Drop in a document and Nimbup turns it into short lessons your team will actually finish.",
  openGraph: {
    title: "Nimbup",
    description: "Turn any document into short lessons your team will actually finish.",
    url: "https://nimbup.com",
    siteName: "Nimbup",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
