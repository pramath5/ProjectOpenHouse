import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useNavigation } from "expo-router";
import { RootStackParamList } from "../types/types";
import { Button } from "react-native";
import { supabase } from "../lib/supabase";

type InfoScreenProps = NativeStackScreenProps<RootStackParamList, "Info">;

function Info({ route }: InfoScreenProps) {
  const { post } = route.params;
  const [reg_email, setReg_email] = useState("");
  const navigation = useNavigation();
  async function HandleRegister() {
    let { data: user, error } = await supabase.auth.getUser();
    console.log(user.user.email);
    setReg_email(user.user.email);
    let { data: registered } = await supabase
      .from("posts")
      .insert({ registered: reg_email });
    console.log(registered);
  }
  return (
    <View style={styles.container}>
      {post.avatar_url ? (
        <Image source={{ uri: post.avatar_url }} style={styles.image} />
      ) : null}
      <Text style={styles.title}>{post.title}</Text>

      <Text style={styles.desc}>{post.desc}</Text>

      <Text style={styles.venue}>Venue: {post.venue}</Text>
      <Text style={styles.club}>Club: {post.club}</Text>
      <Text style={styles.date}>
        {new Date(post.date).toLocaleDateString()}
      </Text>
      <Button title="Count me in" onPress={HandleRegister}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f4f6fc",
    flexGrow: 1,
  },
  username: {
    fontSize: 14,
    color: "#6c757d",
    marginBottom: 4,
  },
  title: {
    fontSize: 56,
    fontWeight: "bold",
    color: "#023047",
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
    color: "#8d99ae",
    marginBottom: 16,
  },
  venue: {
    fontSize: 16,
    color: "#219ebc",
    marginBottom: 4,
    marginTop: 20,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },

  club: {
    fontSize: 16,
    color: "#219ebc",
    marginBottom: 12,
    marginTop: 20,
  },
  desc: {
    fontSize: 16,
    color: "#333",
    lineHeight: 22,
  },
});

export { Info };
