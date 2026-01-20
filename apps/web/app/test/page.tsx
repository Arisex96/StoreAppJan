"use client";

import { useCounterStore } from "@lib/store/useCounterStore";
export default function Page() {
  const { count, increment, decrement } = useCounterStore();

  //make pretty card and button in tailwindcss
  return (<>    
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h1 className="text-4xl font-bold mb-4">Counter: {count}</h1>
            <div className="space-x-4">
                <button 
                    onClick={decrement}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                    Decrement   
                </button>
                <button
                    onClick={increment}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                >
                    Increment
                </button>
            </div>
        </div>
    </div>      
  </>)
}
