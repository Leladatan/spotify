"use client";

import { makeStyles } from '@mui/styles';
import {type FC, useEffect, useState} from 'react';
import SearchNameContent from "@/app/search/components/SearchNameContent";
import {Song} from "@/types";
import SearchAuthorContent from "@/app/search/components/SearchAuthorContent";
import {Tab, Tabs} from "@mui/material";

interface MainContentProps {
    songs: Song[];
    authors: Song[];
}

const useStyles: any = makeStyles({
    root: {
        '& .css-k7y545-MuiButtonBase-root-MuiTab-root.Mui-selected': {
            color: 'green',
        },
    },
});

function CustomTabPanel(props: any) {
    const { children, value, index, ...other } = props;

    return (
        <>
            {value === index && (
                <div
                    role="tabpanel"
                    hidden={value !== index}
                    id={`simple-tabpanel-${index}`}
                    aria-labelledby={`simple-tab-${index}`}
                    {...other}
                >
                    {children}
                </div>
            )}
        </>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const MainContent: FC<MainContentProps> = ({songs, authors}) => {
    const [value, setValue] = useState<number>(0);
    const [isMounted, setIsMounted] = useState<boolean>(false);

    const classes = useStyles();

    const handleChange = (event: any, newValue: number): void => {
        setValue(newValue);
    };

    useEffect((): void => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <div className="flex items-center px-6">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    className={classes.root}
                    TabIndicatorProps={{
                        style: {
                            backgroundColor: "rgb(34, 197, 94)"
                        }
                    }}
                >
                    <Tab label="songs" sx={{ color: 'white' }} {...a11yProps(0)} />
                    <Tab label="authors" sx={{ color: 'white' }} {...a11yProps(1)} />
                </Tabs>
            </div>
            <CustomTabPanel value={value} index={0}>
                <SearchNameContent songs={songs}/>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <SearchAuthorContent authors={authors}/>
            </CustomTabPanel>
        </>
    );
};

export default MainContent;
