export default function Leaderboard(){

const users=[

{name:"Alex",xp:1450},

{name:"Sara",xp:1320},

{name:"Ali",xp:1100},

{name:"You",xp:980}

];

return(

<main className="min-h-screen bg-slate-950 text-white p-10">

<h1 className="text-5xl text-cyan-400 font-bold mb-8">

🏆 Leaderboard

</h1>

<table className="w-full bg-slate-900 rounded-xl overflow-hidden">

<thead>

<tr className="bg-cyan-500 text-black">

<th className="p-4">Rank</th>

<th>Name</th>

<th>XP</th>

</tr>

</thead>

<tbody>

{users.map((u,i)=>(

<tr key={i} className="text-center border-t border-slate-800">

<td className="p-4">{i+1}</td>

<td>{u.name}</td>

<td>{u.xp}</td>

</tr>

))}

</tbody>

</table>

</main>

);

}