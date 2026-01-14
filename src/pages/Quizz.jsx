import { useLocation } from "react-router-dom";
import { useFlashCardById } from "../hooks/useFlashcards";
import { useEffect, useMemo, useState } from "react";

export default function Quizz() {
    const data = useLocation();
    const { idFlashcard, numQuestions, timeLimit, ynAns, mChoice } = data.state;
    const [questionModes, setQuestionModes] = useState([]);

    const {data: flashcards, isLoading: loadingFlashcards } = useFlashCardById(idFlashcard);  
   const opAns = useMemo(() => {
        const modes = [];
        if (ynAns) modes.push(1);
        if (mChoice) modes.push(2);
        return modes;
    }, [ynAns, mChoice]);  


    if (loadingFlashcards ) {
        return <div className="p-8 text-center">Loading...</div>;
    };
    
    const listCardPair = flashcards.cardPairs.slice(0,numQuestions);

    const test = useMemo (() => {
        const modes = listCardPair.map(() =>
            opAns[Math.floor(Math.random() * opAns.length)]
        );
        setQuestionModes(modes);
    },[flashcards]);
    
    

    return ( 
            <div className="container mx-auto p-8 grid grid-cols-12 gap-4">
                <div className="col-span-9 bg-white rounded-lg shadow-md p-4">
                    <h2 className="text-2xl font-bold mb-4">Quiz: {flashcards.cardTitle}</h2>
                   {listCardPair?.map((pair, index) => {
                    return (
                        <div key={pair.id}>
                            <span>{pair.frontCard}</span>
                            {questionModes[index] === 1 && (
                                <p>áaaaaaaaâ{pair.backCard}</p>
                            )}
                            {questionModes[index] === 2 && (
                                <div>
                                    <p>a {listCardPair[index].backCard}</p>
                                    <p>b {listCardPair[(index = listCardPair.length) ? (index+1) : (index-1)].backCard}</p>
                                    {/* <p>c {listCardPair[(index+2)].backCard}</p>
                                    <p>d {listCardPair[(index+3)].backCard}</p> */}
                                </div>
                                
                            )}
                        </div>
                    );
                    })}
                </div>
                <div className="col-span-3 bg-white rounded-lg shadow-md p-4">

                </div>
            </div>
    )
}