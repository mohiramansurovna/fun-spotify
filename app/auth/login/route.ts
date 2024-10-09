import {NextRequest, NextResponse} from 'next/server';
import SpotifyWebApi from 'spotify-web-api-node';

const spotifyAPI = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: '9244b5dc8ff043b49e7345e330f6de7c',
    clientSecret: '1a5638fad76b4dd58b9e5b677d4c61e1',
});

export async function POST(req: NextRequest) {
    const {code} = await req.json();

    if (!code) {
        return NextResponse.json({error: 'Authorized code is not provided'}, {status: 400});
    }
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
        console.error('Error during authorizationCodeGrant:', error);
        return NextResponse.json({error: 'Authorization failed'}, {status: 400});
    }
}
