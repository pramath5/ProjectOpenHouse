import React, { useState } from "react";
import {
  Button,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { View } from "react-native";
import HomeScreen from "./Home";
import { Ionicons } from "@expo/vector-icons";

export default function Admin({ navigation }: any) {
  return (
    <SafeAreaView style={{ flex: 1, paddingBottom: 40 }}>
      <HomeScreen />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("AddPost");
        }}
      >
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#007AFF",
    borderRadius: 35,
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});
