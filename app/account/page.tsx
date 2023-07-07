import AccountContent from "./components/AccountContent";
import {NextPage} from "next";
import Header from "@/components/Header";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Spotify: profile',
  description: 'Spotify profile',
}

const AccountPage: NextPage = () => {
    return (
        <div className="
            bg-neutral-900 
            rounded-lg 
            h-full 
            w-full 
            overflow-hidden 
            overflow-y-auto
        ">
          <Header className="from-bg-neutral-900">
            <div className="mb-2 flex flex-col gap-y-6">
              <h1 className="text-white text-3xl font-semibold">
                Account Settings
              </h1>
            </div>
          </Header>
          <AccountContent />
        </div>
    );
};

export default AccountPage;

