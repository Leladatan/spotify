"use client";
import uniqid from "uniqid";
import React, {FC, useState} from 'react';
import Modal from "./Modal";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import Input from "@/components/Input";
import Button from "@/components/Button";
import toast from "react-hot-toast";
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import {useRouter} from "next/navigation";
import {useUser} from "@/hooks/useUser";
import useAccountModal from "@/hooks/useAccountModal";
import {translit} from "@/functions";

const AccountModal: FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const accountModal = useAccountModal();
    const user = useUser().user;
    const {register, handleSubmit, reset} = useForm<FieldValues>({
        defaultValues: {
            full_name: null,
            avatar_url: null,
        }
    });
    const supabaseClient = useSupabaseClient();
    const router = useRouter();

    const onChange = (open: boolean) => {
        if (!open) {
            reset();
            accountModal.onClose();
        }
    }

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try {
            setIsLoading(true);

            const imageFile = values.image?.[0];

            if (!imageFile || !user) {
                toast.error('Missing fields');
                return;
            }

            const uniqueID = uniqid();

            const {data: imageData, error: imageError} = await supabaseClient
                .storage
                .from('images')
                .upload(`image-${translit(values.full_name)}-${uniqueID}`, imageFile, {
                    cacheControl: '3600',
                    upsert: false
                });

            if (imageError) {
                setIsLoading(false);
                return toast.error('Failed image upload')
            }

            const {error: supabaseError} = await supabaseClient
                .from('users')
                .update({
                    full_name: values.full_name,
                    avatar_url: imageData?.path,
                })
                .match({id: user.id});

            if (supabaseError) {
                setIsLoading(false);
                return toast.error(supabaseError.message);
            }

            router.refresh();
            setIsLoading(false);
            toast.success('Settings update!');
            reset();
            accountModal.onClose();
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Modal
            title="Settings"
            description="Upload settings profile"
            isOpen={accountModal.isOpen}
            onChange={onChange}
        >
            <form onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-y-4"
            >
                <Input
                    id="full_name"
                    disabled={isLoading}
                    {...register("full_name", {required: true})}
                    placeholder="Your name"
                />
                <div>
                    <p className="pb-1">
                        Select an image
                    </p>
                    <Input
                        id="image"
                        type="file"
                        disabled={isLoading}
                        accept="image/*"
                        {...register("image", {required: true})}
                    />
                </div>
                <Button disabled={isLoading} type="submit">
                    Update
                </Button>
            </form>
        </Modal>
    );
};

export default AccountModal;
