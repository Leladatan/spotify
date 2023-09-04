import {NextPage} from "next";
import Header from "@/components/Header";
import type {Metadata} from 'next';
import AccountContent from "@/app/account/components/AccountContent";
import getUserId from "@/actions/getUserId";
import getSongsByUserId from "@/actions/getSongsByUserId";
import {Song, UserDetails} from "@/types";

export const metadata: Metadata = {
    title: 'Spotify: profile',
    description: 'Spotify profile',
}

const AccountPage: NextPage = async () => {
    const userData: UserDetails[] = await getUserId();
    const userSongs: Song[] = await getSongsByUserId();

    return (
        <div className="
            bg-neutral-900
            rounded-lg
            h-full
            w-full overflow-hidden overflow-y-auto scrollbar-thin
        ">
            <Header userData={userData}>
                <div className="mb-2 flex flex-col gap-y-6">
                    <h1 className="text-white text-3xl font-semibold">
                        Account Settings
                    </h1>
                </div>
            </Header>
            <AccountContent userData={userData} songs={userSongs}/>
        </div>
    );
};

export default AccountPage;

