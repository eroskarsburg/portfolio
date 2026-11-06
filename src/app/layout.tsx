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
  title: "Eros Karsburg — Desenvolvedor Full Stack Pleno",
  description:
    "Desenvolvedor Full Stack Pleno com 3+ anos em .NET e C#: aplicações web, APIs, backoffices e integrações de pagamento.",
};

export const viewport: Viewport = {
  themeColor: "#0a0909",
};

// Applies the saved theme before first paint so there is no flash (see the Next.js
// "preventing flash before hydration" guide). Dark stays the default.
const themeScript = `(function(){try{var t=localStorage.getItem("portfolio-theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" data-theme="dark" suppressHydrationWarning className={`${bricolage.variable} ${jetbrains.variable} antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
