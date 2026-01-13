import { useQuery } from '@tanstack/react-query';
import { flashcardsApi } from '../api/flashcard';


export const useFlashCards = () => {
  return useQuery({
    queryKey: ['flashcards'],
    queryFn: async () =>{
        const {data} = await flashcardsApi.getAll();
        return data;
    },
  });
}

export const useFlashCardById = (id) => {
  return useQuery({
    queryKey: ['flashcard', id],
    queryFn: async () => {
      const { data } = await flashcardsApi.getById(id);
      return data;
    },
  });
}

export const useLevel = () =>{
    return useQuery({
        queryKey: ['level'],
        queryFn: async () => {
            const {data} = await flashcardsApi.getAll();
            const levels = data.reduce((acc, card) => {
                if(!acc.includes(card.level)){
                    acc.push(card.level);
                }
                return acc;
            }, []);
            return levels;
        },
    });
}

export const useFlashCardByLevel = (level) => {
  return useQuery({
    queryKey: ['flashcards', level],
    queryFn: async () => {
      const { data } = await flashcardsApi.getByLevel(level);
      return data;
    },
  });
};