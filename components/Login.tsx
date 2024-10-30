'use client'
import vector from '@/assets/Vector.svg';
import blob from '@/assets/bloob.png';
import heart from '@/assets/heart-svgrepo-com.svg';
import musicGirl from '@/assets/Music-bro.svg';
import gitHubLogo from '@/assets/Github.svg';
import gitHubHover from '@/assets/Github-hover.svg';
import twitterLogo from '@/assets/Twitter.svg';
import twitterHover from '@/assets/Twitter-hover.svg';
import linkedInLogo from '@/assets/Linkedin.svg';
import linkedInHover from '@/assets/Linkedin-hover.svg';
import facebookLogo from '@/assets/Facebook.svg';
import facebookHover from '@/assets/Facebook-hover.svg';
import skyMusic from '@/assets/SkyMusic.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Login() {
    const [authUrl, setAuthUrl]=useState<string>()
    useEffect(()=>{
        const clientId=process.env.NEXT_PUBLIC_CLIENT_ID
        const redirectUri=process.env.NEXT_PUBLIC_REDIRECT_URI
        setAuthUrl(`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=streaming%20user-read-email%20user-read-private%20user-top-read%20user-library-read%20user-library-modify%20playlist-read-private%20playlist-modify-public%20playlist-modify-private`)
    },[])
    return (
        <>
            <section className='flex lg:flex-row justify-between pl-44 pr-20 sm:flex-col'>
                <section className='flex h-[443px] w-[611px] flex-col py-32 font-poppins text-[#315F3E]'>
                    <Image
                        alt=''
                        height={368}
                        width={457}
                        className='absolute'
                        src={vector}
                    />
                    <h1 className='z-[1] ml-[90px] mt-20 text-[40px]'>
                        {/* TODO:change heart color with animation */}
                        We
                        <Image
                            alt=''
                            height={60}
                            width={60}
                            className='z-2 inline'
                            src={heart}
                        />
                        Spotify
                    </h1>
                    <p className='z-[1] ml-8 mt-4 w-96 text-center text-[18px]'>
                        Welcome to SkyMusic! Guess the song title from a snippet of lyrics and test
                        your musical knowledge. Log in to start your melodious adventure!
                    </p>
                    <Link
                        className='dual-border-button z-[1] ml-28 mt-4 block h-14 w-52 rounded-full px-4 py-2 text-[20px] text-[#315F3E] hover:bg-[#ffffff75] hover:text-[#14c5a8]'
                        href={authUrl?authUrl:''}
                    >
                        Login with Spotify
                    </Link>
                </section>
                <section className='flex h-[443px] w-[611px] flex-col py-20'>
                    <Image
                        alt=''
                        height={497}
                        width={475}
                        className='absolute'
                        src={musicGirl}
                    />
                </section>
            </section>
            <Image
                src={blob}
                alt=''
                height={32}
                className='fixed bottom-0 right-0 h-32 w-full'
            />
            <footer className='fixed -bottom-[100px] -left-0 flex h-32 w-full flex-row justify-start gap-12 pl-12 align-middle sm:flex-wrap'>
                <a href='/'>
                    <Image
                        alt='logo'
                        src={skyMusic}
                    />
                </a>
                <h3 className='footer-elem relative text-black'>About</h3>
                <h3 className='footer-elem relative text-black'>API usage</h3>
                <h3 className='footer-elem relative text-black'>Terms&Conditions</h3>
                <h3 className='footer-elem relative text-black'>Privacy Policy</h3>
                <a className='group mt-1 block'>
                    <Image
                        alt=''
                        className='block group-hover:first:hidden'
                        src={gitHubLogo}
                    />
                    <Image
                        alt=''
                        className='hidden group-hover:last:block'
                        src={gitHubHover}
                    />
                </a>
                <a className='group mt-1 block'>
                    <Image
                        alt=''
                        className='block group-hover:first:hidden'
                        src={facebookLogo}
                    />
                    <Image
                        alt=''
                        className='hidden group-hover:last:block'
                        src={facebookHover}
                    />
                </a>
                <a className='group mt-1 block'>
                    <Image
                        alt=''
                        className='block group-hover:first:hidden'
                        src={linkedInLogo}
                    />
                    <Image
                        alt=''
                        className='hidden group-hover:last:block'
                        src={linkedInHover}
                    />
                </a>
                <a className='group mt-1 block'>
                    <Image
                        alt=''
                        className='block group-hover:first:hidden'
                        src={twitterLogo}
                    />
                    <Image
                        alt=''
                        className='hidden group-hover:last:block'
                        src={twitterHover}
                    />
                </a>
            </footer>
        </>
    );
}
