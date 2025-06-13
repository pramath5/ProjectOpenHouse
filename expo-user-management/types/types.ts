export type Post = {
  id: string;
  username: string;
  title: string;
  desc: string;
  venue: string;
  date: string;
  club: string;
  avatar_url?: string;
};

export type RootStackParamList = {
  Auth: undefined;
  Home: undefined;
  Admin: undefined;
  AddPost: undefined;
  Info: { post: Post };
};
