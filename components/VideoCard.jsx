import { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import { View, Text, TouchableOpacity, Image, Modal, Alert } from "react-native";
import { icons } from "../constants";
import { addVideoToSaved } from "../lib/appwrite";

const VideoCard = ({ title, creator, avatar, thumbnail, video, userId, videoId }) => {
  const [play, setPlay] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const handleSave = async () => {
    setMenuVisible(false);
    try {
      message = await addVideoToSaved(userId, videoId);
      if(message === "Success"){
        Alert.alert("Success", "Video saved successfully");
      } else{
        Alert.alert("Error", "Video already Saved");
      }
      
      
    } catch (error) {
      Alert.alert("Error", error.message);
    }
    
  };

  return (
    <View className="flex flex-col items-center px-4 mb-14">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="flex justify-center flex-1 ml-3 gap-y-1">
            <Text className="font-psemibold text-sm text-white" numberOfLines={1}>
              {title}
            </Text>
            <Text className="text-xs text-gray-100 font-pregular" numberOfLines={1}>
              {creator}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <View className="pt-2">
            <Image
              source={icons.menu}
              className="w-5 h-5"
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
      </View>

      {/* Video or thumbnail display logic */}
      {play ? (
        <Video
          source={{ uri: video }}
          className="w-full h-60 rounded-xl mt-3"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={status => status.didJustFinish && setPlay(false)}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}

      {/* Menu Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={menuVisible}
        onRequestClose={() => setMenuVisible(!menuVisible)}
      >
        <View className="flex-1 justify-end items-center bg-transparent">
          <View className="bg-primary w-full py-4">
            <TouchableOpacity onPress={handleSave} className="py-2 px-4">
              <Text className="font-psemibold text-center text-lg text-white">Save</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => setMenuVisible(false)} className="py-2 px-4 mt-2">
              <Text className="font-psemibold text-center text-lg text-white">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default VideoCard;
