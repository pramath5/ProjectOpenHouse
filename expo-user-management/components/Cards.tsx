import React from "react";
import { useState } from "react";
import { useNavigation } from "expo-router";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Info } from "./Info";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList, Post } from "../types/types";
type InfoScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Info"
>;
const PostCard = ({ post }: { post: Post }) => {
  const navigation = useNavigation<InfoScreenNavigationProp>();
  const [id, setId] = useState("");
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("Info", { post })}
    >
      {post.avatar_url ? (
        <Image source={{ uri: post.avatar_url }} style={styles.image} />
      ) : null}
      <Text style={styles.content}>{post.venue}</Text>
      <Text style={styles.content}>{post.date}</Text>
      <Text style={styles.content}>{post.club}</Text>
    </TouchableOpacity>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ff0000",
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    elevation: 4,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  username: {
    color: "#ccc",
    fontSize: 14,
  },
  date: {
    color: "#888",
    fontSize: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  content: {
    color: "#ddd",
    fontSize: 14,
  },
  venue: {
    color: "#ccc",
    fontSize: 14,
  },
  club: {
    color: "#ccc",
    fontSize: 14,
  },
  desc: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
});
