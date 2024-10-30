import React from 'react';

export default function Result({result}: {result: {accuracy: number; speed: number}}) {
    return (
        <div className='absolute-center text-5xl'>
            {`${Math.round(result.accuracy * 100)} %`}
            <br />
            {`${result.speed} WpM`}
        </div>
    );
}
