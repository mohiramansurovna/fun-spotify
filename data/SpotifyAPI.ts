import SpotifyWebApi from 'spotify-web-api-node';
export const spotifyApi = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
});
