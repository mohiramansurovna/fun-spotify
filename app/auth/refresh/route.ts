/**
 * This route will be called only in useAuth, it gets the refreshToken and,
 * returns success:{accessToken, expiresIn} or
 * returns error:'Refresh token failed'
 */

import {NextRequest, NextResponse} from 'next/server';
import SpotifyWebApi from 'spotify-web-api-node';

export async function POST(req: NextRequest) {
    //gets the refreshToken
    const {refreshToken} = await req.json();

    //creats instance of spotifyWebAPI
    const spotifyAPI = new SpotifyWebApi({
        redirectUri: process.env.REDIRECT_URI,
        clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken,
    });

    //gets accessToken from spotifyApi using code
    try {
        const data = await spotifyAPI.refreshAccessToken();
        return NextResponse.json(
            {
                success: {
                    accessToken: data.body.access_token,
                    expiresIn: data.body.expires_in,
                },
            },
            {status: 200}
        );
    } catch {
        return NextResponse.json({error: 'Refresh token failed'}, {status: 400});
    }
}
