import searchTrackByTitle from '@/data/searchTrackByTitle';
import {ResTypeArr, Track} from '@/types';
import Link from 'next/link';
import {Dispatch, SetStateAction, useEffect, useState, useTransition} from 'react';

export default function Search({
    accessToken,
    setTrack,
}: {
    accessToken: string;
    setTrack: Dispatch<SetStateAction<Track | undefined>>;
}) {
    const [search, setSearch] = useState<string>();
    const [input, setInput] = useState<string>();
    const [tracks, setTracks] = useState<Track[]>();
    const [error, setError] = useState<string>();
    const [isPending, startTransition] = useTransition();

    const getSearchedTracks = () => {
        if (!search) return;
        startTransition(async () => {
            await searchTrackByTitle(search).then((res: ResTypeArr) => {
                if (res.success) {
                    setTracks(res.success);
                }
                if (res.error) {
                    setError(res.error);
                }
            });
        });
    };

    useEffect(() => {
        if (!accessToken) return;
        getSearchedTracks();
    }, [search]);
    return (
        <div className='absolute-center'>
            <input onChange={(e) => setInput(e.target.value)} />
            <button
                disabled={isPending}
                onClick={() => setSearch(input)}>
                Search
            </button>
            {isPending ? (
                <h1>Loading</h1>
            ) : (
                <ul>
                    {tracks?.map((track: Track, index) => {
                        return (
                            <div key={index}
                                onClick={() => {
                                    setTrack(track);
                                }}>
                                <li>
                                    <h1>{track.title}</h1>
                                    <p>{track.artist}</p>
                                </li>
                            </div>
                        );
                    })}
                </ul>
            )}
            {error && <h1>{error}</h1>}
        </div>
    );
}
// return (
//     <div className='absolute-center'>
//         <label htmlFor='search'>Search</label>
//         <input
//             id='search'
//             onChange={(e) => setChange(e.target.value)}
//         />
//         <button
//             disabled={isPending}
//             style={{opacity: isPending ? 0.2 : 1}}
//             className='bg-red-400'
//             onClick={handleClick}>
//             Search
//         </button>
//         <ul>
//             {tracks?.map((track) => {
//                 return (
//                     <Link key={track.uri} href={`/typing/play?track=${JSON.stringify({track})}&token=${accessToken}`}>
//                         <li>
//                             <h1>{track.title}</h1>
//                             <p>{track.artist}</p>
//                         </li>
//                     </Link>
//                 );
//             })}
//         </ul>
//         {error && <h1>{error}</h1>}
//     </div>
// );
