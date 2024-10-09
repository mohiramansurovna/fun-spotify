'use client';
import {login} from '@/actions/login';
import {refresh} from '@/actions/refresh';
import {useEffect, useState} from 'react';
type ResType = {
    success?: {
        accessToken: string;
        refreshToken?: string;
        expiresIn: number;
    };
    error?: string;
};
export default function useAuth(code: string) {
    const [accessToken, setAccessToken] = useState<string>();
    const [refreshToken, setRefreshToken] = useState<string>();
    const [expiresIn, setExpiresIn] = useState<number>();
    const logInAction = async () => {
        const res = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({code}),
        });
        const data = await res.json();

        if (data.success) {
            setAccessToken(data.success.accessToken);
            setRefreshToken(data.success.refreshToken);
            setExpiresIn(data.success.expiresIn);
        }
        if (data.error) {
            console.log(data.error);
        }
    };
    useEffect(() => {
        logInAction();
    }, [code]);

    const refreshAction = () => {
        if (!refreshToken || !expiresIn) return;
        const timeout = setInterval(() => {
            refresh(refreshToken)
                .then((res: ResType) => {
                    setAccessToken(res.success?.accessToken);
                    setExpiresIn(res.success?.expiresIn);
                })
                .catch(() => {
                    window.location.assign('/');
                });
        }, (expiresIn - 60) * 1000);
        return () => clearInterval(timeout);
    };

    useEffect(() => {
        refreshAction();
    }, [refreshToken, expiresIn]);

    return accessToken;
}
