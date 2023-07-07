"use client";
import React, {FC} from 'react';
import {Song} from "@/types";
import MediaItem from "@/components/MediaItem";
import LikeButton from "@/components/LikeButton";
import {useUser} from "@/hooks/useUser";
import useOnPlay from "@/hooks/useOnPlay";
import {twMerge} from "tailwind-merge";
import usePlayer from "@/hooks/usePlayer";

interface SearchContent {
    songs: Song[];
}

const SearchContent: FC<SearchContent> = ({songs}) => {
    const player = usePlayer();
    const {isLoading, user} = useUser();
    const onPlay = useOnPlay(songs);

    if (songs.length === 0) {
        return (
            <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
                No songs found.
            </div>
        )
    }

    return (
        <div className={twMerge(`flex flex-col gap-y-2 w-full px-6 h-full`, (player.activeId || isLoading && user) && "h-[calc(100%-130px)]")}>
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
    );
};

export default SearchContent;
