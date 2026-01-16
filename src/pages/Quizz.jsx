import { useLocation } from "react-router-dom";
import { useFlashCardById } from "../hooks/useFlashcards";
import { useEffect, useMemo, useState } from "react";

export default function Quizz() {
    const data = useLocation();
    const { idFlashcard, numQuestions, timeLimit, ynAns, mChoice } = data.state;
    const {data: flashcards, isLoading: loadingFlashcards } = useFlashCardById(idFlashcard); 
     
    
    const [questionModes, setQuestionModes] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [isScoring, setScoring] = useState(false);
    
    // Lưu câu trả lời của user: { questionIndex: userAnswer }
    const [results, setResults] = useState({});

    const opAns = useMemo(() => {
            const modes = [];
            if (ynAns) modes.push(1);
            if (mChoice) modes.push(2);
            return modes;
        }, [ynAns, mChoice]);  

    useEffect(() => {
        if (flashcards?.cardPairs) {
            const listCardPair = flashcards.cardPairs.slice(0, numQuestions);
            const op = opAns.length;
            const modes = listCardPair.map(()=>
                opAns[Math.floor(Math.random() * op)]
            )
            setQuestionModes(modes)

            const generatedQuestions = listCardPair.map((pair, index)=>{
                const mode = modes[index];

                if(mode == 1){ // true/false
                    const isCorrect = Math.random() < 0.5;
                    const otherCards = listCardPair.filter(c => c.id != pair.id);
                    const wrongCard = otherCards[Math.floor(Math.random() * otherCards.length)];
                    return {
                        ...pair,
                        displayedBack: isCorrect ? pair.backCard : wrongCard.backCard,
                        correctAnswer: isCorrect  
                    }
                }
                else{ // multiple choice 
                    const otherCards = listCardPair.filter(c => c.id != pair.id);
                    const wrongAns = []

                    while(wrongAns.length < 3 && wrongAns.length < otherCards.length){
                        const randomAns = otherCards[Math.floor(Math.random() * otherCards.length)];
                        if (!wrongAns.includes(randomAns.backCard))   wrongAns.push(randomAns.backCard)
                    }

                    const allAns = [...wrongAns,pair.backCard];
                    const shuffledAns = allAns.sort(() => Math.random() - 0.5)
                    
                    return {
                        ...pair,
                        options: shuffledAns,
                        correctAnswer: pair.backCard
                    };
                }
            });
            setQuestions(generatedQuestions);
        }
    }, [loadingFlashcards]);

   const handleAnswer = ((questionIndex, answer)=>{
        if(isScoring) return ;

        setResults(prev => ({
            ...prev,
            [questionIndex]:answer  // ghi đè giá trị mới nhất
        }))
   })  

    const handleSubmit = () => {
        setScoring(true);

        let correntCount = 0;
        questions.forEach((question,index)=>{
            const userAnswer = results[index];
            const correctAnswer = question.correctAnswer;

            if(userAnswer == correctAnswer) correctAnswer++;
        })

        console.log(`Correct: ${correctCount}/${questions.length}`);
    }

    const isAnswered = (questionIndex) =>{
        return results.hasOwnProperty(questionIndex);  // tương tự include
    }

   const getButtonClass = (questionIndex, answer, isCorrectAnswer) => {
        const userAnswer = results[questionIndex];  //lấy giá trị đã ghi ở trên handleAnswer
        const isSelected = userAnswer === answer;   

        const baseClass = "px-4 py-4 my-1 rounded-lg w-full transition-all duration-300";

        // Chưa submit
        if (!isScoring) {
            if (isSelected) {
                return `${baseClass} bg-gradient-to-r from-[#D8AE8E] to-[#C79C7C] text-white border-2 border-[#C79C7C]`;
            }
            return `${baseClass} bg-white border-2 border-gray-200 hover:border-[#A8B5A0] hover:bg-[#F9F6F0]`;
        }

        // Đã submit - hiện đáp án đúng/sai
        if (isCorrectAnswer) {
            return `${baseClass} bg-gradient-to-r from-[#A8B5A0] to-[#96A38E] text-white border-2 border-[#96A38E]`; 
        }
        
        if (isSelected && !isCorrectAnswer) {
            return `${baseClass} bg-gradient-to-r from-[#D8AE8E] to-[#C79C7C] text-white border-2 border-[#C79C7C]`;
        }
        
        return `${baseClass} bg-white border-2 border-gray-200 opacity-60`;
   }

    if (loadingFlashcards) {
        return <div className="p-8 text-center">Loading...</div>;
    }

    return ( 
            <div className="container mx-auto p-8 grid grid-cols-12 gap-4">
                <div className="col-span-9 bg-white rounded-lg shadow-md p-4">
                    <h2 className="text-2xl font-bold mb-4">Quiz: {flashcards.cardTitle}</h2>
                    {questions?.map((question,index)=>{
                        return (
                            <div key={question.id} className="mb-5 p-4 rounded-lg bg-radial-[at_25%_25%] from-[#FFF9F3] to-[#F5EDE1] to-100%">
                                <div className="flex justify-between mb-4">
                                    <div className="font-bold text-2xl">{question.frontCard}</div>
                                    <div className="text-sm font-medium text-gray-500 bg-white px-3 py-1 rounded-full">{index+1} of {questions.length}</div>
                                </div>
                                
                                {/* TRUE/FALSE */}
                                {questionModes[index] === 1 && (
                                    <div>
                                        <p className="mb-2">Means: {question.displayedBack}</p>
                                        <div className="grid grid-cols-2 gap-4 mb-2">
                                            <button 
                                                onClick={() => handleAnswer(index, true)}
                                                disabled={isScoring}
                                                className={getButtonClass(index, true, question.correctAnswer === true)}
                                            >
                                                True
                                            </button>
                                            <button 
                                                onClick={() => handleAnswer(index, false)}
                                                disabled={isScoring}
                                                className={getButtonClass(index, false, question.correctAnswer === false)}
                                            >
                                                False
                                            </button>
                                        </div>
                                        {isScoring ? (
                                            <p className="text-sm text-gray-700 mt-2 font-semibold">
                                                 Correct answer: {question.backCard}
                                            </p>
                                        ) : (
                                            <p className="text-sm text-gray-500 text-right">Choose 1 answer</p>
                                        )}
                                    </div>
                                )}
                                
                                {/* MULTIPLE CHOICE */}
                                {questionModes[index] === 2 && (
                                    <div>
                                       {question.options?.map((option, i) => (
                                            <button 
                                                key={i}
                                                onClick={() => handleAnswer(index, option)}
                                                disabled={isScoring}
                                                className={`text-left ${getButtonClass(index, option, option === question.correctAnswer)}`}
                                            >
                                                {String.fromCharCode(65 + i)}. {option}
                                            </button>
                                        ))}
                                        {isScoring ? (
                                            <p className="text-sm text-gray-700 mt-2 font-semibold">
                                                 Correct answer: {question.correctAnswer}
                                            </p>
                                        ) : (
                                            <p className="text-sm text-gray-500 text-right">Choose 1 answer</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                    {/* SUBMIT BUTTON */}
                    {!isScoring && (
                        <button 
                            onClick={handleSubmit}
                            disabled={Object.keys(results).length !== questions.length}
                            className="w-full py-4 bg-linear-to-r from-[#8C6A4E] to-[#6F4E37] text-white font-bold rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            Submit ({Object.keys(results).length}/{questions.length} answered)
                        </button>
                    )}
                </div>
                
                <div className="col-span-3 bg-white rounded-lg shadow-md p-4">
                    <h3 className="font-bold mb-4">Progress</h3>
                    {!isScoring && (
                        <div className="grid grid-cols-4 gap-1 text-center">
                            {questions.map((_,index)=>(
                                <div key={index}  className={`${isAnswered(index) ? 'bg-[#A8B5A0] text-white'  : 'bg-gray-200 text-gray-500'}
                                    border rounded`}>{index+1}</div>
                            ))}
                        </div>
                    )}
                    {isScoring && (
                        <div className="grid grid-2 gap-1 text-xl ">
                            {questions.map((_,index)=>(
                                <div>
                                    {index + 1} {results[index] === questions[index].correctAnswer ? 
                                                    <span className="text-green-500">✓</span> :
                                                    <span className="text-red-500">✗</span> }
                                </div>
                            ))}
                        </div>
                    )}
                           
                </div>
            </div>
    )
}