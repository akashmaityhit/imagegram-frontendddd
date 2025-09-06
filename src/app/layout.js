import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../contexts/AuthContext";
import AuthMiddleware from "../components/auth/AuthMiddleware";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ImageGram - Share Your Moments",
  description: "A dark-themed image sharing platform for creative minds",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        <AuthProvider>
          <AuthMiddleware>
            {children}
          </AuthMiddleware>
        </AuthProvider>
      </body>
    </html>
  );
}
