"use client";
import React, {FC} from 'react';
import usePlayer from "@/hooks/usePlayer";
import useGetSongById from "@/hooks/useGetSongById";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import {useUser} from "@/hooks/useUser";
import PlayerContent from "@/components/PlayerContent";

const Player: FC = () => {
    const player = usePlayer();
    const {song} = useGetSongById(String(player.activeId));
    const {isLoading, user} = useUser();
    const songUrl = useLoadSongUrl(song!);

    if (!song || !songUrl || !player.activeId || (!isLoading && !user)) {
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
