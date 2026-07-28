"use client"
import { useState } from "react"
export const Counter = () => {
    const [count, setCount] = useState(0);
    return (
        <div>
            <button className="bg-purple-500 p-3 border-solid rounded-xl text-white" onClick={() => {
                setCount(count+1)
            }}>Count: {count}</button>
        </div>
    )
}