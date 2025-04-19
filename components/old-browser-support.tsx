'use client'

import {useEffect} from "react";

export default function OldBrowserSupport(){
    useEffect(() => {
        const ua = navigator.userAgent;
        const isSafari = /^((?!chrome|android).)*safari/i.test(ua);
        const match = ua.match(/Version\/(\d+)\./);

        if (isSafari && match && parseInt(match[1], 10) <= 11) {
            const script = document.createElement("script");
            script.src = "https://cdn.tailwindcss.com";
            script.async = true;
            document.head.appendChild(script);
        }
    }, []);

    return <></>
}