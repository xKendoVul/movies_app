import { router } from "expo-router";
import { Image, Pressable } from "react-native";

interface Props {
  id: number;
  poster: string;
  smallPoster?: boolean; // Opciona, por defecto false
  className?: string; // Para inyectar clases extra si se necesitan
}

const MoviePoster = ({ id, poster, smallPoster = false, className }: Props) => {
  return (
    // active:opacity-90 da un sutil efecto visual al tocar el poster
    <Pressable
      className={`acive:opacity-90 px-2 ${className}`}
      onPress={() => router.push(`/movie/${id}`)}
    >
      <Image
        // Usamos source={{ uri: ... }} porque la imagen viene de internet
        source={{ uri: poster }}
        className="shadow-lg rounded-2xl w-full h-full"
        style={{
          // Dimensiones dinamicas basadas en la propiedad smallPoster
          width: smallPoster ? 85 : 150,
          height: smallPoster ? 130 : 250,
        }}
        resizeMode="cover"
      />
    </Pressable>
  );
};

export default MoviePoster;
