"use client"
import qs from "query-string";
import React, {FC, useEffect, useState} from 'react';
import {useRouter} from "next/navigation";
import useDebounce from "@/hooks/useDebounce";
import Input from "@/components/Input";

const SearchInput: FC = () => {
    const router = useRouter();
    const [value, setValue] = useState<string>("");
    const debouncedValue = useDebounce<string>(value, 500);

    useEffect((): void => {
        const query = {
            title: debouncedValue,
        };

        const url = qs.stringifyUrl({
            url: '/search',
            query: query,
        });

        router.push(url);
    }, [debouncedValue, router]);

    return (
        <Input
            placeholder="What do you want to listen to ?"
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    );
};

export default SearchInput;