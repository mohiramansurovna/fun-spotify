'use client';
import {useEffect, useRef, useState, useTransition} from 'react';
import {spotifyApi} from './Main';
import {Track} from '@/types';
import { useSearchParams } from 'next/navigation';
import useAuth from '@/hooks/useAuth';

export default function Quest() {
    const searchInput=useRef(null)
    const [search, setSearch] = useState<string>();
    const [change, setChange]=useState<string>();
    const [tracks, setTracks] = useState<Track[]>();
    const [isPending, startTransition] = useTransition();
    const code=useSearchParams().get('code')
    let accessToken:any;
    console.log(code)
    if(code){
        accessToken = useAuth(code)
    }
     //accessToken update in every hour after i get it form useAuth
     useEffect(() => {
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken);
    }, [accessToken]);

    useEffect(() => {
        if (!accessToken) return;
        if (search) {
            spotifyApi.search(search, ['track', 'artist'], {limit: 5, offset: 1}).then((res) => {
                let tracks: Track[] = [];
                res.body.tracks?.items.map((track) => {
                    tracks.push({
                        artist: track.artists[0].name,
                        title: track.name,
                        id: track.id,
                        lyrics: '',
                    });
                });
                setTracks(tracks);
            });
        }
    }, [search]);

    return (
        <div className='absolute-center'>
            <label htmlFor='search'>Search</label>
            <input id='search' onChange={(e)=>setChange(e.target.value)}/>
            <button  disabled={isPending} onClick={()=>setSearch(change)}>Search</button>            
            <ul>
            {tracks?.map((track) => {
                return (
                    <li>
                        <h1>{track.title}</h1>
                        <p>{track.artist}</p>
                    </li>
                );
            })}
            ul is working
            </ul>
        </div>
    );
}
