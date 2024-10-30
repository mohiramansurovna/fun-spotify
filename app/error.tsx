'use client';

import { useRouter } from "next/navigation";

export default function error() {
  const router=useRouter();
  const onClick=()=>{
    router.replace('/')
  }
    return (
        <div className='dual-border-button text-2xl font-medium p-4 flex flex-col gap-4 justify-center items-center absolute w-1/3 h-1/3 m-[33%]'>
            <h1 className="">We have an error</h1>
            <button onClick={onClick} className="light-button p-1 ">Try again</button>
        </div>
    );
}
