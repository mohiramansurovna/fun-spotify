import SpotifyWebApi from "spotify-web-api-node";
const spotifyAPI = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: '9244b5dc8ff043b49e7345e330f6de7c',
    clientSecret: '1a5638fad76b4dd58b9e5b677d4c61e1',
});

export const login=async (code:string) => {
    try {
        const data = await spotifyAPI.authorizationCodeGrant(code);
        return {
            success: {
                accessToken: data.body.access_token,
                refreshToken: data.body.refresh_token,
                expiresIn: data.body.expires_in,
            },
        };
    } catch (error) {
        console.error('Error during authorizationCodeGrant:', error);
        return { error: 'Authorization failed' };
    }
}




// await spotifyAPI.authorizationCodeGrant(code).then((data) => {
//         return {success:{
//             accessToken: data.body.access_token,
//             refreshToken: data.body.refresh_token,
//             expiresIn: data.body.expires_in,
//         }};
//     })
//     .catch((err) => {
//         console.log(err)
//         return {error:err}
//     });
// return {error:''}