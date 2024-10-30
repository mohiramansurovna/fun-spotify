import * as Genius from 'genius-lyrics';
import {NextRequest, NextResponse} from 'next/server';
const Client = new Genius.Client(
    'J6n3Lmq83asNlUCcxQSvwmJ3dOoaG6bhU4_DGPS5zdgtb6cLSKNT4OpWUjc2RllL'
);
export async function POST(req: NextRequest) {
    let {title, artist} = await req.json();
    const searches = await Client.songs
        .search(title)
        .then((responce: Genius.Song[]) => {
            return responce;
        })
        .catch((err) => {
            return [null];
        });
    let id = 0;
    async function lyricsFinder() {
        let check = true;
        while (check) {
            if (id < 10) {
                //TODO:fix ts error
                const song: Genius.Song | null = searches[id];
                if (!song || !song.artist) return;
                try {
                    if (song.artist.name === artist) {
                        check = false;
                        return await song.lyrics();
                    } else {
                        id++;
                    }
                } catch (err) {
                    return false;
                }
            } else {
                return false;
            }
        }
    }
    const lyrics = await lyricsFinder();
    if (lyrics) {
        return NextResponse.json({lyrics}, {status: 200});
    } else {
        return NextResponse.json({error: 'lyrics not found'}, {status: 404});
    }
}
