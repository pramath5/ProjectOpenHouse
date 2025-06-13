import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import {Info} from './Info'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Post } from '../types/types'; 


type InfoScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Info'>;


const PostCard = ({ post }: { post: Post }) => {
    const navigation = useNavigation<InfoScreenNavigationProp>();
  return (
    
    <TouchableOpacity 
    style={styles.card} 
    onPress={() => navigation.navigate('Info', { post })}
    >
      <View style={styles.header}>
        
      
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.date}>
          {new Date(post.date).toLocaleDateString()}
        </Text>
      </View>
      <View>
          <Text style={styles.venue}>{post.venue}</Text>
          <Text style={styles.club}>{post.club}</Text>
        </View>


      {post.image_url ? (
        <Image source={{ uri: post.image_url }} style={styles.image} />
      ) : null}
    </TouchableOpacity>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#219ebc',
    padding: 16,
    marginVertical: 10,
    borderRadius: 12,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  username: {
    color: '#e9edc9',
    fontSize: 14,
    fontWeight: '500',
  },
  date: {
    color: '#fb8500',
    fontSize: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginVertical: 6,
  },
  metaInfo: {
    marginBottom: 8,
  },
  venue: {
    color: '#dff0ea',
    fontSize: 14,
    marginTop: 2,
  },
  club: {
    color: '#dff0ea',
    fontSize: 14,
    marginTop: 2,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginTop: 10,
  },
});