import { FooterText } from "@/components";
import "./globals.css";
import { Nunito_Sans } from "next/font/google";

const nunitoSans = Nunito_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Travel App",
  description: "Functional search travel page and individual listing pages",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`p-10 py-5 ${nunitoSans.className}`}>
        <main className="min-h-screen">{children}</main>
        <footer>
          <FooterText />
        </footer>
      </body>
    </html>
  );
}
