"use client";
import React, {FC, useEffect} from 'react';
import usePlayer from "@/hooks/usePlayer";
import {useUser} from "@/hooks/useUser";
import useGetSongById from "@/hooks/useGetSongById";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import PlayerContent from "@/components/PlayerContent";

const Player: FC = () => {
    const player = usePlayer();
    const user = useUser().user;
    const {song} = useGetSongById(String(player.activeId));
    const songUrl = useLoadSongUrl(song!);

    useEffect(() => {
        localStorage.getItem("volume") === null ? localStorage.setItem("volume", "1") : localStorage.getItem("volume");
    }, []);

    if (!song || !songUrl || !player.activeId || !user) {
        return null;
    }

    return (
        <div className="
            fixed bottom-0
            bg-black
            w-full
            py-2
            h-[130px]
            px-4
        ">
            <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
        </div>
    );
};

export default Player;
