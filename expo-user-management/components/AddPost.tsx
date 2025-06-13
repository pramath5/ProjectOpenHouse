import { Input } from "@rneui/themed";
import { useState } from "react";
import { Alert, TextInput } from "react-native";
import { Button, KeyboardAvoidingView, ScrollView } from "react-native";
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
  <KeyboardAvoidingView
    style={{ flex: 1 }}

  >
    <ScrollView contentContainerStyle={styles.container}>
      <Avatar
        size={200}
        url={avatarUrl}
        onUpload={(url: string) => setAvatarUrl(url)}
      />

      <Input
        placeholder="Title"
        onChangeText={(text) => setTitle(text)}
        containerStyle={styles.input}
      />
      <Input
        placeholder="Club"
        onChangeText={(text) => setClub(text)}
        containerStyle={styles.input}
      />
      <Input
        placeholder="Desc"
        onChangeText={(text) => setDesc(text)}
        containerStyle={styles.input}
      />
      <Input
        placeholder="Venue"
        onChangeText={(text) => setVenue(text)}
        containerStyle={styles.input}
      />
      <Input
        placeholder="Date"
        value={date_string}
        containerStyle={styles.input}
      />

      <Button
        title="Show Date Picker"
        onPress={showDatepicker}
        
      />
      <Button
        title="Submit"
        onPress={Submit}
        
        
      />
    </ScrollView>
  </KeyboardAvoidingView>
);
};




const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#f0f4f8',
    flexGrow: 1,
    alignItems: 'stretch',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#219ebc',
    paddingVertical: 12,
    borderRadius: 8,
  },
  submitButton: {
    backgroundColor: '#023047',
  },
  buttonContainer: {
    marginVertical: 10,
  },
});