"use client";
import React, {FC, useEffect} from "react";
import {useRouter} from "next/navigation";
import {useUser} from "@/hooks/useUser";
import Image from "next/image";
import Loader from "@/components/Loader";
import Button from "@/components/Button";
import Library from "@/components/Library";
import {Song} from "@/types";
import useAccountModal from "@/hooks/useAccountModal";
import useLoadImageUser from "@/hooks/useLoadImageUser";

interface AccountContentProps {
    userData: any;
    songs: Song[];
}

const AccountContent: FC<AccountContentProps> = ({userData, songs}) => {
    const router = useRouter();
    const accountModal = useAccountModal();
    const {isLoading, user} = useUser();
    const imageUrl = useLoadImageUser(userData);

    const onClick = () => {
        return accountModal.onOpen();
    };

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace('/');
        }
    }, [isLoading, user, router]);

    if (isLoading) {
        return <Loader/>
    }

    return (
        <main className="mb-7 px-6 xsm:px-2 flex flex-col xsm:items-center gap-y-6">
            <div className="flex acc:flex-col gap-x-6 acc:gap-y-4 acc:gap-x-0">
                <Image src={imageUrl || '/images/liked.png'} priority className="rounded-full object-cover" width={200}
                       height={200} alt="Profile image"/>
                <div className="flex flex-col gap-y-2">
                    <h2>User: {userData[0]?.full_name}</h2>
                    <h2>E-mail: <span>{user?.email}</span></h2>
                    <Button
                        className="w-[250px] h-[50px]"
                        onClick={onClick}
                    >
                        Edit profile
                    </Button>
                </div>
            </div>
            <Library songs={songs}/>
        </main>
    );
}

export default AccountContent;
