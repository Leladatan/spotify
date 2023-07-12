"use client";
import React, {FC, useEffect, useState} from 'react';
import {Song} from "@/types";
import SongItem from "@/components/SongItem";
import useOnPlay from "@/hooks/useOnPlay";
import usePlayer from "@/hooks/usePlayer";
import {twMerge} from "tailwind-merge";
import {useUser} from "@/hooks/useUser";
import Loader from "@/components/Loader";

interface SongsContentProps {
    songs: Song[];
}

const SongsContent: FC<SongsContentProps> = ({songs}) => {
    const [songsData, setSongsData] = useState<Song[]>(songs);
    const onPlay = useOnPlay(songs);
    const player = usePlayer();
    const {isLoading} = useUser();

    const scrollHandler = (e: any): void => {
        let h: number = e.target.documentElement.scrollHeight;
        let t: number = e.target.documentElement.scrollTop;
        let w: number = window.innerHeight;
        if (h - (t + w) < 100) {
            console.log([...songsData, ...songs]);
            console.log("mem");
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', scrollHandler);
        return (): void => {
            window.removeEventListener('scroll', scrollHandler);
        }
    }, []);

    if (isLoading) {
        return <Loader />
    }

    if (songs.length === 0) {
        return (
            <div className="mt-4 text-neutral-400">
                No songs available.
            </div>
        )
    }
    return (
        <div
            className={twMerge(`grid
            grid-cols-2
            sm:grid-cols-3
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-4
            mt-4 h-full`, player.activeId && "h-[calc(100%-130px)]")}>
            {songsData.map(song => (
                <SongItem
                    key={song.id}
                    onClick={(id: string) => onPlay(id)}
                    data={song}
                />
            ))}
        </div>
    );
};

export default SongsContent;
