import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.scss";
import ThemeClient from "./themeClient";

const inter = Poppins({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Annotation tool",
  description: "Created by Patrik Palko",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeClient>{children}</ThemeClient>
      </body>
    </html>
  );
}
