import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eros Karsburg — Full Stack Software Engineer",
  description:
    "Full Stack Software Engineer com 3+ anos em .NET e C#: aplicações web, APIs, backoffices e integrações de pagamento.",
};

export const viewport: Viewport = {
  themeColor: "#0a0909",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${bricolage.variable} ${jetbrains.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
