import React, {useState, useEffect} from 'react';
import {Track} from '@/types';
import Result from './Result';
export default function TextRender({track}: {track: Track}) {
    const [text, setText] = useState<string>('lyric is waiting');
    const [input, setInput] = useState<string>('');
    const [begin, setBegin] = useState<number>();
    const [result, setResult] = useState<{accuracy: number; speed: number}>();
    useEffect(() => {
        if (track?.lyrics) {
            setText(track?.lyrics);
        }
    }, [track]);

    //it will check if incorrect char is red
    function textRender() {
        return text.split('').map((char, index) => {
            const color = input[index] ? (input[index] === char ? 'green' : 'red') : 'gray';
            // setIsLoading('ready');
            return (
                <span
                    key={index}
                    style={{color: color}}>
                    {char}
                </span>
            );
        });
    }

    //it will summarize data for result
    function check() {
        let error = 0;
        let word = 1;
        for (let i = 0; i < text.length; i++) {
            if (input[i] !== text[i]) {
                error++;
            }
            if (text[i] === ' ') {
                word++;
            }
        }
        let accurate = (text.length - error) / text.length;
        let finale = Date.now();
        let time = (finale - (begin ? begin : finale)) / 1000 / 60;
        let speed = Math.floor(word / time);
        setResult({accuracy: accurate, speed: speed});
    }

    //it will call the check function when it is ended
    useEffect(() => {
        if (!begin && input!='') setBegin(Date.now());
        if (input.length === text.length) {
            check();
        }
    }, [input]);

    return (
        <>
            {result ? (
                <Result result={result} />
            ) : (
                <div className='py-32 w-full h-full  border border-green-400600 '>
                    <p
                        style={{whiteSpace: 'pre-wrap'}}
                        className='px-10 text-4xl inline-block h-full w-full absolute  border border-red-600'>
                        {textRender()}
                    </p>
                    {!begin && (
                        <div className='w-32 h-10 bg-red-700 text-white font-semibold font-sans'>
                            Waiting to start
                        </div>
                    )}
                    <textarea
                        autoComplete='off'
                        autoCorrect='off'
                        autoCapitalize='off'
                        inputMode='none'
                        autoFocus={true}
                        spellCheck={false}
                        className='px-10 text-4xl h-full w-full absolute  bg-transparent text-[#aaaaaa01] focus:outline-none '
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            e.key === 'Backspace' ? e.preventDefault() : null;
                        }}
                        value={input}
                    />
                </div>
            )}
        </>
    );
}
