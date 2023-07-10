"use client";
import uniqid from "uniqid";
import React, {FC, useContext, useState} from 'react';
import Modal from "./Modal";
import useUploadModal from "@/hooks/useUploadModal";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import Input from "@/components/Input";
import Button from "@/components/Button";
import toast from "react-hot-toast";
import {UserContext} from "@/hooks/useUser";
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import {useRouter} from "next/navigation";
import {translit} from "@/functions";

const UploadModal: FC = ({}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const uploadModal = useUploadModal();
    const {register, handleSubmit, reset} = useForm<FieldValues>({
        defaultValues: {
            author: '',
            title: '',
            song: null,
            image: null,
        }
    });
    const supabaseClient = useSupabaseClient();
    const router = useRouter();

    const context = useContext(UserContext);
    if (!context) {
        return null;
    }
    const {user} = context;

    const onChange = (open: boolean): void => {
        if (!open) {
            reset();
            uploadModal.onClose();
        }
    }

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try {
            setIsLoading(true);

            const imageFile = values.image?.[0];
            const songFile = values.song?.[0];

            if (!imageFile || !songFile || !user) {
                toast.error('Missing fields');
                return;
            }

            const uniqueID = uniqid();

            const {data: songData, error: songError} = await supabaseClient
                .storage
                .from('songs')
                .upload(`song-${translit(values.title)}-${uniqueID}`, songFile, {
                    cacheControl: '3600',
                    upsert: false
                });

            if (songError) {
                setIsLoading(false);
                return toast.error('Failed song upload')
            }

            const {data: imageData, error: imageError} = await supabaseClient
                .storage
                .from('images')
                .upload(`image-${translit(values.title)}-${uniqueID}`, imageFile, {
                    cacheControl: '3600',
                    upsert: false
                });

            if (imageError) {
                setIsLoading(false);
                return toast.error('Failed image upload')
            }

            const {error: supabaseError} = await supabaseClient
                .from('songs')
                .insert({
                    user_id: user.id,
                    title: values.title,
                    author: values.author,
                    image_path: imageData?.path,
                    song_path: songData?.path,
                });

            if (supabaseError) {
                setIsLoading(false);
                return toast.error(supabaseError.message);
            }

            router.refresh();
            setIsLoading(false);
            toast.success('Song created!');
            reset();
            uploadModal.onClose();
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Modal
            title="Add a song"
            description="Upload an mp3 file"
            isOpen={uploadModal.isOpen}
            onChange={onChange}
        >
            <form onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-y-4"
            >
                <Input
                    id="title"
                    disabled={isLoading}
                    {...register("title", {required: true})}
                    placeholder="Song title"
                />
                <Input
                    id="author"
                    disabled={isLoading}
                    {...register("author", {required: true})}
                    placeholder="Song author"
                />
                <div>
                    <p className="pb-1">
                        Select a song file
                    </p>
                    <Input
                        id="song"
                        type="file"
                        disabled={isLoading}
                        accept=".mp3"
                        {...register("song", {required: true})}
                    />
                </div>
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
                    Create
                </Button>
            </form>
        </Modal>
    );
};

export default UploadModal;
