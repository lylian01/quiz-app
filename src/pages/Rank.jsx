import { useResults } from "../hooks/useResult";
import Loading from "../components/loading";

export default function Rank() {
    const {data: results , isLoading: loadingResult} = useResults();
    const rankResults = results? [...results].sort((a,b) => b.percentCorrent - a.percentCorrent).slice(0,10) : [];
    const newResults = results? 
                                [...results].sort((a, b) => {
                                        const [dayA, monthA, yearA] = a.date.split('/');
                                        const [dayB, monthB, yearB] = b.date.split('/');
                                        return new Date(yearB, monthB - 1, dayB) - new Date(yearA, monthA - 1, dayA);
                                }).slice(0,20) 
                                : [];

    if (loadingResult) {
        return <div className="grid grid-cols-3 p-10 gap-4">
            {Array.from({length : 9}).map((_,i)=>(
                <div key={i}><Loading /></div>
            ))}   
        </div>;
    }

    return (
        <div className="container mx-auto p-8 grid grid-cols-12 gap-4">
            <div className="col-span-8">
                {rankResults.map((result,index)=>(
                    index < 3 ?
                        <div key={index}>
                       {index+1}. {result.name}
                        <p> Score: {result.percentCorrent*10} -  Correct: {result.quesCorrent}/{result.quesCorrent+result.quesIncorrent+result.quesSkip}</p>
                        </div> 
                    : null
                                        
                ))}
            </div>
            <div className="col-span-4 bg-white rounded-lg p-4">
                <p className="text-xl font-bold"> Scoreboard</p>
                {newResults.map((score,i)=>(
                    <div key={i}>
                       {score.name} - Score: {score.percentCorrent*10} -  Correct: {score.quesCorrent}/{score.quesCorrent+score.quesIncorrent+score.quesSkip} - Date: {score.date}
                    </div>
                ))}
            </div>
        </div>
    )
}