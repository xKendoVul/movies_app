import { movieApi } from "@/core/api/movie-api";
import { CompleteMovie } from "@/infrastructure/interfaces/movie.interface";
import { MovieDBMovieResponse } from "@/infrastructure/interfaces/moviedb-movie.response";
import { MovieMapper } from "@/infrastructure/mappers/movie.mapper";

export const getMovieByIdAction = async (
  id: number | string,
): Promise<CompleteMovie> => {
  try {
    // Apuntamos directo a la raiz de axios que ya tiene la url base configurada
    const { data } = await movieApi.get<MovieDBMovieResponse>(`/${id}`);
    // console.log(data); // imprimir para probar

    console.log("pelicula - HTTP cargada");

    return MovieMapper.fromTheMovieDBToCompleteMovie(data);
  } catch (error) {
    console.log(error);
    throw "No se pudo cargar la pelicula";
  }
};
