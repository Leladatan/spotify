"use client"
import {FC, useEffect, useState} from "react";
import AuthModal from "@/components/AuthModal";
import UploadModal from "@/components/UploadModal";
import AccountModal from "@/components/AccountModal";
const ModalProvider: FC = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <AuthModal/>
            <UploadModal/>
            <AccountModal/>
        </>
    );
}

export default ModalProvider;