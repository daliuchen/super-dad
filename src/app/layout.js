import localFont from "next/font/local";
import "./globals.css";
import {Toaster} from "react-hot-toast";
import ReduxProvider from "@/views/ReduxProvider";
import {getCurrentUser} from "@/api/user";
import BaseProvider from "@/views/BaseProvider";


const geistSans = localFont({
    src: "../fonts/GeistVF.woff", variable: "--font-geist-sans", weight: "100 900",
});
const geistMono = localFont({
    src: "../fonts/GeistMonoVF.woff", variable: "--font-geist-mono", weight: "100 900",
});

export const metadata = {
    title: "super dad", description: "super dad",
};


export default async function RootLayout({children}) {
    return (<html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
                <ReduxProvider>
                    <BaseProvider>
                        {children}
                    </BaseProvider>
                </ReduxProvider>
        </body>
        </html>);
}
