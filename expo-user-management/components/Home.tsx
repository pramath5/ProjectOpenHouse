import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { supabase } from "../lib/supabase";
import { useNavigation } from "@react-navigation/native";
import ClubFilter from "./Filter";
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
  const [Filter_posts, setFilter_Posts] = useState<Post[]>([]);
  const navigation = useNavigation<any>();
  const [selectedClub, setSelectedClub] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error("Error fetching posts:", error.message);
    } else {
      setPosts((data as Post[]) || []);
    }
  };
  const GetFilteredPosts = async () => {
    let query = supabase.from("posts").select("*");
    if (selectedClub) query = query.eq("club", selectedClub);
    query = query.order("id", { ascending: false });
    const { data, error } = await query;
    if (data) setPosts(data);
    if (error) console.error(error);
  };

  useEffect(() => {
    GetFilteredPosts();
  }, [selectedClub]);

  const renderItem = ({ item }: { item: Post }) => (
    <View>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("Info", { post: item })}
      >
        <View style={styles.titleRow}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.date}>
            {new Date(item.date).toLocaleDateString()}
          </Text>
        </View>

        {item.avatar_url && (
          <Image source={{ uri: item.avatar_url }} style={styles.image} />
        )}

        <View style={styles.footer}>
          <Text style={styles.venue}>📍 {item.venue}</Text>
          <Text style={styles.club}>🏷️ {item.club}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <ClubFilter onSelectClub={setSelectedClub} />
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    padding: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    marginHorizontal: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  username: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#333",
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 17,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2c2c2c",
    flexShrink: 1,
  },
  date: {
    fontSize: 12,
    color: "#888",
    fontStyle: "italic",
    fontWeight: "900",
    marginLeft: 8,
  },

  image: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginBottom: 10,
    backgroundColor: "#eee",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 10,
  },
  venue: {
    fontSize: 14,
    color: "#555",
  },
  club: {
    fontSize: 14,
    color: "#777",
    fontStyle: "italic",
  },
});
