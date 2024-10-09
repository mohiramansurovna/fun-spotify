import useAuth from "@/app/auth/useAuth";

export default function Quest({code}:{code: string}) {
    const accessToken = useAuth(code);
}