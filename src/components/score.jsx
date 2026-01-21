import { useEffect, useState } from "react";
import { useCreateResult } from "../hooks/useResult";
import moment from "moment";

const Score = (props) =>{
    const { idFlashcard, quesCorrent, quesLength, questionsSkip , time} = props;
    const {mutate , isPending, isSuccess} = useCreateResult();
    const [name , setName] = useState('');
    const [percentage, setPercent] = useState(0);
    const currentDate = moment().format("DD/MM/YYYY");
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);

    useEffect(()=>{
        const totalSeconds = time;
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60; 
        setHours(hours);
        setMinutes(minutes);
        setSeconds(seconds);
    },[])

    const handleSave = ()=>{
        mutate({
            name : name,
            percentCorrent : percentage,
            quesCorrent : quesCorrent,
            quesIncorrent :  quesLength-quesCorrent-questionsSkip,
            quesSkip : questionsSkip,
            date : currentDate,
            idFC : idFlashcard,
        });
    }

    const CircularProgress = () => {
        const total = quesCorrent + (quesLength - quesCorrent);
        const percentage = total > 0 ? (quesCorrent / total) * 100 : 0;
        setPercent(Math.round(percentage));
        
        const size = 95;
        const strokeWidth = 14;
        const radius = (size - strokeWidth) / 2;
        const circumference = 2 * Math.PI * radius;
        
        // Calculate offsets
        const correctOffset = circumference - (quesCorrent / total) * circumference;
        const incorrectOffset = circumference - ((total) / total) * circumference;

        return (
            <div className="relative inline-flex items-center justify-center">
            <svg width={size} height={size} className="trquesCorrentform -rotate-90">
                {/* Background circle */}
                <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="oklch(90% 0.183 55.934)"
                strokeWidth={strokeWidth}
                fill="none"
                />
                
                {/* Incorrect */}
                <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke=""
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={incorrectOffset}
                strokeLinecap="round"
                fill="none"
                className="trquesCorrentition-all duration-1000 ease-out"
                />
                
                {/* Correct */}
                <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="oklch(72.3% 0.219 149.579)"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={correctOffset}
                strokeLinecap="round"
                fill="none"
                className="trquesCorrentition-all duration-1000 ease-out"
                />
            </svg>
            
            {/* Center text */}
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold ">
                {Math.round(percentage)}%
                </span>
            </div>
            </div>
        );
    };
    return(
        <div className="grid grid-cols-8 mb-6">
                        <div className="col-span-3">
                            <p className="text-gray-500 text-xl">Your time : {hours.toString().padStart(2, "0")} h {minutes.toString().padStart(2, "0")} m {seconds.toString().padStart(2, "0")} s</p>
                            <div className="flex direction-row items-center my-3 ml-2">
                                <div>   
                                    <CircularProgress/>
                                </div>
                                <div className="w-40 font-bold text-xl ml-4">
                                    <div className="text-green-500 flex justify-between mb-1">
                                        Correct
                                        <span className="ml-2 border px-5 border-green-500 rounded-full ">{quesCorrent}</span>
                                    </div>
                                    <div className="text-orange-400 flex justify-between mb-1">
                                        Incorrect
                                        <span className="ml-2 border px-5 border-orange-400 rounded-full ">{quesLength - quesCorrent - questionsSkip}</span>
                                    </div>
                                    {(questionsSkip > 0) && (
                                    <div className="text-gray-400 flex justify-between">
                                        Skip
                                        <span className="ml-2 border px-5 border-gray-400 rounded-full ">{questionsSkip}</span>
                                    </div>
                                    ) }
                                </div>
                            </div>
                            <p className="text-gray-500 text-xl">Your anwer</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-4 flex flex-col w-full mt-0 col-span-5">
                            <p className="text-center text-2xl font-bold">SAVE SCORE</p>
                            <div className="grow my-1">
                                <input type="text" placeholder="Your name" disabled={isSuccess}
                                value={name} onChange={(e) => {setName(e.target.value)}}
                                className="w-full bg-white border border-gray-400  
                                rounded-lg placeholder-gray-500 px-2 py-2
                                trquesCorrentition-all focus-visible:outline-none disabled:border-green-500 disabled:border-2"/>
                                {isSuccess && <p className="text-green-500 ">Save the successful score</p>}
                            </div>
                            <button 
                            onClick={handleSave}
                            disabled={isPending || isSuccess}
                            className=" px-4 py-2 bg-linear-to-r from-[#8C6A4E] to-[#6F4E37] text-white font-bold rounded-lg 
                            hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 trquesCorrentition-all">SAVE</button>                
                        </div>
                        
                    </div>
    )
}
export default Score;