import { ScrollText, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

export default function Nav(){

    return <nav className="bg-white shadow-sm py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className='flex items-center gap-3'>
            <Link to={"/"}>
             <Trophy className="text-yellow-500" size={48} />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-[#6F4E37]">Quizz</h1>
              <h5 className="text-xl decoration-gray-700 opacity-75">Challenge yourself and master new skills!</h5>
            </div>
          </div>
          <div className="flex items-center justify-center group relative">
            <Link to={"/rank"} className="relative">   
                    <ScrollText className="text-yellow-500" size={48} />
            </Link>
            <div className="text-white text-3xl font-bold px-2 group-hover:text-yellow-500 absolute left-12">
              {"Rank".split("").map((char,index)=>(
                  <span key={index} className="transition-all " style={{ transitionDelay: `${index * 120}ms` }}>{char}</span>
              ))}
            </div>
          </div>
        </div>
      </nav>
}