import React, { useState } from "react";
import { Button, SafeAreaView, Text } from "react-native";
import { View } from "react-native";
import PostCard from "./Cards";
import HomeScreen from "./Home";

export default function Admin({ navigation }: any) {
  return (
    <SafeAreaView style={{ flex: 1, paddingBottom:40 }}>
      <HomeScreen />
      <Button
        title="Add Post"
        onPress={() => {
          navigation.navigate("AddPost");
        }}
      />
    </SafeAreaView>
  );
}
