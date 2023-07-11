import React from 'react';
import {NextPage} from "next";
import getLikedSongs from "@/actions/getLikedSongs";
import Header from "@/components/Header";
import Image from "next/image";
import LikedContent from "@/app/liked/components/LikedContent";
import type { Metadata } from 'next'
import getUserId from "@/actions/getUserId";

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Liked songs',
  description: 'Your liked songs',
}

const LikedPage: NextPage = async () => {
    const userData = await getUserId();
    const songs = await getLikedSongs();

    return (
        <div className="
            bg-neutral-900
            rounded-lg
            h-full
            w-full
            overflow-hidden
            overflow-y-auto
            scrollbar-thin
        ">
            <Header userData={userData}>
                <div className="mt-20">
                    <div className="
                        flex
                        flex-col
                        md:flex-row
                        items-center
                        gap-x-5
                    ">
                        <div className="
                            relative
                            h-32
                            w-32
                            lg:h-40
                            lg:w-40
                        ">
                            <Image fill alt="Playlist" src="/images/liked.png" className="object-cover rounded-lg" />
                        </div>
                        <div className="
                            flex
                            flex-col
                            gap-y-2
                            mt-4
                            md:mt-0
                        ">
                            <p className="
                                hidden md:block font-semibold text-3xl
                            ">
                                Playlist
                            </p>
                            <h1 className="
                                text-white
                                text-4xl
                                sm:text-5xl
                                lg:text-7xl
                                font-bold
                            ">
                                Liked Songs
                            </h1>
                        </div>
                    </div>
                </div>
            </Header>
            <LikedContent songs={songs} />
        </div>
    );
};

export default LikedPage;
