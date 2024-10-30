'use client';
import Link from 'next/link';
import { useState } from 'react';
import Typing from './Typing';

export default function Main({code}: {code: string}) {
    const [parentBg, setParentBg]=useState('inherit');
    return (
        <div className={`transition-all duration-500 flex flex-row w-[100vw] h-[100vh] justify-around items-center ${parentBg}`}>
            <Link
                href={`/quest?code=${code}`}
                onMouseEnter={()=>{setParentBg('parent-background-blue')}}
                onMouseLeave={()=>{setParentBg('inherit')}}
                className='transition-all duration-500 ease-in-out w-[40vw] h-[50vh] bg-[#ffffff90] p-10 flex flex-col justify-center gap-5 rounded-3xl hover:scale-105  hover:border-2 hover:border-[#14c5a8]'>
                <h1 className='text-4xl'>Quests💎</h1>
                <p className='text-lg'>
                    Play quests game where you will have to find the song name while listening it
                    for 3 seconds
                </p>
            </Link>
            <Link
                href={`/typing?code=${code}`}
                onMouseEnter={()=>{setParentBg('parent-background-green')}}
                
                onMouseLeave={()=>{setParentBg('inherit')}}
                className='transition-all duration-500 ease-in-out w-[40vw] h-[50vh] bg-[#ffffff90] p-10 flex flex-col justify-center gap-5 rounded-3xl hover:scale-105  hover:border-2 hover:border-[#61e686]'>
                <h1 className='text-4xl'>Typing...</h1>
                <p className='text-lg'>
                    Play quests game whre you will have to find the song name while listening it for
                    3 seconds
                </p>
            </Link>
        </div>
    );
}

