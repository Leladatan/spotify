"use client";
import React, {FC, useEffect, useState} from 'react';
import {Song} from "@/types";
import MediaItem from "@/components/MediaItem";
import LikeButton from "@/components/LikeButton";
import useOnPlay from "@/hooks/useOnPlay";
import {twMerge} from "tailwind-merge";
import usePlayer from "@/hooks/usePlayer";
import Loader from "@/components/Loader";
import {useUser} from "@/hooks/useUser";
import {BsArrowDownUp} from "react-icons/bs";

interface SearchContent {
    songs: Song[];
}

const SearchContent: FC<SearchContent> = ({songs}) => {
    const [songsData, setSongsData] = useState<Song[]>(songs);
    const [isReversed, setIsReversed] = useState<boolean>(false);
    const player = usePlayer();
    const onPlay = useOnPlay(songs);
    const {isLoading} = useUser();

    const toggleReverse= (): void => {
        songs.reverse();
        setIsReversed(prev => !prev);
    }

    useEffect((): void => {
        const result = [...songsData].reverse();

        setSongsData(result);
    }, [isReversed]);

    if (songs.length === 0) {
        return (
            <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
                No songs found.
            </div>
        )
    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <>
            <BsArrowDownUp size={26} onClick={toggleReverse} color={isReversed ? '#22c55e': 'rgb(163 163 163)'} className="text-neutral-400 cursor-pointer hover:text-white transition" />
            <div className={twMerge(`flex flex-col gap-y-2 w-full px-6 h-full`,  player.activeId && "h-[calc(100%-130px)]")}>
                {songs.map(song => (
                    <div
                        key={song.id}
                        className="
                        flex items-center gap-x-4 w-full
                    "
                    >
                        <div className="flex-1">
                            <MediaItem data={song} onClick={(id: string) => onPlay(id)}/>
                        </div>
                        <LikeButton songId={song.id} />
                    </div>
                ))}
            </div>
        </>
    );
};

export default SearchContent;
