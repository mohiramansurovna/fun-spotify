'use client';
import {Track} from '@/types';
import React, {useEffect} from 'react';
import TextRender from './TextRender';

export default function Lyrics({track}: {track: Track}) {
    function cutLyrics(lyrics: string) {
        let index = 1;
        const l = lyrics.split('\n');
        l.forEach((lyric) => {
            lyric.startsWith('[Chorus') ? (index = l.indexOf(lyric)) : null;
        });
        let lyricsMap = [];
        for (let i = 1; i < 6; i++) {
            if (!l[index + 1].startsWith('[')) {
                lyricsMap.push(l[index + i]);
            }
        }
        return lyricsMap.join('\n');
    }

    //TODO: add album image as background
    const getLyrics = async () => {
        await fetch('/typing/lyrics', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({title: track.title, artist: track.artist}),
        })
            .then(async (res) => {
                if (res.ok) {
                    let {lyrics} = await res.json();
                    let shortLyrics = cutLyrics(lyrics);
                    // setLyrics(shortLyrics)
                    track.lyrics = shortLyrics;
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        getLyrics();
    }, []);

    return <TextRender track={track} />;
}
