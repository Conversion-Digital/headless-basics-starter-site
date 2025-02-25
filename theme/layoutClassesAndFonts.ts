import localFont from "next/font/local"

const helvetica = localFont({
    src: [
      {
        path: "./fonts/helvetica_light.ttf",
        weight: "300",
      },
      {
        path: "./fonts/helvetica_regular.ttf",
        weight: "400",
      },
      {
        path: "./fonts/helvetica_bold.ttf",
        weight: "700",
      },
    ],
    variable: "--font-helvetica",
})


export const bodyClass = `min-h-screen !overflow-x-hidden font-helvetica antialiased ${helvetica.variable}`;