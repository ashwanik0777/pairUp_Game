import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./tw-animate.css";
import { Providers } from "@/components/providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PairUp - Memory Matching Game",
  description: "A fun memory matching game with different themes and difficulty levels.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className=" bg-linear-to-br from-purple-100 via-white to-mint-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300 font-sans antialiased flex flex-col">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-8">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
