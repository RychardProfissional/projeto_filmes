import localFont from "next/font/local";
import { headers } from 'next/headers';
import { isValidElement, cloneElement, Children } from "react";
import "./globals.css";
import { UserProvider } from "@/components/context";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Filmes online",
  description: "Projeto de programação web",
};

export default function RootLayout({ children }) {
  const headersList = headers();
  const User = headersList.get('X-user');
  const user = User ? JSON.parse(User) : null;

  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased max-h-full`}
      >
        <UserProvider user={user}> 
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
