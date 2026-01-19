import { useQueryClient , useQuery, useMutation} from "@tanstack/react-query";
import { resultApi } from '../api/flashcard';


export const useResults = () => {
    return useQuery({
        queryKey: ['results'],
        queryFn: async () => {
            const { data } = await resultApi.getResult();
            return data;
        },
    })
}

export const useCreateResult = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:(newResult) => resultApi.submitResult(newResult),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['results'] });
        }
    })
};