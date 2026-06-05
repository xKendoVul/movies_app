import { Cast } from "@/infrastructure/interfaces/movie/cast.interface";
import { FlatList, Text, View } from "react-native";
import { ActorCard } from "./ActorCard";

interface Props {
  cast: Cast[];
  title?: string;
}

const MovieCast = ({ cast, title = "Reparto" }: Props) => {
  return (
    <View className="mt-5">
      <Text className="text-3xl font-bold px-4 mb-2">{title}</Text>

      <FlatList
        horizontal
        data={cast}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => <ActorCard actor={item} />}
      />
    </View>
  );
};

export default MovieCast;
