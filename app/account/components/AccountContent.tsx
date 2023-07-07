"use client";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {useUser} from "@/hooks/useUser";

const AccountContent = () => {
    const router = useRouter();
    const {isLoading, user} = useUser();

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace('/');
        }
    }, [isLoading, user, router]);


    return (
        <div className="mb-7 px-6">
            Profile
        </div>
    );
}

export default AccountContent;