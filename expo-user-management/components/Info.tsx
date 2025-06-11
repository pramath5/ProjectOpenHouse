import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from 'expo-router';
import { RootStackParamList } from '../types/types';

type InfoScreenProps = NativeStackScreenProps<RootStackParamList, 'Info'>;


function Info({ route }: InfoScreenProps) {
  const { post } = route.params;
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <Text style={styles.username}>u/{post.username}</Text>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.date}>
        {new Date(post.date).toLocaleDateString()}
      </Text>
      <Text style={styles.venue}>u/{post.venue}</Text>
      <Text style={styles.club}>u/{post.club}</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20 
  },

  card: {
    backgroundColor: "#ff0000",
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    elevation: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  username: {
    color: "#ccc",
    fontSize: 14,
  },
  date: {
    color: "#888",
    fontSize: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginVertical: 8,
  },
  content: {
    color: "#ddd",
    fontSize: 14,
  },
  venue: {
    color: "#ccc",
    fontSize: 14,
  },
  club: {
    color: "#ccc",
    fontSize: 14,
  },
  desc: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
});


export {Info}