"use client"
import React, {FC, useEffect} from 'react';
import Modal from "@/components/Modal";
import {useSessionContext, useSupabaseClient} from "@supabase/auth-helpers-react";
import {useRouter} from "next/navigation";
import {Auth} from "@supabase/auth-ui-react";
import {ThemeSupa} from "@supabase/auth-ui-shared";
import useAuthModal from "@/hooks/useAuthModal";

const AuthModal: FC = ({}) => {

    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const {session} = useSessionContext();
    const { onClose, isOpen } = useAuthModal();

    useEffect(() => {
        if (session) {
            router.refresh();
            onClose();
        }
    }, [router, session, onClose]);

    const onChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    }

    return (
        <Modal isOpen={isOpen} onChange={onChange} title={"Welcome back"} description={"Login to your account"}>
            <Auth
                theme="dark"
                magicLink
                providers={["github", "discord", "google"]}
                supabaseClient={supabaseClient}
                appearance={{theme: ThemeSupa, variables: {default: {colors: {brand: "#404040", brandAccent: "#22c55e"}}}}}
            />
        </Modal>
    );
};

export default AuthModal;