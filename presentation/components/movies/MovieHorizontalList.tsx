import { Movie } from "@/infrastructure/interfaces/movie.interface";
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  View,
} from "react-native";
import MoviePoster from "./MoviePoster";
import { useEffect, useRef } from "react";

interface Props {
  title?: string;
  movies: Movie[];
  className?: string;
  // Nueva propiedad que pasa el padre para cargar los datos
  loadNextPage?: () => void;
}

const MovieHorizontalList = ({
  movies,
  title,
  className,
  loadNextPage,
}: Props) => {
  //1. Candado para evitar el disparo de multiples eventos
  const isLoading = useRef(false);

  useEffect(() => {
    setTimeout(() => {
      isLoading.current = false;
    }, 200); // margen de seguridad
  }, [movies]);

  //2. la funcion que evalua la posicion del scroll
  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    // Si ya estamos cargando abortamos la ejecucion
    if (isLoading.current) return;

    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;

    //3. Formula matematica con 600px de margen de gracia
    const isEndReached =
      contentOffset.x + layoutMeasurement.width + 600 >= contentSize.width;

    // Si no hemos llegado al final no hacemos nada
    if (!isEndReached) return;

    //4. Cerramos candado indicando que empezamos a cargar
    console.log("Cargar siguiente pelicula");

    loadNextPage && loadNextPage();
  };

  return (
    <View className="mt-5">
      {/* Solo se muestra el titulo si el componente padre lo envia */}
      {title && <Text className="text-3xl font-bold px-4 mb-2">{title}</Text>}

      <FlatList
        horizontal
        data={movies}
        showsHorizontalScrollIndicator={false} // Para el diseno limpio
        // evitar que crashee por ids repetidos
        keyExtractor={(item, i) => `${item.id}-${i}`}
        renderItem={({ item }) => (
          <MoviePoster id={item.id} poster={item.poster} smallPoster />
        )}
        // Conectamos nuestro evento a la flatlist
        onScroll={onScroll}
      />
    </View>
  );
};

export default MovieHorizontalList;
