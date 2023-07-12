"use client";
import React, {FC, useMemo, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import {usePathname} from "next/navigation";
import {HiHome, HiSearch} from "react-icons/hi";
import Box from "@/components/Box";
import SidebarItem from "@/components/SidebarItem";
import Library from "@/components/Library";
import {Song} from "@/types";
import {useUser} from "@/hooks/useUser";
import usePlayer from "@/hooks/usePlayer";
import {twMerge} from "tailwind-merge";

interface SidebarProps {
    children: React.ReactNode;
    songs: Song[];
}

const Sidebar: FC<SidebarProps> = ({children, songs}) => {
    const pathname = usePathname();
    const player = usePlayer();
    const router = useRouter();
    const user = useUser().user;
    const routes = useMemo(() => [
        {
            icon: HiHome,
            label: 'Home',
            active: pathname !== '/search',
            href: '/',
        },
        {
            icon: HiSearch,
            label: 'Search',
            active: pathname === '/search',
            href: '/search',
        }
    ], [pathname]);

    useEffect(() => {
    const eventHandler = (e: any) => {
        console.log(e.target.documentElement.scrollHeight);
        console.log(e.target.documentElement.scrollTop);
    };

    if (typeof document !== 'undefined') {
      document.addEventListener('eventName', eventHandler);
    }

    return () => {
      if (typeof document !== 'undefined') {
        document.removeEventListener('eventName', eventHandler);
      }
    };
  }, [router]);

    return (
        <div className={twMerge(`flex h-full`, (player.activeId && user) && "h-[calc(100%-130px)]")}>
            <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
                <Box>
                    <div className="
                        flex
                        flex-col
                        gap-y-4
                        px-5
                        py-4
                    ">
                        {routes.map((item) => (
                            <SidebarItem
                                key={item.label}
                                {...item}
                            />
                        ))}
                    </div>
                </Box>
                <Box className="overflow-y-auto h-full scrollbar-thin">
                    <Library songs={songs}/>
                </Box>
            </div>
            <main className="main h-full flex-1 overflow-hidden overflow-y-auto scrollbar-thin py-2">
                {children}
            </main>
        </div>
    );
};

export default Sidebar;
