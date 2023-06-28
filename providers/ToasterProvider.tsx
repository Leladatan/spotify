"use client";
import React, {FC} from 'react';
import {Toaster} from "react-hot-toast";

const ToasterProvider: FC = () => {
    return (
        <Toaster
            toastOptions={{style: {background: '#333', color: '#fff'}}}
        />
    );
};

export default ToasterProvider;