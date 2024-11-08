//use Context

import { createContext, useContext, useState } from "react"

/*what happen it is like a table where all the skills were putten down who avenger need they can just take it and use and put it down 
there are some steps like first we have to create a context
const a=createContext();
step2
the data we want to pass from one comp to another we have to wrap the componet using 
<a.Provider></a.Provider> like this so that 
and after that in step 3
const {bulb}=useContext(a); and thats all */
const bulbContext = createContext();
export const App = () => {
    const [bulbOn, setBulb] = useState(false);
    return (
       <bulbContext.Provider value={{bulbOn,setBulb}}> 
            <Light />
       </bulbContext.Provider>
    )
}
const Light = () => {
    return (
        <>
        
                <LightBulb />
                <LightSwitch />
        </>
    )
}

const LightBulb = () => {
    const { bulbOn } = useContext(bulbContext);
    return (
        <>
            {bulbOn ? "Bulb On" : "Bulb Off"}
        </>
    )
}
const LightSwitch = () => {
    const { bulbOn, setBulb } = useContext(bulbContext);
    function Toggle() {
        setBulb(!bulbOn);
    }
    return (
        <>
            <button onClick={Toggle}>Toggle</button>
        </>
    )
}
export default App;