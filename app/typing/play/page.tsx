'use client';
import {Track} from '@/types';
import {useSearchParams} from 'next/navigation';
import React, {useState} from 'react';
import SpotifyWebPlayer from 'react-spotify-web-playback';
import {GoPlay} from 'react-icons/go';
import {DotLottieReact} from '@lottiefiles/dotlottie-react';
import {MdPauseCircleOutline} from 'react-icons/md';

export default function Play() {
    const accessToken = useSearchParams().get('token');
    const [play, setPlay] = useState(false);
    const res = useSearchParams().get('track');
    if (!res) return;
    const {track}: {track: Track} = JSON.parse(res);

    return (
        accessToken && (
            <div className='w-[100vw] h-[100vh] m-0 absolute-center fixed bg-[#9176a7]'>
                <div className='opacity-0'>
                    <SpotifyWebPlayer
                        token={accessToken}
                        uris={track.uri}
                        play={play}
                    />
                </div>
                {play && (
                    <DotLottieReact
                        src='https://lottie.host/1e64dcc8-a378-4531-9950-121c32180c0a/4OzgZqmfFT.lottie'
                        loop
                        autoplay
                        className='opacity-50 -translate-y-4'
                    />
                )}
                <button
                    className='absolute-center'
                    onClick={() => {
                        setPlay(play ? false : true);
                    }}>
                    {play ? (
                        <MdPauseCircleOutline className=' w-[26vw] h-[26vh] text-[#000]' />
                    ) : (
                        <GoPlay className=' w-[25vw] h-[25vh] text-[#000]' />
                    )}
                </button>
            </div>
        )
    );
}
