"use client";
import React, {FC} from 'react';
import * as RadixSlider from "@radix-ui/react-slider";

interface SliderProps {
    value?: number;
    onChange?: (value: number) => void
}

const Slider: FC<SliderProps> = ({value = 1, onChange}) => {
    const handleChange = (newValue: number[]) => {
        localStorage.setItem("volume", String(newValue[0]));
        onChange?.(newValue[0]);
    }

    return (
        <RadixSlider.Root
            className="relative flex items-center select-none touch-none w-full h-10"
            defaultValue={[1]}
            value={[value]}
            onValueChange={handleChange}
            max={1}
            step={0.1}
            aria-label="Volume"
        >
            <RadixSlider.Track className="bg-neutral-600 relative grow rounded-full h-[3px]">
                <RadixSlider.Range className="absolute bg-white rounded-full h-full"/>
            </RadixSlider.Track>
            <RadixSlider.Thumb className="block w-[6px] h-[6px] bg-white rounded-full hover:w-[9px] hover:h-[9px] focus:outline-0 focus:shadow" aria-label="Volume" />
        </RadixSlider.Root>
    );
};

export default Slider;