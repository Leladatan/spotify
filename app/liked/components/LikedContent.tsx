"use client";
import React, {FC, useEffect, useState} from 'react';
import {Song} from "@/types";
import {useRouter} from "next/navigation";
import {useUser} from "@/hooks/useUser";
import MediaItem from "@/components/MediaItem";
import LikeButton from "@/components/LikeButton";
import useOnPlay from "@/hooks/useOnPlay";
import {twMerge} from "tailwind-merge";
import usePlayer from "@/hooks/usePlayer";
import Loader from "@/components/Loader";
import {BsArrowDownUp} from "react-icons/bs";
import Button from "@/components/Button";

interface LikedContentProps {
    songs: Song[];
}

const LikedContent: FC<LikedContentProps> = ({songs}) => {
    const [songsData, setSongsData] = useState<Song[]>(songs);
    const [isReversed, setIsReversed] = useState<boolean>(false);
    const router = useRouter();
    const {isLoading, user} = useUser();
    const player = usePlayer();

    const onPlay = useOnPlay(songs);

    const toggleReverse= (): void => {
        songs.reverse();
        setIsReversed(prev => !prev);
    }

    useEffect((): void => {
        if (!isLoading && !user) {
            router.replace('/');
        }
    }, [isLoading, router, user]);

    useEffect((): void => {
        const result = [...songsData].reverse();

        setSongsData(result);
    }, [isReversed]);

    if (songs.length === 0) {
        return <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">No liked songs</div>
    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <>
            <Button className="bg-white p-2 w-auto h-auto"><BsArrowDownUp size={26} onClick={toggleReverse} color={isReversed ? '#22c55e': 'rgb(163 163 163)'} className="text-neutral-400 cursor-pointer hover:text-white transition" /></Button>
            <div className={twMerge(`flex flex-col gap-y-2 w-full px-6 h-full`, player.activeId && "h-[calc(100%-130px)]")}>
                {songsData.map((song) => (
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
        </>
    );
};

export default LikedContent;
