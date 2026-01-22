import { useResults } from "../hooks/useResult";
import Loading from "../components/loading";

export default function Rank() {
    const {data: results , isLoading: loadingResult} = useResults();
    const rankResults = results? [...results].sort((a,b) => b.percentCorrent - a.percentCorrent).slice(0,10) : [];

    if (loadingResult) {
        return <div className="grid grid-cols-3 p-10 gap-4">
            {Array.from({length : 9}).map((_,i)=>(
                <div key={i}><Loading /></div>
            ))}   
        </div>;
    }

    const getMedalStyle = (index) => {
        if (index === 0) return "bg-gradient-to-br from-yellow-400 to-orange-500";
        if (index === 1) return "bg-gradient-to-br from-gray-300 to-gray-500";
        if (index === 2) return "bg-gradient-to-br from-orange-400 to-amber-600";
        return "bg-gray-300";
    };

    const getCardStyle = (index) => {
        if (index === 0) return "bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300";
        if (index === 1) return "bg-gradient-to-r from-gray-50 to-slate-50 border-2 border-gray-300";
        if (index === 2) return "bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-300";
        return "bg-white border border-gray-200";
    };

    const getScoreColor = (index) => {
        if (index === 0) return "text-yellow-600";
        if (index === 1) return "text-gray-600";
        if (index === 2) return "text-orange-600";
        return "text-gray-700";
    };
    return (
        <div className="container mx-auto p-8 grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-8 grid-cols-1 bg-white rounded-2xl shadow-xl p-6 h-min">
                <div className="flex items-center gap-3 mb-6">
                    <svg className="w-8 h-8 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    <h2 className="text-3xl font-bold text-gray-800">Top Rankings</h2>
                </div>
                {rankResults.slice(0,3).map((result,index)=>(
                <div key={index}
                    className={`${getCardStyle(index)} mb-3 rounded-xl p-6 relative overflow-hidden transition-all duration-300 hover:translate-x-1 hover:shadow-lg`}>
                        {/* Background decoration */}
                        <div className={`absolute top-0 right-0 w-32 h-32 ${index === 0 ? 'bg-yellow-200' : index === 1 ? 'bg-gray-200' : 'bg-orange-200'} rounded-full opacity-20 -mr-16 -mt-16`}></div>
                        
                        <div className="relative lg:flex items-center lg:justify-between">
                            <div className="flex items-center gap-4">
                                {/* Medal */}
                                <div className={`${getMedalStyle(index)} ${index === 0 ? 'w-16 h-16' : 'w-14 h-14'} rounded-full flex items-center justify-center shadow-lg`}>
                                    <span className={`${index === 0 ? 'text-2xl' : 'text-xl'} font-bold text-white`}>
                                        {index + 1}
                                    </span>
                                </div>
                                
                                {/* User info */}
                                <div>
                                    <h3 className={`${index === 0 ? 'text-2xl' : 'text-xl'} font-bold text-gray-800`}>
                                        {result.name}
                                    </h3>
                                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                                        <span className="flex items-center gap-1">
                                            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                                            </svg>
                                            {result.quesCorrent}/{result.quesCorrent + result.quesIncorrent + result.quesSkip} correct
                                        </span>
                                        <span className="text-gray-400">•</span>
                                        <span>{result.date}</span>
                                    </div>
                                </div>
                            </div>
                            {/* Score */}
                            <div className="text-right">
                                <div className={`${index === 0 ? 'lg:text-4xl' : 'lg:text-3xl'} font-bold ${getScoreColor(index)}`}>
                                    {result.percentCorrent * 10}
                                </div>
                                <div className="text-sm text-gray-500 font-semibold">points</div>
                            </div>
                        </div>
                </div>                               
                ))}
            </div>
            <div className="lg:col-span-4 grid-cols-1 bg-white rounded-2xl shadow-xl p-6 sticky">
                <div className="flex items-center gap-3 mb-6">
                    <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                    </svg>
                    <h3 className="text-xl font-bold text-gray-800">Recent Scores</h3>
                </div>
                <div className="space-y-3 max-h-150 overflow-y-auto pr-2">
                {rankResults.slice(3,17).map((result,i)=>(
                    <div key={i} className="bg-linear-to-r from-gray-50 to-white rounded-lg p-4 border border-gray-200 hover:border-gray-300 transition-all">
                        <div className="flex justify-between items-start mb-2">
                            <span className="font-semibold text-gray-800">{result.name}</span>
                            <span className="text-lg font-bold text-gray-700">
                                {result.percentCorrent * 10}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                            </svg>
                            <span>
                                {result.quesCorrent}/{result.quesCorrent + result.quesIncorrent + result.quesSkip} correct
                            </span>
                        </div>
                        <div className="text-xs text-gray-500">{result.date}</div>
                    </div>
                ))}
                </div>
                
            </div>        
        </div>
    )
}