"use client";

import {useState} from "react";

export default function Quiz(){

const [score,setScore]=useState(0);

function correct(){

setScore(score+1);

}

return(

<main className="min-h-screen bg-slate-950 text-white p-8">

<h1 className="text-4xl font-bold text-cyan-400">
🧠 AI Quiz
</h1>

<div className="bg-slate-900 p-8 rounded-xl mt-8">

<h2>
Python is...
</h2>

<div className="space-y-3 mt-5">

<button onClick={correct}
className="w-full bg-green-500 py-3 rounded-xl">
Programming Language
</button>

<button
className="w-full bg-slate-700 py-3 rounded-xl">
Database
</button>

<button
className="w-full bg-slate-700 py-3 rounded-xl">
Browser
</button>

</div>

<h2 className="mt-8">
Score : {score}
</h2>

</div>

</main>

);

}