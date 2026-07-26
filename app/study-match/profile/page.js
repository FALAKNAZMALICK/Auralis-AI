"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import StudyNavbar from "../../../components/StudyNavbar";

export default function CreateProfile() {

  const router = useRouter();

  const [profile, setProfile] = useState({
    name: "",
    university: "",
    skill: "",
    wants: "",
    level: "Beginner",
  });

  useEffect(() => {
    const savedProfile = localStorage.getItem("studyProfile");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

function saveProfile() {

  if (
    !profile.name.trim() ||
    !profile.university.trim() ||
    !profile.skill.trim() ||
    !profile.wants.trim()
  ) {
    alert("⚠ Please fill all fields.");
    return;
  }

  if (profile.skill.toLowerCase() === profile.wants.toLowerCase()) {
    alert("⚠ Teaching skill and learning skill cannot be the same.");
    return;
  }

  if (!profile.level) {
  alert("Select your level.");
  return;
}

  localStorage.setItem(
    "studyProfile",
    JSON.stringify(profile)
  );

  alert("✅ Profile Saved Successfully!");

  router.push("/study-match");
}

  return (
<main className="min-h-screen bg-slate-950 text-white">

  <StudyNavbar />

  <div className="flex justify-center items-center py-16 px-6">

    <div className="bg-slate-900 p-8 rounded-2xl w-full max-w-xl border border-slate-800 shadow-2xl">

      <h1 className="text-3xl font-bold text-cyan-400 mb-8 text-center">
        👤 Create / Edit Study Profile
      </h1>

      <div className="space-y-5">

        <input
          required
          placeholder="Your Name"
          value={profile.name}
          className="w-full p-3 rounded-xl bg-slate-800 outline-none focus:border focus:border-cyan-400"
          onChange={(e) =>
            setProfile({ ...profile, name: e.target.value })
          }
        />

        <input
          required
          placeholder="University"
          value={profile.university}
          className="w-full p-3 rounded-xl bg-slate-800 outline-none focus:border focus:border-cyan-400"
          onChange={(e) =>
            setProfile({ ...profile, university: e.target.value })
          }
        />

        <input
          required
          placeholder="Skill You Can Teach (e.g. Python , Machine Learning)"
          value={profile.skill}
          className="w-full p-3 rounded-xl bg-slate-800 outline-none focus:border focus:border-cyan-400"
          onChange={(e) =>
            setProfile({ ...profile, skill: e.target.value })
          }
        />

        <input
          required
          placeholder="What Do You Want To Learn? (e.g. Python , Machine Learning)"
          value={profile.wants}
          className="w-full p-3 rounded-xl bg-slate-800 outline-none focus:border focus:border-cyan-400"
          onChange={(e) =>
            setProfile({ ...profile, wants: e.target.value })
          }
        />

        <select
          required
          value={profile.level}
          className="w-full p-3 rounded-xl bg-slate-800 outline-none focus:border focus:border-cyan-400 text-white"
          onChange={(e) =>
            setProfile({ ...profile, level: e.target.value })
          }
        >
          <option value="">Select Level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Expert">Expert</option>
        </select>

        <button
          onClick={saveProfile}
          className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold transition"
        >
          Save Profile
        </button>

      </div>

    </div>

  </div>

</main>
  );
}