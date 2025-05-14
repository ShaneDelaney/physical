import type { Metadata } from "next";
import { Montserrat, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import NavBar from "@/components/ui/NavBar";
import "./globals.css";

// Modern, clean sans-serif
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

// Distinctive, modern alternative font for headings
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "PhysicalNotes - Convert Handwritten Notes to Digital Tasks",
  description: "Easily capture handwritten notes, photos, and whiteboard sessions, and convert them to digital tasks with AI-powered analysis.",
  viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "PhysicalNotes",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.variable} ${spaceGrotesk.variable} font-primary`}>
        <ThemeProvider defaultTheme="system">
          <div className="flex flex-col min-h-screen">
            <main className="flex-1 pb-20">
              {/* Loading spinner - visible only during page transitions */}
              <div id="loading-spinner" className="fixed inset-0 flex items-center justify-center bg-white/50 dark:bg-black/50 backdrop-blur-sm z-50 opacity-0 pointer-events-none transition-opacity duration-300">
                <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
              </div>
              
              {children}
            </main>
            <NavBar />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
