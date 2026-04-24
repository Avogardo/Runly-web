import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { auth } from "@/lib/auth";
import UserMenu from "@/components/ui/UserMenu";
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
  title: "Runly — Running Dashboard",
  description:
    "Calendar-based running history dashboard with route visualization",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <header className="sticky top-0 z-50 px-6 py-4 border-b border-white/10 bg-[#0B0B1E]/80 backdrop-blur-lg">
          <nav className="max-w-6xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-2xl transition-transform group-hover:scale-110">
                🏃
              </span>
              <span className="text-xl font-bold text-white tracking-tight">
                Runly
              </span>
            </Link>
            {session?.user ? (
              <UserMenu
                userName={session.user.name}
                userEmail={session.user.email}
              />
            ) : (
              <span className="text-xs text-white/25 hidden sm:block">
                Running Dashboard
              </span>
            )}
          </nav>
        </header>
        <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8">
          {children}
        </main>
        <footer className="px-6 py-4 border-t border-white/5">
          <div className="max-w-6xl mx-auto text-center text-xs text-white/20">
            Runly Web · Built with Next.js
          </div>
        </footer>
      </body>
    </html>
  );
}
