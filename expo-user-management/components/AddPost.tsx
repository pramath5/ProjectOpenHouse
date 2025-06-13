import { Input } from "@rneui/themed";
import { useState } from "react";
import { Alert, Text, View, StyleSheet, ScrollView } from "react-native";
import { Button } from "react-native";
import { supabase } from "../lib/supabase";
import Avatar from "./Avatar";
import {DateTimePickerAndroid} from "@react-native-community/datetimepicker";
import { FontAwesome } from "@expo/vector-icons";
import {  TouchableOpacity } from 'react-native';



export default function Tab({ navigation }: any) {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState(new Date());
  const [club, setClub] = useState("");

  const formatDate = (date: Date) => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // months are 0-indexed
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};


  const Submit = async () => {
    const { data, error } = await supabase
      .from("posts")
      .insert([
        {
          title,
          desc,
          venue,
          club,
          date,
          avatar_url: avatarUrl,
        },
      ])
      .select();

    console.log(error);
    navigation.navigate("Admin");
    setTitle("");
    setDesc("");
    setVenue("");
    setClub("");
    Alert.alert("✅ Submitted successfully");
  };

  const onChange = (event: any, selectedDate: any) => {
    setDate(selectedDate);
  };

  const showDatepicker = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: "date",
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Create New Post</Text>

      <Avatar
        size={200}
        url={avatarUrl}
        onUpload={(url: any) => {
          setAvatarUrl(url);
        }}
      />

      <Input
        placeholder="Enter Title"
        value={title}
        onChangeText={setTitle}
        inputStyle={styles.input}
        containerStyle={styles.inputContainer}
      />
      <Input
        placeholder="Enter Club Name"
        value={club}
        onChangeText={setClub}
        inputStyle={styles.input}
        containerStyle={styles.inputContainer}
      />
      <Input
        placeholder="Enter Description"
        value={desc}
        onChangeText={setDesc}
        inputStyle={styles.input}
        containerStyle={styles.inputContainer}
        multiline
      />
      <Input
        placeholder="Enter Venue"
        value={venue}
        onChangeText={setVenue}
        inputStyle={styles.input}
        containerStyle={styles.inputContainer}
      />

      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>
          Date: {date.toDateString()}
        </Text>
       <TouchableOpacity onPress={showDatepicker} style={styles.datePicker}>
  <FontAwesome name="calendar" size={20} color="#333" />
  <Text style={styles.dateText}>{formatDate(date)}</Text>
</TouchableOpacity>

      </View>

      <Button title="📤 Submit" onPress={Submit} color="#0077b6" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 60,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#023047",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 12,
  },
  input: {
    fontSize: 16,
    color: "#212529",
  },
  dateContainer: {
    width: "100%",
    marginBottom: 20,
    alignItems: "flex-start",
  },
  datePicker: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#f0f0f0",
  padding: 10,
  borderRadius: 8,
  marginBottom: 16,
  width: '80%',
  justifyContent: 'center',
},
dateText: {
  marginLeft: 10,
  fontSize: 16,
  color: "#333",
},

});
