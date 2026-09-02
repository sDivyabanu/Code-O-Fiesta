import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import MobileBlocker from "@/components/common/MobileBlocker";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import connectDB from "@/lib/db";
import Team from "@/models/Team";
import User from "@/models/User";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VITC CODE-O-FIESTA — Freshers' Edition",
  description: "Official Competitive Programming Event Platform by CodeChef VIT Chennai Student Chapter",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;
  let watermarkText = "";

  if (sessionToken && process.env.JWT_SECRET) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(sessionToken, secret);
      if (payload.teamId) {
        await connectDB();
        const team = await Team.findById(payload.teamId).lean();
        if (team) {
          watermarkText = team.name;
        }
      } else if (payload.userId) {
        await connectDB();
        const user = await User.findById(payload.userId).lean();
        if (user) {
          watermarkText = user.name || user.email;
        }
      }
    } catch (e) {
      // Ignore token verification errors
    }
  }

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${jetBrainsMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--text-primary)] font-sans">
        {watermarkText && (
          <div className="pointer-events-none fixed inset-[-50%] z-[99998] flex flex-wrap gap-x-32 gap-y-24 items-center justify-center overflow-hidden opacity-10 -rotate-[30deg] select-none">
             {Array.from({ length: 300 }).map((_, i) => (
                <span key={i} className="text-xl font-bold text-slate-300 whitespace-nowrap tracking-widest">
                  {watermarkText}
                </span>
             ))}
          </div>
        )}
        <MobileBlocker />
        {children}
      </body>
    </html>
  );
}
