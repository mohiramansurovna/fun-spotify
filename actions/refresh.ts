import SpotifyWebApi from "spotify-web-api-node";

export const refresh=async(refreshToken:string)=>{
    const spotifyAPI = new SpotifyWebApi({
        redirectUri: process.env.REDIRECT_URI,
        clientId: '9244b5dc8ff043b49e7345e330f6de7c',
        clientSecret: '1a5638fad76b4dd58b9e5b677d4c61e1',
        refreshToken,
    });
    const data=await spotifyAPI.refreshAccessToken()
    try{
        return {success:{
            accessToken: data.body.access_token,
            expiresIn: data.body.expires_in,
        }};
    }catch(err){
        console.log(err);
        return {error:'Refresh Token Error'};
    }
    
}