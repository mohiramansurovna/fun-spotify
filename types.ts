export type Track = {
    artist: string;
    title: string;
    uri:string,
    lyrics:string
};
export type Question={
    correct:string;
    answer1:string;
    answer2:string;
    answer3:string;
}

export type ResType={
    success?:Track,
    error?:string
}
export type ResTypeArr={
    success?:Track[],
    error?:string
}