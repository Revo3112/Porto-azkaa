import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Azkaa Rahiila Hardi | Data Analyst Portfolio",
  description: "High-precision professional portfolio for Azkaa Rahiila Hardi, BNSP Certified Data Analyst specializing in Python, SQL, Tableau, and Power BI.",
  keywords: ["Data Analyst", "Azkaa Rahiila Hardi", "Portfolio", "BNSP Certified", "Python", "SQL", "Tableau", "Power BI"],
  authors: [{ name: "Azkaa Rahiila Hardi" }],
  creator: "Azkaa Rahiila Hardi",
  openGraph: {
    title: "Azkaa Rahiila Hardi | Data Analyst Portfolio",
    description: "BNSP Certified Data Analyst specializing in Python, SQL, Tableau, and Power BI.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased selection:bg-[#2563EB] selection:text-white pb-12`}>
        <Script
          src="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL@20..48,100..700,0..1&display=swap"
          strategy="lazyOnload"
        />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js"
          strategy="lazyOnload"
        />
        {children}
      </body>
    </html>
  );
}
