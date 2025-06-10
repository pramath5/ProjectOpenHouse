import React from "react";
import { Text , View , Image, StyleSheet} from "react-native";
import { Card } from '@rneui/themed';


type Post = {
  id: string;
  title: string;
  user: string;
  image?: string;
  content: string;
};
export default function Cards( {post} : {post : Post}){
    return 1
}