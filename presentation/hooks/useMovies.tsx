import { nowPlayingAction } from "@/core/actions/movies/now-playing.actions";
import { popularMoviesAction } from "@/core/actions/movies/popular.action";
import { topRateMoviesAction } from "@/core/actions/movies/top-rate.actions";
import { upcomingMoviesAction } from "@/core/actions/movies/upcoming.actions";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export const useMovies = () => {
  //Queries
  const nowPlayingQuery = useQuery({
    queryKey: ["movies", "now-playing"],
    queryFn: nowPlayingAction,
    staleTime: 1000 * 60 * 60 * 24,
  });

  const popularQuery = useQuery({
    queryKey: ["movies", "popular"],
    queryFn: popularMoviesAction,
    staleTime: 1000 * 60 * 60 * 24,
  });

  const topRateQuery = useInfiniteQuery({
    initialPageParam: 1, // Pagina inicial
    queryKey: ["movies", "top_rated"],
    // Extraemos el pageParam y se lo pasamos a nuestra accion
    queryFn: ({ pageParam }) => topRateMoviesAction({ page: pageParam }),
    staleTime: 1000 * 60 * 60 * 24,
    // Calculamos la siguiente Pagina
    getNextPageParam: (lastPage, pages) => pages.length,
  });

  const upcomingQuery = useQuery({
    queryKey: ["movies", "upcoming"],
    queryFn: upcomingMoviesAction,
    staleTime: 1000 * 60 * 60 * 24,
  });

  return {
    nowPlayingQuery,
    popularQuery,
    topRateQuery,
    upcomingQuery,
  };
};
