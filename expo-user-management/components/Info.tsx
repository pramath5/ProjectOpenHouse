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
      <Text style={styles.username}>{post.username}</Text>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.date}>
        {new Date(post.date).toLocaleDateString()}
      </Text>
      <Text style={styles.venue}>Venue: {post.venue}</Text>
      <Text style={styles.club}>Club: {post.club}</Text>
      <Text style={styles.desc}>{post.desc}</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f4f6fc',
    flexGrow: 1,
  },
  username: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#023047',
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
    color: '#8d99ae',
    marginBottom: 16,
  },
  venue: {
    fontSize: 16,
    color: '#219ebc',
    marginBottom: 4,
  },
  club: {
    fontSize: 16,
    color: '#219ebc',
    marginBottom: 12,
  },
  desc: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
});


export {Info}