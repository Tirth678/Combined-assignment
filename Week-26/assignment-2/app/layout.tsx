import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Event Booking App",
  description: "Made with love, by Txrth",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <nav className="flex justify-between bg-purple-400 p-5 text-white text-1xl font-bold">
          <h1>Event Booking</h1>
          <div className="pr-4">
          <a className="pr-8" href="/events">Events</a>
          <a className="pr-8" href="/login">Sign In</a>
          <a href="/signup">Sign Up</a>
          </div>
        </nav>
        {children}
        </body>
    </html>
  );
}
