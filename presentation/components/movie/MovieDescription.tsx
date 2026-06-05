import { Formatter } from "@/config/helpers/formatters";
import { CompleteMovie } from "@/infrastructure/interfaces/movie.interface";
import { Text, View } from "react-native";

interface Props {
  movie: CompleteMovie;
}

const MovieDescription = ({ movie }: Props) => {
  return (
    <View className="mx-5">
      {/* Fila para calificacion y generos */}
      <View className="flex flex-row">
        <Text> - {movie.rating}</Text>
        <Text>{movie.genres.join(", ")}</Text>
      </View>

      {/* Sinopsis */}
      <Text className="font-bold mt-5">Historia</Text>
      <Text className="font-normal mt-2">{movie.description}</Text>

      {/* Presupuesto formateado con nuestro helper */}
      <Text className="font-bold mt-2 text-2xl">
        {Formatter.currency(movie.budget)}
      </Text>
    </View>
  );
};

export default MovieDescription;
