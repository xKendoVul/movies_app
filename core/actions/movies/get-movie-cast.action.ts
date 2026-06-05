import { movieApi } from "@/core/api/movie-api";
import { CreditResponse } from "@/infrastructure/interfaces/credit.response";
import { CastMapper } from "@/infrastructure/mappers/cast.mapper";
import { Cast } from "@/infrastructure/interfaces/movie/cast.interface";

export const getMovieCastAction = async (
  id: number | string,
): Promise<Cast[]> => {
  try {
    const { data } = await movieApi.get<CreditResponse>(`${id}/credits`);
    console.log("Casting cargado");
    return data.cast.map((actor) => CastMapper.fromMovieDBCastToEntity(actor));
  } catch (error) {
    console.log(error);
    throw "No se pudo cargar el casting";
  }
};
