import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import {Providers} from "./providers";

import { Poppins, Roboto } from "next/font/google";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "British Academy of Aesthetics - Leading Aesthetic Training & Certification",
  description: "Empowering aspiring professionals with cutting-edge aesthetics and cosmetology courses, CPD-approved certifications, and expert training for a successful career in the beauty industry",
};


const poppinsSemi = Poppins({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-poppins-semi",
});


const poppinsbold = Poppins({
  subsets: ["latin"],
  weight: ["900"],
  variable: "--font-poppins-bold",
});


const poppinsreg = Poppins({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-poppins-reg",
});

const poppinsreg5 = Poppins({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-poppins-reg5",
});
const roboto400 = Roboto({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-roboto-400",
});

const roboto700 = Roboto({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-roboto-700",
});


const roboto900 = Roboto({
  subsets: ["latin"],
  weight: ["900"],
  variable: "--font-roboto-900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={` ${poppinsSemi.variable} ${poppinsbold.variable} ${poppinsreg.variable} ${poppinsreg5.variable} ${roboto400.variable} ${roboto700.variable} ${roboto900.variable} `} lang="en">
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

<Providers>
        {children}

        </Providers>
      </body>

 
    </html>
  );
}
