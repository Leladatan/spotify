"use client"
import React, {FC, useContext} from 'react';
import {TbPlaylist} from "react-icons/tb";
import {AiOutlinePlus} from "react-icons/ai";
import useAuthModal from "@/hooks/useAuthModal";
import {UserContext} from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";
import {Song} from "@/types";
import MediaItem from "@/components/MediaItem";

interface LibraryProps {
    songs: Song[];
}

const Library: FC<LibraryProps> = ({songs}) => {
    const authModal = useAuthModal();
    const uploadModal = useUploadModal();
    const context = useContext(UserContext);
    if (!context) {
        return null;
    }
    const {user} = context;
    const onClick = () => {
        if (!user) {
            return authModal.onOpen();
        }

        return uploadModal.onOpen();
    };

    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between px-5 py-4">
                <div className="inline-flex items-center gap-x-2">
                    <TbPlaylist className="text-neutral-400" size={26} />
                    <p>
                        Your Library
                    </p>
                </div>
                <AiOutlinePlus onClick={onClick} size={26} className="text-neutral-400 cursor-pointer hover:text-white transition"/>
            </div>
            <div className="flex flex-col gap-y-2 mt-4 px-3">
                {songs.map(song => (
                    <MediaItem
                        onClick={() => {}}
                        key={song.id}
                        data={song}
                    />
                ))}
            </div>
        </div>
    );
};

export default Library;