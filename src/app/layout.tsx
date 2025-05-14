import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { gellix } from "./fonts";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Alma Immigration Case Assessment",
  description:
    "Get an assessment of your immigration case from experienced attorneys",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={gellix.variable}>
      <body className={cn("font-sans antialiased", gellix.className)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
