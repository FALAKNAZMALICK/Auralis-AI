"use client";

export default function Flashcards() {

const cards = [

{
question:"What is AI?",
answer:"Artificial Intelligence"
},

{
question:"What is ML?",
answer:"Machine Learning"
},

{
question:"Python is?",
answer:"Programming Language"
}

];

return(

<main className="min-h-screen bg-slate-950 text-white p-8">

<h1 className="text-4xl text-cyan-400 font-bold">
📚 Flashcards
</h1>

<div className="grid md:grid-cols-2 gap-6 mt-8">

{cards.map((c,i)=>(

<div key={i}
className="bg-slate-900 p-6 rounded-xl">

<h2 className="font-bold">{c.question}</h2>

<p className="mt-4 text-cyan-300">{c.answer}</p>

</div>

))}

</div>

</main>

);

}