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
    const router = useRouter();
    const {isLoading, user} = useUser();
    userData = JSON.parse(userData["value"]);
    // const arr = Object.values(userData[0]);

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace('/');
        }
    }, [isLoading, user, router]);

    // console.log(userData);
    // console.log(arr);

    return (
        <div className="mb-7 px-6">
            <h1>Profile</h1>
            <h1>{userData[0]?.id}</h1>
            <h1>{userData[0]?.full_name}</h1>
            <h1>E-mail: {user?.email}</h1>
            <Image src={userData[0]?.avatar_url || '/images/liked.png'} width={200} height={200} loading="lazy" alt="Profile image"/>
        </div>
    );
}

export default AccountContent;