"use client";
import {FC} from 'react';
import {useRouter} from "next/navigation";
import {FaPlay} from "react-icons/fa";
import Image from "next/image";

interface ListItemProps {
    image: string;
    name: string;
    href: string;
}

const ListItem: FC<ListItemProps> = ({image, name, href}) => {
    const router = useRouter();

    const onClick = (): void => {
        router.push(href);
    }

    return (
        <button
            onClick={onClick}
            className="relative flex group items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4">
            <div className="relative min-h-[64px] min-w-[64px]">
                <Image
                    className="object-cover"
                    fill
                    src={image}
                    alt="like"
                />
            </div>
            <p className="font-medium truncate py-5">
                {name}
            </p>
            <div className="absolute transition opacity-0 rounded-full flex items-center justify-center bg-green-500 p-4 drop-shadow-md right-5 group-hover:opacity-100 hover:scale-110">
                <FaPlay className="text-black" />
            </div>
        </button>
    );
};

export default ListItem;