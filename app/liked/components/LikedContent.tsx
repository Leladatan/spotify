"use client";
import React, {FC, useEffect} from 'react';
import {Song} from "@/types";
import {useRouter} from "next/navigation";
import {useUser} from "@/hooks/useUser";
import MediaItem from "@/components/MediaItem";
import LikeButton from "@/components/LikeButton";
import useOnPlay from "@/hooks/useOnPlay";
import {twMerge} from "tailwind-merge";
import usePlayer from "@/hooks/usePlayer";
import Loader from "@/components/Loader";
import {randomSongs} from "@/functions";

interface LikedContentProps {
    songs: Song[];
}

const LikedContent: FC<LikedContentProps> = ({songs}) => {
    const router = useRouter();
    const {isLoading, user} = useUser();
    const player = usePlayer();

    const onPlay = useOnPlay(songs);

    console.log(randomSongs(songs));

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace('/');
        }
    }, [isLoading, router, user]);

    if (songs.length === 0) {
        return <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">No liked songs</div>
    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <div className={twMerge(`flex flex-col gap-y-2 w-full px-6 h-full`, player.activeId && "h-[calc(100%-130px)]")}>
            {songs.map((song) => (
                <div
                    key={song.id}
                    className="flex items-center gap-x-4 w-full"
                >
                    <div className="flex-1">
                        <MediaItem onClick={(id: string) => onPlay(id)} data={song}/>
                    </div>
                    <LikeButton songId={song.id}/>
                </div>
            ))}
        </div>
    );
};

export default LikedContent;
