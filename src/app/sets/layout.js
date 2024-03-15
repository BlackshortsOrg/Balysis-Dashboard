import "../globals.css";
import Navbar from "@/components/Navbar";
import { Inter, Roboto } from "next/font/google";
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["500", "100", "300", "400", "700"],
});
import { Toaster } from "sonner";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={"flex flex-row " + roboto.className}>
        <Navbar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
