"use client";
import React, {FC, useMemo, useRef, useEffect} from 'react';
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
    const user = useUser().user;
    const mainRef = useRef<HTMLElement>(null);
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
            console.log(e.target);
            console.log(e.target.scrollTop - e.target.offsetHeight);
            console.log(e.target.scrollTop);
            console.log(e.target.offsetHeight);
        };
        
        const main = mainRef.current;

        if (main) {
            main.addEventListener('scroll', eventHandler);
        }

        return () => {
            if (main) main.removeEventListener('scroll', eventHandler);
        }
    }, []);
    
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
            <main ref={mainRef} className="h-full flex-1 overflow-hidden overflow-y-auto scrollbar-thin py-2">
                {children}
            </main>
        </div>
    );
};

export default Sidebar;
