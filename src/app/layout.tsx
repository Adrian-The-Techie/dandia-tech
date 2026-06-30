import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import ThemeRegistry from "@/theme/ThemeRegistry";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Box from "@mui/material/Box";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dandia Tech",
  description: "Dandia Holdings Tech Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className} style={{ margin: 0, padding: 0 }}>
        <ThemeRegistry>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <Box component="main" sx={{ flexGrow: 1 }}>
              {children}
            </Box>
            <Footer />
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
