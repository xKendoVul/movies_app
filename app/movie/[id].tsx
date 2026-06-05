import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { getMovieByIdAction } from "@/core/actions/movies/get-movie-by-id.action";
import { useMovie } from "@/presentation/hooks/useMovie";
import MovieHeader from "@/presentation/components/movie/MovieHeader";
import MovieDescription from "@/presentation/components/movie/MovieDescription";
import MovieCast, {
  ActorCard,
} from "@/presentation/components/movie/MovieCast";

const MovieScreen = () => {
  // Extraemos el id que el router.push envio en el url
  const { id } = useLocalSearchParams();

  // 1. Usamos nuestro hook convirtiendo el id en numero usando el simbolo +
  const { movieQuery, castQuery } = useMovie(+id);

  // Llamada temporal para verificar que la peticion funciono
  getMovieByIdAction(+id); // El + convierte el string en number

  // 2. Pantalla de carga mientras se resuelve la peticion inicial
  if (movieQuery.isLoading || !movieQuery.data) {
    return (
      <View className="flex flex-1 justify-center items-center">
        <Text className="mb-4">Espere por favor</Text>
        <ActivityIndicator color={"purple"} size={30} />
      </View>
    );
  }

  // 3. Renderizamos la informacion dentro de un ScrollView
  return (
    <ScrollView>
      <MovieHeader
        originalTitle={movieQuery.data.originalTitle}
        poster={movieQuery.data.poster}
        title={movieQuery.data.title}
      />
      {/* Descripcion */}
      <MovieDescription movie={movieQuery.data} />
      {castQuery.data && <MovieCast cast={castQuery.data} />}
    </ScrollView>
  );
};

export default MovieScreen;
