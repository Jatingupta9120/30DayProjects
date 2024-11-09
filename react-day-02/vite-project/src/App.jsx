import { createContext, useContext, useState } from "react";

const CountContext = createContext(); // Create a Context

export const App = () => {
    return (
        <>
            <Parent />
        </>
    );
}

export const CountContextProvider = ({ children }) => {
    const [count, setCount] = useState(0); // State for count
    return (
        <CountContext.Provider value={{ count, setCount }}>
            {children}
        </CountContext.Provider>
    );
}

export const Value = () => {
    const { count } = useContext(CountContext); // Access count from context
    return (
        <div>
            Current Count: {count} {/* Return count within a div */}
        </div>
    );
}

export const Increase = () => {
    const { setCount } = useContext(CountContext); // Access setCount from context
    return (
        <button onClick={() => setCount(c => c + 1)}>Increase</button>
    );
}

export const Decrease = () => {
    const { setCount } = useContext(CountContext); // Access setCount from context
    return (
        <button onClick={() => setCount(c => c - 1)}>Decrease</button>
    );
}

export const Parent = () => {
    return (
        <CountContextProvider>
            <Increase />
            <Decrease />
            <Value />
        </CountContextProvider>
    );
}

export default App;