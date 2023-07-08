"use client";
import {FC, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {useUser} from "@/hooks/useUser";
import {UserDetails} from "@/types";
import Image from "next/image";

interface AccountContentProps {
    userData: any;
}

const AccountContent: FC<AccountContentProps> = ({userData}) => {
    userData = JSON.parse(userData["value"]);
    const router = useRouter();
    const {isLoading, user} = useUser();

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace('/');
        }
    }, [isLoading, user, router]);

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div className="mb-7 px-6">
            <h1>Profile: {userData[0]?.id}</h1>
            <Image src={userData[0]?.avatar_url || '/images/liked.png'} width={200} height={200} loading="lazy" alt="Profile image"/>
            <div className="flex flex-col">
                <h2>User: {userData[0]?.full_name}</h2>
                <h2>E-mail: <span>{user?.email}</span></h2>
            </div>
        </div>
    );
}

export default AccountContent;