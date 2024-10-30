'use client';
import { useRouter } from 'next/navigation';
import {useEffect, useState} from 'react';
export default function useAuth(code: string) {
    const router=useRouter();
    const [accessToken, setAccessToken] = useState<string>();
    const [refreshToken, setRefreshToken] = useState<string>();
    const [expiresIn, setExpiresIn] = useState<number>();

    const logIn = async () => {
        const res = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({code}),
        });
        if (res.ok) {
            const data = await res.json();
            if (data.success) {
                setAccessToken(data.success.accessToken);
                setRefreshToken(data.success.refreshToken);
                setExpiresIn(data.success.expiresIn);
            }
            if (data.error) {
                console.log('DATA ERROR IN USEAUTH: ', data.error);
            }
        } else {
            router.replace('/')
        }
    };
    useEffect(() => {
        logIn();
    }, [code]);

    const refresh = () => {
        if (refreshToken && expiresIn) {
            const timeout = setInterval(async () => {
                const res = await fetch('/auth/refresh', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({refreshToken}),
                });
                const data = await res.json();
                if (data.success) {
                    setAccessToken(data.success?.accessToken);
                    setExpiresIn(data.success?.expiresIn);
                }
                if (data.error) {
                    console.log(data.error);
                }
            }, (expiresIn - 60) * 1000);
            return () => clearInterval(timeout);
        }
    };

    useEffect(() => {
        refresh();
    }, [refreshToken, expiresIn]);

    return accessToken;
}
