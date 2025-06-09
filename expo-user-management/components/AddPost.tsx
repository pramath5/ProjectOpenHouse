import { Input } from "@rneui/themed";
import { useState } from "react";
import { Alert, TextInput } from "react-native";
import { Button } from "react-native";
import { supabase } from "../lib/supabase";
import { View, Text, StyleSheet } from "react-native";

export default function Tab() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState("");
  const [club, setClub] = useState("");
  async function Submit() {
    const { data, error } = await supabase
      .from("posts")
      .insert([{ title: title, desc: desc, venue: venue, club: club }])
      .select();
    console.log(error);
    Alert.alert("Submitted successfully");
  }
  return (
    <View style={styles.container}>
      <Input placeholder="Tile" onChangeText={(text) => setTitle(text)} />
      <Input placeholder="Club" onChangeText={(text) => setClub(text)} />
      <Input placeholder="Desc" onChangeText={(text) => setDesc(text)} />
      <Input placeholder="Venue" onChangeText={(text) => setVenue(text)} />
      <Input placeholder="date" onChangeText={(text) => setDate(text)} />
      <Button title="Submit" onPress={() => Submit()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
