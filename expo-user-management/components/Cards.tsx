import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

interface Post {
  id: string;
  username: string;
  title: string;
  desc: string;
  venue: string;
  date: string;
  club: string;
  image_url?: string;
}

const PostCard = ({ post }: { post: Post }) => {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.username}>u/{post.username}</Text>
        <Text style={styles.title}>u/{post.title}</Text>
        <Text style={styles.date}>
          {new Date(post.date).toLocaleDateString()}
        </Text>
        <Text style={styles.desc}>u/{post.desc}</Text>
        <Text style={styles.venue}>u/{post.venue}</Text>
        <Text style={styles.club}>u/{post.club}</Text>
      </View>

      <Text style={styles.title}>{post.title}</Text>

      {post.image_url ? (
        <Image source={{ uri: "post.image_url" }} style={styles.image} />
      ) : null}

      <Text numberOfLines={3} style={styles.content}>
        {post.desc}
      </Text>
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
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginVertical: 8,
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
