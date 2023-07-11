"use client";
import React, {FC, useContext, useEffect, useState} from 'react';
import {TbPlaylist} from "react-icons/tb";
import {AiOutlinePlus} from "react-icons/ai";
import useAuthModal from "@/hooks/useAuthModal";
import {UserContext, useUser} from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";
import {Song} from "@/types";
import MediaItem from "@/components/MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import Loader from "@/components/Loader";
import {BsArrowDownUp} from "react-icons/bs";

interface LibraryProps {
    songs: Song[];
}

const Library: FC<LibraryProps> = ({songs}) => {
    const [songsData, setSongsData] = useState<Song[]>(songs);
    const [isReversed, setIsReversed] = useState<boolean>(false);
    const onPlay = useOnPlay(songs);
    const authModal = useAuthModal();
    const {isLoading} = useUser();
    const uploadModal = useUploadModal();

    const context = useContext(UserContext);

    useEffect((): void => {
        const result = [...songsData].reverse();

        setSongsData(result);
    }, [isReversed]);

    if (!context) {
        return null;
    }
    const {user} = context;

    const onClick = (): void => {
        if (!user) {
            return authModal.onOpen();
        }

        return uploadModal.onOpen();
    };

    const toggleReverse= (): void => {
        songs.reverse();
        setIsReversed(prev => !prev);
    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between px-5 py-4">
                <div className="inline-flex items-center gap-x-2">
                    <TbPlaylist className="text-neutral-400" size={26} />
                    <p>
                        Your Library
                    </p>
                </div>
                <div className="flex items-center gap-x-2">
                    <BsArrowDownUp size={26} onClick={toggleReverse} color={isReversed ? '#22c55e': 'rgb(163 163 163)'} className="text-neutral-400 cursor-pointer hover:text-white transition" />
                    <AiOutlinePlus onClick={onClick} size={26} className="text-neutral-400 cursor-pointer hover:text-white transition"/>
                </div>
            </div>
            <div className="flex flex-col gap-y-2 mt-4 px-3">
                {songsData.map(song => (
                    <MediaItem
                        onClick={(id: string) => onPlay(id)}
                        key={song.id}
                        data={song}
                    />
                ))}
            </div>
        </div>
    );
};

export default Library;
