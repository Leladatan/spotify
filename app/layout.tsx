import './globals.css';
import {Figtree} from 'next/font/google';
import Sidebar from "@/components/Sidebar";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import {ReactNode} from "react";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import getSongsByUserId from "@/actions/getSongsByUserId";

const figtree = Figtree({subsets: ['latin']});

export const metadata = {
    title: 'Spotify',
    description: 'Spotify listen to music',
    icons: {
        icon: './favicon.ico',
    },
};

export const revalidate = 0;

const Layout = async ({children,}: { children: ReactNode }) => {
    const userSongs = await getSongsByUserId();

    return (
        <html lang="en">
        <body className={figtree.className}>
        <ToasterProvider/>
        <SupabaseProvider>
            <UserProvider>
                <ModalProvider/>
                <Sidebar songs={userSongs}>
                    {children}
                </Sidebar>
            </UserProvider>
        </SupabaseProvider>
        </body>
        </html>
    )
}

export default Layout;