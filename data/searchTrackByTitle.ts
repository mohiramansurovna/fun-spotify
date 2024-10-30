import {spotifyApi} from '@/data/SpotifyAPI';
import {Track} from '@/types';

export default async function searchTrackByTitle(title: string) {
    const res = await spotifyApi.searchTracks(title, {limit: 10});
    try {
        let result: Track[] = [];
        res.body.tracks?.items.map((track) => {
            result.push({
                title: track.name,
                artist: track.artists[0].name,
                uri: track.uri,
                lyrics: '',
            });
        });
        return {success: result};
    } catch(err) {
        return {error: 'There is an error with search, please try again'};
    }
}
