import { useLocation } from "react-router-dom";
import { useFlashCardById } from "../hooks/useFlashcards";

export default function Quizz() {
    const data = useLocation();
    const { idFlashcard, numQuestions, timeLimit, ynAns, mChoice } = data.state;
    const opAns = [ynAns ? '1' : '3', mChoice ? '2' : '3'].filter(r => r !== '3');
    const {data: flashcards, isLoading: loadingFlashcards } = useFlashCardById(idFlashcard);
    if (loadingFlashcards ) {
        return <div className="p-8 text-center">Loading...</div>;
    }
const randomIndex = 0
    
    console.log("idFlashcard:gvhgv",  opAns);



    return ( 
            <div className="container mx-auto p-8 grid grid-cols-12 gap-4">
                <div className="col-span-9 bg-white rounded-lg shadow-md p-4">
                    <h2 className="text-2xl font-bold mb-4">Quiz: {flashcards.cardTitle}</h2>
                    {flashcards.cardPairs.map((pair, index) => (
                        <div key={pair.id} className="mb-4">
                            <p className="font-semibold">{pair.frontCard}</p>
                            {opAns?.length > 0 && (
                                <>
                                    {Math.floor(Math.random() *  ) === 1
                                    ? <h4>tttt</h4>
                                    : <h5>rrrrr</h5>}
                                </>
                                )}
                            <p>{pair.backCard}</p>
                        </div>
                    ))}
                </div>
                <div className="col-span-3 bg-white rounded-lg shadow-md p-4">

                </div>
            </div>
    )
}