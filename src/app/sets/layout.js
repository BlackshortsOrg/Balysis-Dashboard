import "../globals.css";
import Navbar from "@/components/Navbar";
import { Inter, Roboto, Montserrat } from "next/font/google";
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["500", "100", "300", "400", "700"],
});
import { Toaster } from "sonner";
const montserrat = Montserrat({ subsets: ["latin"] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={"flex flex-row " + montserrat.className}>
        <Navbar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
