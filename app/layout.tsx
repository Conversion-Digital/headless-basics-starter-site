// import { getLogger } from "@conversiondigital/headless-basics-data/src/services/logging/LogConfig";

import '@/theme/styles/component-lib-transfer/globals.css';

// import { Inter as FontSans, Urbanist } from "next/font/google"

import ThemeProvider from "./ThemeProvider"
import { RouteChangeListener } from "@conversiondigital/headless-basics-components/src/components/google/RouteChangeListener"
import { bodyClass } from "@/theme/layoutClassesAndFonts";
import FontsGlobalStyle from "@/theme/styles/fonts/fontsGlobalStyle";

// const fontSans = FontSans({
//   subsets: ["latin"],
//   variable: "--font-sans",
//   display: "swap",
// })

// const fontUrbanist = Urbanist({
//   subsets: ["latin"],
//   variable: "--font-urbanist",
//   display: "swap",
// })

// The root layout is shared for the entire application
export default function RootLayout({ children }) {
  // const GoogleTagManagerAllSites = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID;
  // const GoogleTagManagerNzId = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID_NZ;
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/showcase/favicon.ico" sizes="any" />
        <FontsGlobalStyle />
      </head>

      <body
        className={`${bodyClass}`}
      >
        <RouteChangeListener />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
