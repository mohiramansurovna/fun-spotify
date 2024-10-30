/**
 * This route will be called only in useAuth, it gets the code and,
 * returns success:{accessToken, refreshToken, expiresIn} or
 * returns error:'Authorization failed'
 */

import {NextRequest, NextResponse} from 'next/server';
import SpotifyWebApi from 'spotify-web-api-node';

export async function POST(req: NextRequest) {
    //code from useAuth
    const {code} = await req.json();
    if (!code) {
        return NextResponse.json({error: 'Authorized code is not provided'}, {status: 400});
    }

    //creats instance of spotifyWebAPI
    const spotifyAPI = new SpotifyWebApi({
        redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI,
        clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
    });

    //gets accessToken from spotifyApi using code
    try {
        const data = await spotifyAPI.authorizationCodeGrant(code);
        return NextResponse.json(
            {
                success: {
                    accessToken: data.body.access_token,
                    refreshToken: data.body.refresh_token,
                    expiresIn: data.body.expires_in,
                },
            },
            {status: 200}
        );
    } catch (error) {
        console.log('ERROR During authoration grand code: ', error)
        return NextResponse.json({error: 'Authorization failed'}, {status: 400});
    }
}
