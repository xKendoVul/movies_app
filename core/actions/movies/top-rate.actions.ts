import { movieApi } from "@/core/api/movie-api";
import { MovieDBMoviesResponse } from "@/infrastructure/interfaces/moviedb-response";
import { MovieMapper } from "@/infrastructure/mappers/movie.mapper";

// 1. Interfaz para opciones de paginacion
interface Options {
  page?: number;
  limit?: number; // opciona, por si la api lo soporta en el futuro
}

//2. Recibimos la pagina con valor por defecto de 1
export const topRateMoviesAction = async ({
  page = 1,
  limit = 10,
}: Options) => {
  try {
    const { data } = await movieApi.get<MovieDBMoviesResponse>("/top_rated", {
      params: { page: page },
    });

    const movies = data.results.map(MovieMapper.fromTheMovieDBToMovie);
    return movies;
  } catch (error) {
    console.log(error);
    throw "Cannot top rated movies";
  }
};
