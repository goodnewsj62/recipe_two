import Header from "@/components/layout/Header";
import SideBar from "@/components/layout/SideBar";
import Providers from "@/config/providers/CustomQueryProvider";
import AppThemeWrapper from "@/config/theme/AppThemeWrapper";
import { lightTheme } from "@/config/theme/theme.config";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import type { Metadata } from "next";
import { Inter, Sansita_Swashed } from "next/font/google";
import "./globals.css";

export const inter = Inter({ subsets: ["latin"] });
export const sansitaSwashed = Sansita_Swashed({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Recipe Home",
  description: "Home Listing of all Recipes ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}  antialiased`}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={lightTheme}>
            <AppThemeWrapper>
              <Providers>
                <Header />
                <SideBar />
                <main className="w-full px-4 pt-[68px] lg:container md:px-8 lg:mx-auto lg:pt-0 xl:px-16">
                  {children}
                </main>
              </Providers>
            </AppThemeWrapper>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
