import React, {FC, ReactNode} from 'react';
import { IoMdClose } from "react-icons/io";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogOverlay,
    DialogPortal,
    DialogTitle
} from "@radix-ui/react-dialog";

interface  ModalProps {
    isOpen: boolean;
    onChange: (open: boolean) => void;
    title: string;
    description: string;
    children: ReactNode;
}
const Modal: FC<ModalProps> = ({isOpen, onChange, description, children, title}) => {
    return (
        <Dialog
            open={isOpen}
            defaultOpen={isOpen}
            onOpenChange={onChange}
        >
            <DialogPortal>
                <DialogOverlay
                    className="
                    bg-neutral-900/90
                    backdrop-blur-sm
                    fixed
                    inset-0
                    "
                />
                <DialogContent
                    className="
                    fixed
                    drop-shadow-md
                    border
                    border-neutral-700
                    top-[50%]
                    left-[50%]
                    max-h-full
                    h-full
                    md:h-auto
                    w-full
                    md:w-[90vw]
                    md:max-w-[450px]
                    translate-x-[-50%]
                    translate-y-[-50%]
                    rounded-md
                    bg-neutral-800
                    p-[25px]
                    focus:outline-none
                    "
                >
                    <DialogTitle
                        className="
                            text-xl
                            text-center
                            font-bold
                            md-4
                        "
                    >
                        {title}
                    </DialogTitle>
                    <DialogDescription
                        className="
                            mad-5
                            text-sm
                            leading-normal
                            text-center
                            pb-2
                        "
                    >
                        {description}
                    </DialogDescription>
                    <div>
                        {children}
                    </div>
                    <DialogClose asChild>
                        <button className="
                            text-neutral-400
                            hover:text-white
                            absolute
                            top-[10px]
                            right-[10px]
                            inline-flex
                            h-[25px]
                            w-[25px]
                            appearance-none
                            items-center
                            justify-center
                            rounded-full
                            focus:outline-none
                        ">
                            <IoMdClose/>
                        </button>
                    </DialogClose>
                </DialogContent>
            </DialogPortal>
        </Dialog>
    );
};

export default Modal;
