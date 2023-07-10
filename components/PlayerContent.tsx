"use client";
import React, {FC, useEffect, useState} from 'react';
import {Song} from "@/types";
import MediaItem from "@/components/MediaItem";
import LikeButton from "@/components/LikeButton";
import {BsPauseFill, BsPlayFill} from "react-icons/bs";
import {AiFillStepBackward, AiFillStepForward, AiOutlineSync} from "react-icons/ai";
import {HiSpeakerWave, HiSpeakerXMark} from "react-icons/hi2";
import Slider from "@/components/Slider";
import usePlayer from "@/hooks/usePlayer";
import useSound from "use-sound";
import * as RadixSlider from "@radix-ui/react-slider";

interface PlayerContentProps {
    song: Song;
    songUrl: string;
}

const PlayerContent: FC<PlayerContentProps> = ({song, songUrl}) => {
    const player = usePlayer();
    const [volume, setVolume] = useState<number>(Number(localStorage.getItem("volume")));
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isRepeat, setIsRepeat] = useState<boolean>(false);

    const [time, setTime] = useState({
        min: "0",
        sec: "0"
    });
    const [currTime, setCurrTime] = useState({
        min: "0",
        sec: "0"
    });

    const [seconds, setSeconds] = useState<number>();

    const Icon = isPlaying ? BsPauseFill : BsPlayFill;
    const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

    const handleValue = (value: number): void => {
        setVolume(value);
    }

    const onPlayNext = () => {
        if (player.ids.length === 0) {
            return;
        }

        const currentIndex = player.ids.findIndex(id => id === player.activeId);

        const nextSong = player.ids[currentIndex + 1];

        if (!nextSong) {
            return player.setId(player.ids[0]);
        }

        player.setId(nextSong);
    };

    const onPlayPrev = () => {
        if (player.ids.length === 0) {
            return;
        }

        const prevIndex = player.ids.findIndex(id => id === player.activeId);

        const prevSong = player.ids[prevIndex - 1];

        if (!prevSong) {
            return player.setId(String(player.ids.length - 1));
        }

        player.setId(prevSong);
    };

    const [play, {pause, duration, sound}] = useSound(
        songUrl,
        {
            volume: volume,
            onplay: () => {
                setIsPlaying(true)
            },
            onend: () => {
                setIsPlaying(false);
                onPlayNext();
            },
            onpause: () => setIsPlaying(false),
            format: ['mp3']
        }
    );

    useEffect(() => {
        sound?.play();

        return () => sound?.unload();
    }, [sound]);

    useEffect(() => {
        if (duration) {
            const sec = duration / 1000;
            const min = String(Math.floor(sec / 60));
            const secRemain = String(Math.floor(sec % 60));
            setTime({
                min: min,
                sec: secRemain
            });
        }
    }, [isPlaying]);

    useEffect(() => {
        if (isRepeat && String(seconds! + 1).slice(0, 3) === String(duration!).slice(0, 3)) {
            setSeconds(sound.seek([0]));
            return () => clearInterval(interval);
        }

        const interval = setInterval(() => {
            if (sound) {
                setSeconds(sound.seek([]));
                const min = String(Math.floor(sound.seek([]) / 60));
                const sec = String(Math.floor(sound.seek([]) % 60));
                setCurrTime({
                    min,
                    sec
                });
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [sound]);

    const handlePlay = () => {
        if (!isPlaying) {
            play();
        } else {
            pause();
        }
    };

    const toggleMute = () => {
        if (volume === 0) {
            setVolume(Number(localStorage.getItem("volume")));
        } else {
            setVolume(0);
        }
    }

    const toggleRepeat = (): void => {
        setIsRepeat(prev => !prev);
    }

    return (
        <>

            <div>
                <div className="flex items-center justify-between">
                    <p className="text-gray-300 truncate text-xs">
                        {currTime.min}:{currTime.sec.length === 1 ? "0" + currTime.sec : currTime.sec}
                    </p>
                    <p className="text-gray-300 truncate text-xs">
                        {time.min}:{time.sec.length === 1 ? "0" + time.sec : time.sec}
                    </p>
                </div>
                <RadixSlider.Root
                    className="relative flex items-center select-none touch-none w-full h-5"
                    value={[seconds!]}
                    onValueChange={(newValue) => {
                        sound.seek([newValue[0]]);
                    }}
                    min={0}
                    max={duration! / 1000}
                    step={1}
                    aria-label="Duration"
                >
                    <RadixSlider.Track className="bg-neutral-600 relative grow rounded-full h-[7px]">
                        <RadixSlider.Range className="absolute bg-green-600 rounded-full h-full"/>
                    </RadixSlider.Track>
                    <RadixSlider.Thumb className="block w-[14px] h-[14px] bg-white rounded-full hover:w-[20px] hover:h-[20px] focus:outline-0 focus:shadow" aria-label="Duration" />
                </RadixSlider.Root>
            </div>
            <div className="
            flex xsm:flex-col items-center gap-y-2
            ">
                <div className="flex w-full justify-start xsm:justify-center">
                    <div className="flex items-center gap-x-4">
                        <MediaItem data={song}/>
                        <LikeButton songId={song.id}/>
                    </div>
                </div>

                <div
                    className="h-full flex justify-end xsm:justify-center md:justify-center items-center w-full max-w-[722px] gap-x-6">
                    <AiFillStepBackward
                        onClick={onPlayPrev}
                        size={30}
                        className="text-neutral-400 cursor-pointer hover:text-white transition"
                    />
                    <div
                        onClick={handlePlay}
                        className="flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer">
                        <Icon size={30} className="text-black"/>
                    </div>
                    <AiFillStepForward
                        onClick={onPlayNext}
                        size={30}
                        className="text-neutral-400 cursor-pointer hover:text-white transition"
                    />
                </div>

                <div className="hidden md:flex w-full justify-end pr-2">
                    <AiOutlineSync onClick={toggleRepeat} className="cursor-pointer" color={isRepeat ? "green": "white"} size={34} />
                    <div className="flex items-center gap-x-2 w-[120px]">
                        <VolumeIcon onClick={toggleMute} className="cursor-pointer" size={34}/>
                        <Slider value={volume} onChange={handleValue}/>
                    </div>
                </div>

            </div>
        </>
    );
};

export default PlayerContent;
