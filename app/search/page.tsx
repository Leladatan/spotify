import React from 'react';
import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import SearchContent from "@/app/search/components/SearchContent";
import getSongsByTitle from "@/actions/getSongsByTitle";
import type {Metadata} from 'next';
import getUserId from "@/actions/getUserId";
import {Song, UserDetails} from "@/types";

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

    return (
        <div
            className="
                bg-neutral-900
                rounded-lg
                h-full
                w-full
                overflow-hidden
                overflow-y-auto
                scrollbar-thin
            "
        >
            <Header className="from-bg-neutral-900" userData={userData}>
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
            <SearchContent songs={songs}/>
        </div>
    );
};

export default SearchPage;
