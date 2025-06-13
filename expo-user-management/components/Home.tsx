import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { supabase } from '../lib/supabase';
import { useNavigation } from '@react-navigation/native';

interface Post {
  id: string;
  username: string;
  title: string;
  desc: string;
  venue: string;
  date: string;
  club: string;
  image_url?: string;
}

const HomeScreen = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const navigation = useNavigation<any>();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error.message);
    } else {
      setPosts(data as Post[] || []);
    }
  };

  const renderItem = ({ item }: { item: Post }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Info', { post: item })}>
      {/* Header */}
      <View style={styles.userRow}>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.date}>{new Date(item.date).toLocaleDateString()}</Text>
      </View>

      {/* Title */}
      <Text style={styles.title}>{item.title}</Text>

      {/* Image */}
      {item.image_url && <Image source={{ uri: item.image_url }} style={styles.image} />}

      {/* Description */}
      <Text style={styles.desc}>{item.desc}</Text>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.venue}>📍 {item.venue}</Text>
        <Text style={styles.club}>🏷️ {item.club}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginVertical: 10,
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  userRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333',
  },
  date: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c2c2c',
    marginBottom: 8,
    textAlign: 'left',
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginBottom: 10,
  },
  desc: {
    fontSize: 15,
    color: '#444',
    marginBottom: 12,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  venue: {
    fontSize: 14,
    color: '#555',
  },
  club: {
    fontSize: 14,
    color: '#555',
    fontStyle: 'italic',
  },
});
