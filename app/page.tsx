'use client'
import Login from "@/components/Login";
import Main from "@/components/Main";
import { useSearchParams } from "next/navigation";
export default function Home() {
  const code=useSearchParams().get('code');
  return code?<Main code={code}/>:<Login/>;
}
