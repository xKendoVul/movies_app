import { useRef } from "react";
import { View, useWindowDimensions } from "react-native";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";

import { Movie } from "@/infrastructure/interfaces/movie.interface";
import MoviePoster from "./MoviePoster";

interface Props {
  movies: Movie[];
}

const MainSlideshow = ({ movies }: Props) => {
  // Referencia para controlar el carrusel, necesario en typescript
  const ref = useRef<ICarouselInstance>(null);

  // Obtenemos el ancho de la pantalla dinamicamente
  const width = useWindowDimensions().width;

  return (
    <View className="h-[250px] w-full">
      <Carousel
        ref={ref}
        data={movies}
        // mostrar temporalmente el titulo de la pelicula
        renderItem={({ item }) => (
          <MoviePoster id={item.id} poster={item.poster} smallPoster={false} />
        )}
        // Ancho y alto de las tarjetas individuales
        width={200}
        height={350}
        // Estilo del contenedor general
        style={{
          width: width,
          height: 350,
          justifyContent: "center",
          alignItems: "center",
        }}
        // Efecto visual 3D
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9, // Que tan pequenas son las tarjetas laterales
          parallaxScrollingOffset: 50, // Que tan justas estan
        }}
        defaultIndex={1}
      />
    </View>
  );
};

export default MainSlideshow;
