'use client'

import {useEffect} from "react";

export default function OldBrowserSupport(){
    useEffect(() => {
        const isOldSafari = () => {
            const ua = navigator.userAgent;
            const safariMatch = ua.match(/Version\/(\d+)\.(\d+).*Safari/);
            if (safariMatch) {
                const major = parseInt(safariMatch[1], 10);
                return major <= 11;
            }
            return false;
        };

        if (isOldSafari()) {
            const script = document.createElement("script");
            script.src = "https://cdn.tailwindcss.com";
            script.defer = true;
            document.head.appendChild(script);
        }
    }, []);

    return <></>
}