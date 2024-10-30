import { Track } from "@/types";
import { spotifyApi } from "./SpotifyAPI";

export default async function getRandomTrack(){
    await spotifyApi.getMyTopTracks().then((res)=>{
        res.body.items.map((track)=>{
            return <{success:Track}> {
                success:{
                    title:track.name,
                    artist:track.artists[0].name,
                    uri:track.uri,
                    lyrics:''
                }
            }
        })
    }).catch((err)=>{
        console.log('GET_RANDOM_TRACK_ERROR: ',err)
        return {error:'Error with getting random track, please try again'}
    })
}