import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { supabase } from "../lib/supabase";
import PostCard from "./Cards";

interface Post {
  id: string;
  username: string;
  title: string;
  desc: string;
  venue: string;
  date: string;
  club: string;
  avatar_url?: string;
}

const HomeScreen = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching posts:", error.message);
    } else {
      console.log(data);
      setPosts((data as Post[]) || []);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PostCard post={item} />}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: "#ffffff",
  },
});
