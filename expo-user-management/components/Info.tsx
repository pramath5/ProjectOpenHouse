import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";
import { supabase } from "../lib/supabase";

const screenWidth = Dimensions.get("window").width;

type InfoScreenProps = NativeStackScreenProps<RootStackParamList, "Info">;

function Info({ route }: InfoScreenProps) {
  const { post } = route.params;
  const [imageHeight, setImageHeight] = useState(300);

  useEffect(() => {
    if (post.avatar_url) {
      Image.getSize(post.avatar_url, (width, height) => {
        const scale = screenWidth / width;
        setImageHeight(height * scale);
      });
    }
  }, []);

  async function HandleRegister() {
    const { data: user, error } = await supabase.auth.getUser();
    if (error || !user.user?.email) {
      Alert.alert("Error", "Unable to fetch user");
      return;
    }

    const { error: regError } = await supabase
      .from("posts")
      .insert({ registered: user.user.email });

    if (regError) {
      Alert.alert("Error", "Failed to register");
    } else {
      Alert.alert("Success", "You have been registered!");
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {post.avatar_url && (
        <Image
          source={{ uri: post.avatar_url }}
          style={{
            width: screenWidth,
            height: imageHeight,
            resizeMode: "cover",
          }}
        />
      )}
      <View style={styles.content}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.desc}>{post.desc}</Text>
        <Text style={styles.metaText}>📍 Venue: {post.venue}</Text>
        <Text style={styles.metaText}>
          📅 Date: {new Date(post.date).toLocaleDateString()}
        </Text>
        <Text style={styles.metaText}>🏢 Club: {post.club}</Text>
        <TouchableOpacity style={styles.joinButton} onPress={HandleRegister}>
          <Text style={styles.joinButtonText}>Join Event </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f9fa",
    paddingBottom: 30,
  },
  content: {
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 46,
    fontWeight: "bold",
    color: "#212529",
    marginBottom: 20,
  },
  desc: {
    fontSize: 18,
    lineHeight: 22,
    color: "#343a40",
    marginBottom: 20,
  },
  metaText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#495057",
    marginBottom: 20,
  },
  joinButton: {
    backgroundColor: "#3498db",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  joinButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#dee2e6",
    marginTop: 20,
  },
  action: {
    fontSize: 18,
    color: "#495057",
  },
});

export { Info };
