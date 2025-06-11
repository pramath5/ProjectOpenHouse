import { Input } from "@rneui/themed";
import { useState } from "react";
import { Alert, TextInput } from "react-native";
import { Button } from "react-native";
import { supabase } from "../lib/supabase";
import Avatar from "./Avatar";
import { View, Text, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";


export default function Tab({ navigation }: any) {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState(new Date(1598051730000));
  const [club, setClub] = useState("");
  async function Submit() {
    const { data, error } = await supabase
      .from("posts")
      .insert([
        { title: title, desc: desc, venue: venue, club: club, date: date },
      ])
      .select();
    console.log(error);
    navigation.navigate("Admin");
    setTitle("");
    setDesc("");
    setVenue("");
    Alert.alert("Submitted successfully");
  }
  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };
  const showMode = (currentMode: any) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
    });
  };
  const showDatepicker = () => {
    showMode("date");
  };
  let date_string = date.toString();
  return (
    <View style={styles.container}>
      <Avatar
        size={200}
        url={avatarUrl}
        onUpload={(url: string) => {
          setAvatarUrl(url);
        }}
      />
      <Input placeholder="Title" onChangeText={(text) => setTitle(text)} />
      <Input placeholder="Club" onChangeText={(text) => setClub(text)} />
      <Input placeholder="Desc" onChangeText={(text) => setDesc(text)} />
      <Input placeholder="Venue" onChangeText={(text) => setVenue(text)} />
      <Input placeholder="Date" value={date_string} />
      <Button onPress={showDatepicker} title="Show date picker!" />
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
