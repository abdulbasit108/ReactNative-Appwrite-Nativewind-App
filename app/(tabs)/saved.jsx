import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import useAppwrite from "../../lib/useAppwrite";
import { getAllSavedPosts } from "../../lib/appwrite";
import { EmptyState, VideoCard } from "../../components";

const Saved = () => {
  const { data: posts } = useAppwrite(() => getAllSavedPosts());

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            videoId={item.$id}
            userId={item.creator.$id}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        ListHeaderComponent={() => (
          <>
            <View className="flex my-6 px-4">
              <Text className="text-2xl font-psemibold text-white mt-1">
                Saved Videos
              </Text>
            </View>
          </>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No Saved Videos for this user"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Saved;
