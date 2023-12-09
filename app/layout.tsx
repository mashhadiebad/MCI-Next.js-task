import TanstackProvider from "@/providers/TanstackProvider";
import "./style/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MCI-Task",
  description: "MCI entrance task",
  icons: {
    icon: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TanstackProvider>
          <div className="">{children}</div>
        </TanstackProvider>
      </body>
    </html>
  );
}
