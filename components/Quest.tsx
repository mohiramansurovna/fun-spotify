'use client';
import React, {useEffect} from 'react';
import Random from './Random';
import Search from './Search';
import useAuth from '@/hooks/useAuth';
import {spotifyApi} from '@/data/SpotifyAPI';
import {useSearchParams} from 'next/navigation';


export default function Typing() {
    const code = useSearchParams().get('code');

    //accessToken update in every hour after i get it form useAuth
    let accessToken:any;
    if(code){
      accessToken = useAuth(code);
    }
    useEffect(() => {
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken);
    }, [accessToken]);

    return (
        <div className='w-[100vw] h-[100vh] bg-[#c8e0d0] flex flex-col justify-center items-center'>
            <Random />
            <Search accessToken={accessToken} />
        </div>
    );
}
