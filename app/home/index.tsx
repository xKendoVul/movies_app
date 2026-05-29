import { ActivityIndicator, View, Text, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import MainSlideshow from "@/presentation/components/movies/MainSlideshow";
import { useMovies } from "@/presentation/hooks/useMovies";
import MovieHorizontalList from "@/presentation/components/movies/MovieHorizontalList";

const MoviesApp = () => {
  const safeArea = useSafeAreaInsets();
  const { nowPlayingQuery, popularQuery, topRateQuery, upcomingQuery } =
    useMovies();

  if (nowPlayingQuery.isFetching) {
    return (
      <View className="justify-center item-center flex-1">
        <ActivityIndicator color="purple" size={50} />
      </View>
    );
  }

  return (
    <ScrollView>
      <View className="mt-2" style={{ paddingTop: safeArea.top }}>
        <Text className="text-3xl font-bold px-4 mb-2">Movies App</Text>

        {/* Insertando nuestro carrusel */}
        <MainSlideshow movies={nowPlayingQuery.data ?? []} />

        {/* Lista horizontal de populares*/}
        <MovieHorizontalList
          title="Populares"
          movies={popularQuery.data ?? []}
        />

        <MovieHorizontalList
          title="Mejor Valoradas"
          movies={topRateQuery.data ?? []}
        />

        <MovieHorizontalList
          title="Proximamente"
          movies={upcomingQuery.data ?? []}
        />
      </View>
    </ScrollView>
  );
};

export default MoviesApp;
