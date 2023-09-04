import React from 'react';
import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import getSongsByTitle from "@/actions/getSongsByTitle";
import type {Metadata} from 'next';
import getUserId from "@/actions/getUserId";
import {Song, UserDetails} from "@/types";
import MainContent from "@/app/search/components/MainContent";
import getSongsByAuthor from "@/actions/getSongsByAuthor";

interface SearchPage {
    searchParams: {
        title: string;
    }
}

export const metadata: Metadata = {
    title: 'Search songs',
    description: 'Search all songs',
}

export const revalidate = 0;

const SearchPage = async ({searchParams}: SearchPage) => {
    const userData: UserDetails[] = await getUserId();
    const songs: Song[] = await getSongsByTitle(searchParams.title);
    const authors: Song[] = await getSongsByAuthor(searchParams.title);

    return (
        <div
            className="
                bg-neutral-900
                rounded-lg
                h-full
                w-full overflow-hidden overflow-y-auto scrollbar-thin
            "
        >
            <Header userData={userData}>
                <div className="
                    mb-2
                    flex
                    flex-col
                    gap-y-6
                ">
                    <h1 className="text-white text-3xl font-semibold">
                        Search
                    </h1>
                    <SearchInput/>
                </div>
            </Header>
            <MainContent songs={songs} authors={authors} />
        </div>
    );
};

export default SearchPage;
