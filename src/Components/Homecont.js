import React from 'react'
import history from "../history"
export default function Homecont() {
    return (
        <div className="flex justify-center flex-wrap content-center h-screen">
            <div className="w-1/2 h-96 bg-blue-300 flex justify-center flex-wrap content-center rounded-2xl">
               <h2 className="font-black text-5xl">Welcome to Let's Talk</h2>
               <p className="mt-10">You can Log in or Sign up to Chat with friends and spend quality time</p>
            </div>
        </div>
    )
}
