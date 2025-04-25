import { atom } from "recoil";

export const pageAtom = atom({
    key:'pageAtom',
    default:0
})

export const upvoteAtom = atom({
    key:'upvoteAtom',
    default:false
});