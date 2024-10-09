'use client'
import React, { useEffect } from 'react'
import Link from 'next/link'
import useAuth from '@/hooks/useAuth';
import SpotifyWebApi from 'spotify-web-api-node'
export const spotifyApi = new SpotifyWebApi({
    clientId: '9244b5dc8ff043b49e7345e330f6de7c',
})

export default function Main({code}:{code:string}) {
  return (
    <div>
      <Link href={`/quest?code=${code}`}>Quest</Link>
    </div>
  )
}
