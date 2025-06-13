import { Input, Button } from "@rneui/themed";
import { useState } from "react";
import { Alert, View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { Text,TouchableOpacity} from "react-native";
import { supabase } from "../lib/supabase";
import Avatar from "./Avatar";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import DateTimePicker from "@react-native-community/datetimepicker";


export default function Tab({ navigation }: any) {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState(new Date());
  const [club, setClub] = useState("");

  const Submit = async () => {
    const { error } = await supabase
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
      ]);

    if (error) {
      console.error(error);
      Alert.alert("Submission failed", error.message);
    } else {
      Alert.alert("Submitted successfully");
      navigation.navigate("Admin");
      setTitle("");
      setDesc("");
      setVenue("");
      setClub("");
    }
  };

  const onChange = (_event: any, selectedDate: any) => {
    setDate(selectedDate || date);
  };

  const showDatepicker = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: "date",
    });
  };

  const dateString = date.toString();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={[styles.image, styles.shadow]}>
        <View style={styles.avatarContainer}>
          <Avatar size={160} url={avatarUrl} onUpload={setAvatarUrl} />
        </View>

        <Input
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          containerStyle={styles.input}
        />
        
        <Input
          placeholder="Description"
          value={desc}
          onChangeText={setDesc}
          containerStyle={styles.input}
        />
        </View>
        <View style={[styles.image, styles.shadow]}>
        <Input
          placeholder="Club"
          value={club}
          onChangeText={setClub}
          containerStyle={styles.input}
        />
        
        <Input
          placeholder="Venue"
          value={venue}
          onChangeText={setVenue}
          containerStyle={styles.input}
        />
        </View>
        
        <TouchableOpacity onPress={showDatepicker} style={styles.dateField}>
        <Text style={styles.dateText}>
          {date ? date.toLocaleDateString() : "Select Date"}
        </Text>
      </TouchableOpacity>

        

        <View style={styles.buttonWrapper}>
          <Button
            title="Submit"
            onPress={Submit}
            buttonStyle={styles.submitButton}
            containerStyle={styles.button}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
    paddingBottom: 40,
    flexGrow: 1,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  input: {
    paddingTop:20,
    marginBottom: 16,
  },
  buttonWrapper: {
    marginTop: 20,
  },
  button: {
    marginBottom: 16,
  },
  dateButton: {
    backgroundColor: "#00b4d8",
    borderRadius: 10,
    paddingVertical: 14,
  },
  submitButton: {
    backgroundColor: "#0077b6",
    borderRadius: 10,
    paddingVertical: 14,
  },
  image: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 10,
    padding: 5,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
    dateText: {
    fontSize: 16,
    color: "#333",
  },
 dateField: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    width: "100%",
    marginBottom: 12,
  },
});
