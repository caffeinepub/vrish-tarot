import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CreateBookingRequestArgs, Testimonial } from "../backend.d";
import { useActor } from "./useActor";

export function useTestimonials() {
  const { actor, isFetching } = useActor();
  return useQuery<Testimonial[]>({
    queryKey: ["testimonials"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTestimonials();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateBooking() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (args: CreateBookingRequestArgs) => {
      if (!actor) throw new Error("Not connected");
      return actor.createBookingRequest(args);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
}
