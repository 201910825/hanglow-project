import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HANGLOW - K-뷰티 여행 플랫폼",
  description: "한국 뷰티의 모든 것, 여행 중에도 여행 후에도 계속되는 K-뷰티 여정",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
