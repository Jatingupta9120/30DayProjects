import { useState } from "react"

export const App=()=>{
    const [Count,setct]=useState(0);
    return(
        <>
        <div>{Count}</div>
        <App2 names={"jatin"}/>
        </>
    )
}

export const App2=({names})=>{
    return (
        <>
       Hi there my name is ${names}
        </>
    )
}

export {App as default}