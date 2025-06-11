import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";
import Auth from "./components/Auth";
import Account from "./components/Account";
import { View } from "react-native";
import { Session } from "@supabase/supabase-js";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Admin from "./components/Admin";
import Home from "./components/Home";
import Navigation from "./Navigation";
import { SafeAreaView } from "react-native";

export type Post = {
  id: number;
  username: string;
  title: string;
  desc: string;
  venue: string;
  date: string;
  club: string;
  imageUrl?: string;
};

export type RootStackParamList = {
  Auth: undefined;
  Home: undefined;
  Admin: undefined;
  AddPost : undefined;
};
export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  const Stack = createNativeStackNavigator<RootStackParamList>();
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {session && session.user ? <Navigation /> : <Auth />}
    </SafeAreaView>
  );
}
