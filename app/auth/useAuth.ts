'use client';
import {useEffect, useState} from 'react';
export default function useAuth(code: string) {
    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [expiresIn, setExpiresIn] = useState();
    useEffect(() => {
        fetch('/auth/login', {
                code,
            })
            .then((res) => {
                setAccessToken(res.data.accessToken);
                setRefreshToken(res.data.refreshToken);
                setExpiresIn(res.data.expiresIn);
                //@ts-ignore
                window.history.pushState({}, null, '/');
            })
            .catch(() => {
                window.location.assign('/');
            });
    }, [code]);

    useEffect(() => {
        if (!refreshToken || !expiresIn) return;
        const timeout = setInterval(()=> {
            fetch('/auth/refresh', {
                    refreshToken,
                })
                .then((res) => {
                    setAccessToken(res.data.accessToken);
                    setExpiresIn(res.data.expiresIn);
                })
                .catch(() => {
                    window.location.assign('/');
                });
        },(expiresIn-60)*1000);
        return ()=>clearInterval(timeout)
    }, [refreshToken, expiresIn]);

    return accessToken;
}
