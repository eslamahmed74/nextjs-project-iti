import Footer from "./../components/Footer";
import "./globals.css";
import Navbar from "./../components/navbar/Navbar";
import { WishlistProvider } from "@/lib/WishlistContext";

export const metadata = {
  title: "Recipe App",
  description: "Recipe App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <WishlistProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </WishlistProvider>
      </body>
    </html>
  );
}
