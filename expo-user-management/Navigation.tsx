import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";
import Auth from "./components/Auth";
import Account from "./components/Account";
import { SafeAreaView, View } from "react-native";
import { Session } from "@supabase/supabase-js";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Admin from "./components/Admin";
import Home from "./components/Home";
import AddPost from "./components/AddPost";
const Stack = createNativeStackNavigator();
export default function Navigation() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Auth">
          <Stack.Screen name="Auth" component={Auth} />
          <Stack.Screen name="Admin" component={Admin} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="AddPost" component={AddPost} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
