import { use, useEffect, useMemo, useRef, useState } from "react";
import { useFlashCards, useLevel } from "../hooks/useFlashcards";
import { Search , Users, Award, Clock, ChevronRight , Play,X,Target,Timer,Shuffle, Check, Link} from "lucide-react";
import { useResults } from "../hooks/useResult";
import Quizz from "./Quizz";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const [level, setLevel] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const {data: flashcards, isLoading: loadingFlashcards } = useFlashCards();
    const {data: levels, isLoading: loadingLevels } = useLevel();
    const {data: results, isLoading: loadingResults } = useResults();

    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [numQuestions, setNumQuestions] = useState(10);
    const [timeLimit, setTimeLimit] = useState(20);
    const [ynAns, setynAns] = useState(false);
    const [mChoice, setmChoice] = useState(false);

    const dataFilter = useMemo(() => {
        if (!flashcards) return [];
        if(searchTerm) {
            const lowerSearchTerm = searchTerm.toLowerCase();
            setLevel("");
            return flashcards.filter(fc => fc.cardTitle.toLowerCase().includes(lowerSearchTerm))
        };
        return (level === "All")  ?  flashcards :  flashcards.filter(card => card.level === level);
    }, [flashcards, level,searchTerm]);

        
    if (loadingFlashcards || loadingLevels || loadingResults) {
        return <div className="p-8 text-center">Loading...</div>;
    }
    
    const allLevels = ["All", ...levels];

    const handleStartQuiz = (quiz) => {
        setSelectedQuiz(quiz);
        setShowModal(true);
        setNumQuestions(Math.min(10, quiz.cardPairs.length)); // Default to 10 or max available
        setTimeLimit(Math.round(quiz.cardPairs.length * 1.5));
    };

    const handleBeginQuiz = () => {
        console.log("Starting Quiz with settings:");
        console.log(selectedQuiz.id);
        navigate('/quizz', {state: {
                            idFlashcard: selectedQuiz.id,
                            numQuestions,
                            timeLimit,
                            ynAns,
                            mChoice
                        }} );
        setShowModal(false);
    };
    

  return (
    <div className="container mx-auto p-8 ">
        {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search for quizzes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-(--primary) border border-(--primary-light)  
              rounded-xl pl-12 pr-4 py-4  placeholder-gray-500 
              transition-all focus-visible:outline-none "
            />
          </div> 
        {/* Levels */}
        <div className="grid grid-cols-6 md:grid-cols-3 lg:grid-cols-12 gap-4 mb-3">
            {allLevels?.map((lvl) => (
                    <button key={lvl} className={`${level === lvl ? "bg-(--secondary) text-white font-bold" : "bg-(--primary)"} p-1 rounded-xl shadow border-2 border-(--primary-light) cursor-pointer
                        hover:bg-(--secondary) hover:font-bold hover:-translate-y-1 hover:text-white transition-all `}
                    onClick={() => {setLevel(lvl); setSearchTerm("")}}>
                    <h2 className="text-xl text-center ">{lvl}</h2>
                </button>
            ))}
        </div>
        {/* Flashcards */}
        <div className="grid grid-cols-1 gap-4">
            {dataFilter?.map((flashcard) => (
                <div key={flashcard.id} className="bg-linear-to-r from-(--primary) to-(--secondary) shadow border-2 border-(--primary-light)
                        hover:from-(--secondary) hover:-translate-y-1 transition-all
                        cursor-pointer rounded-xl">
                    <div className="bg-white mt-14 p-5">
                        <p className="text-xl font-bold text-(--accent-dark)">{flashcard.cardTitle}</p>
                        <p className="text-base text-gray-800 my-1">{flashcard.cardDescription}</p>
                        <div className="flex items-center gap-4 mb-4 text-sm">
                            <div className="flex items-center gap-1.5 text-gray-800">
                                <Clock size={16} />
                                <span>{Math.round(flashcard.cardPairs.length * 1.5) || 0}m</span>
                            </div>
                            <div className="flex items-center  text-gray-800">
                                <Award size={16} />
                                <span>{flashcard.cardPairs.length || 0} Qs</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-gray-800">
                                <Users size={16} />
                                <span>{results?.filter(r => r.flashcardId === flashcard.id)?.length || 0}</span>
                            </div>
                        </div>
                        <button 
                            className="w-full  text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 
                                           bg-(--secondary) hover:bg-(--secondary-dark) transition-all"
                            onClick={() => handleStartQuiz(flashcard)}>
                            <Play size={18} />
                            Start Quiz
                            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
        {/* Setup Modal */}
         {showModal && selectedQuiz && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 ">
                <div className="bg-(--secondary) border border-gray-700 rounded-2xl max-w-2xl w-full shadow-2xl animate-in max-h-165">
                    {/* Modal Header */}
                    <div className="p-6 rounded-t-2xl overflow-hidden">
                        <div className="z-10 flex items-start justify-between">
                            <div>
                            <h2 className="text-3xl font-bold text-white mb-2">Setup Your Quiz</h2>
                            <p className="text-white/80 text-lg">{selectedQuiz.cardTitle}</p>
                            </div>
                            <button 
                            onClick={() => setShowModal(false)}
                            className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-lg transition-all"
                            >
                            <X size={24} />
                            </button>
                        </div>
                    </div>
                    {/* Modal Body */}
                    <div className="p-6 bg-white  max-h-115 overflow-y-auto">
                        {/* Number of Questions */}
                        <div className="mb-8"> 
                            <div className="flex items-center gap-2 mb-3">
                                <Target className="text-blue-400" size={20} />
                                <label className="font-semibold">Number of Questions</label>
                            </div>
                            <div className="flex items-center gap-4">
                                <input
                                    type="range"
                                    min="5"
                                    max={selectedQuiz.cardPairs.length}
                                    value={numQuestions}
                                    onChange={(e) => setNumQuestions(parseInt(e.target.value))}
                                    className="flex-1 h-2 bg-(--secondary) rounded-lg appearance-none cursor-pointer accent-(--accent-dark)"
                                />
                                <div className="bg-(--secondary) rounded-lg px-4 py-2 min-w-20 text-center">
                                    <span className="text-white font-bold text-xl">{numQuestions}</span>
                                    <span className="text-white text-sm ml-1">/ {selectedQuiz.cardPairs.length}</span>
                                </div>
                            </div>
                            <p className="text-gray-400 text-sm ">
                                Choose how many questions you want to answer
                            </p>
                        </div>
                        {/* Time Limit */} 
                        <div className="mb-8">
                            <div className="flex items-center gap-2 mb-3">
                                <Timer className="text-green-400" size={20} />
                                <label className=" font-semibold">Time Limit (minutes)</label>
                            </div>
                            <div className="flex items-center gap-4">
                                <input
                                    type="range"
                                    min="5"
                                    max="120"
                                    step="5"
                                    value={timeLimit}
                                    onChange={(e) => setTimeLimit(parseInt(e.target.value))}
                                    className="flex-1 h-2 bg-(--secondary) rounded-lg appearance-none cursor-pointer accent-(--accent-dark)"
                                />
                                <div className="bg-(--secondary) rounded-lg px-4 py-2 min-w-20 text-center">
                                    <span className="text-white font-bold text-xl">{timeLimit}</span>
                                    <span className="text-white text-sm ml-1">min</span>
                                </div>
                            </div>
                            <p className="text-gray-400 text-sm">
                            Set your time limit for the quiz
                            </p>
                        </div>
                        {/* Answers Toggle */}
                        <div className="mb-3">
                            <label className="flex items-center justify-between gap-2 cursor-pointer">
                                <span className="font-semibold">True/False</span>
                                <button
                                    type="checkbox"
                                    checked={ynAns}
                                    onClick={() => setynAns(!ynAns)}
                                    className={`relative w-14 h-7 rounded-full transition-all duration-300 ${ynAns ? 'bg-blue-600' : 'bg-gray-700'}`}
                                >
                                <div className={`absolute top-1 ${ynAns ? 'right-1' : 'left-1'} w-5 h-5 bg-white rounded-full shadow-lg transition-transform duration-300`} />
                                </button>
                            </label>
                        </div><div className="mb-6">
                            <label className="flex items-center justify-between gap-2 cursor-pointer">
                                <span className="font-semibold">Multiple Choice</span>
                                <button
                                    type="checkbox"
                                    checked={mChoice}
                                    onClick={() => setmChoice(!mChoice)}
                                    className={`relative w-14 h-7 rounded-full transition-all duration-300 ${mChoice ? 'bg-blue-600' : 'bg-gray-700'}`}
                                >
                                <div className={`absolute top-1 ${mChoice ? 'right-1' : 'left-1'} w-5 h-5 bg-white rounded-full shadow-lg transition-transform duration-300`} />
                                </button>
                            </label>
                        </div>
                        {/* Summary Box */}
                        <div className="bg-emerald-100 text-emerald-400 border border-emerald-700 rounded-xl p-4 mb-6">
                            <h3 className=" font-semibold mb-3 flex items-center gap-2">
                            <Award className="text-yellow-400" size={18} />
                            Quiz Summary
                            </h3>
                            <div className="grid grid-cols-2 gap-4 text-center">
                            <div>
                                <p className="text-emerald-600 text-xs mb-1">Questions</p>
                                <p className="text-emerald-800 font-bold text-lg">{numQuestions}</p>
                            </div>
                            <div>
                                <p className="text-emerald-600 text-xs mb-1">Time Limit</p>
                                <p className="text-emerald-800 font-bold text-lg">{timeLimit}m</p>
                            </div>
                            </div>
                        </div>
                        
                    </div>
                    {/* Action Buttons */}
                    <div className="flex gap-3 p-3 bg-white rounded-b-2xl">
                        <button
                        onClick={() => setShowModal(false)}
                        className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-xl font-semibold transition-all border border-gray-600"
                        >
                        Cancel
                        </button>
                        <button
                        onClick={handleBeginQuiz}
                        className="flex-1 bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 flex items-center justify-center gap-2"
                        > 
                        
                        <Play size={20} />
                        Begin Quiz
                        </button>
                    </div>
                </div>
            </div>
         )}
    </div>
  );
}