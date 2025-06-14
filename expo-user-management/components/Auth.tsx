import React, { useState } from "react";
import { Alert, StyleSheet, View, AppState } from "react-native";
import { supabase } from "../lib/supabase";
import { Button, Input } from "@rneui/themed";
import { SafeAreaView } from "react-native";

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Auth({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", data.user?.id)
      .single();
    if (profile.admin) {
      navigation.navigate("Admin");
      Alert.alert("your are a admin");
    } else {
      navigation.navigate("Home");
    }
    setLoading(false);
  }
  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View></View>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Email"
          labelStyle={styles.inputLabel}
          leftIcon={{ type: "font-awesome", name: "envelope" }}
          inputStyle={styles.inputText}
          inputContainerStyle={styles.inputBox}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={"none"}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Password"
          labelStyle={styles.inputLabel}
          leftIcon={{ type: "font-awesome", name: "lock" }}
          inputStyle={styles.inputText}
          inputContainerStyle={styles.inputBox}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={"none"}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Sign in"
          buttonStyle={styles.signInButton}
          titleStyle={styles.buttonTitle}
          disabled={loading}
          onPress={() => signInWithEmail()}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Sign up"
          buttonStyle={styles.signUpButton}
          titleStyle={styles.signUpTitle}
          disabled={loading}
          onPress={() => signUpWithEmail()}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  verticallySpaced: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginVertical: 10,
    padding: 5,
  },
  mt20: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 30,
    color: "#2c3e50",
  },

  inputBox: {
    borderBottomWidth: 1,
  },
  inputText: {
    color: "#333",
    fontSize: 16,
  },
  inputLabel: {
    marginBottom: 4,
    color: "#555",
    fontWeight: "500",
  },
  buttonContainer: {
    marginTop: 20,
  },
  signInButton: {
    backgroundColor: "#3498db",
    borderRadius: 8,
    paddingVertical: 12,
  },
  signUpButton: {
    borderColor: "#3498db",
    borderWidth: 1.5,
    borderRadius: 8,
    paddingVertical: 12,
    backgroundColor: "#fff",
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  signUpTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#3498db",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
});
