import { useState } from "react"

export default function LikeButton(){
let [isliked , setisliked]= useState(false)

function togele(){
    setisliked(!isliked)
}
let style = {
    color:"red"
}
    return(
        <>
        <p onClick={togele}>
            {
            isliked?<i class="fa-solid fa-heart" style={style}></i>:
            <i class="fa-regular fa-heart"></i>
            }
            </p>
        </>
    )
}