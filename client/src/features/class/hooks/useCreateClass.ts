import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClass } from "../api/class.api";
import { toast } from "sonner";

export const useCreateClass = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createClass,

    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    },

    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    },
  });
};