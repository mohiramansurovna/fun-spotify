import { NextRequest, NextResponse } from "next/server";
import SpotifyWebApi from 'spotify-web-api-node';

export async function POST(req:NextRequest){
    const code = req.body.code;
    const spotifyAPI = new SpotifyWebApi({
        redirectUri: process.env.REDIRECT_URI,
        clientId: '9244b5dc8ff043b49e7345e330f6de7c',
        clientSecret: '1a5638fad76b4dd58b9e5b677d4c61e1',
    });
    spotifyAPI
        .authorizationCodeGrant(code)
        .then((data) => {
            return NextResponse.json({
                accessToken: data.body.access_token,
                refreshToken: data.body.refresh_token,
                expiresIn: data.body.expires_in,
            });
        })
        .catch((err) => {
            console.log(err)
            return null
        });
};
