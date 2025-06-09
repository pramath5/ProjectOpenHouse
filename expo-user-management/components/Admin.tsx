import React, { useState } from "react";
import { Button, SafeAreaView, Text } from "react-native";
import { View } from "react-native";

export default function Admin({ navigation }: any) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Button
        title="Add Post"
        onPress={() => {
          navigation.navigate("AddPost");
        }}
      />
    </SafeAreaView>
  );
}
