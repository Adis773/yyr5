
export type TabType = 'chats' | 'videos' | 'create' | 'notifications' | 'profile';
export type AppTheme = 'deep-dark' | 'glass-light' | 'midnight-blue' | 'volna-gradient';

export interface Wallpaper {
  id: string;
  url: string;
  category: 'Anime' | 'Kung Fu' | 'Sport' | 'Gaming' | 'Abstract';
  label: string;
}

export interface SecurityConfig {
  isFaceIdEnabled: boolean;
  isPasscodeEnabled: boolean;
  passcode: string | null;
}

export interface User {
  id: string;
  username: string;
  phone: string;
  email: string;
  password?: string; // Stored locally for simulation
  avatar: string;
  bio: string;
  status: 'online' | 'offline' | 'away';
  lastSeen?: string;
  isLoggedIn: boolean;
  isVerified: boolean;
  security: SecurityConfig;
}

export interface Message {
  id: string;
  senderId: string;
  text?: string;
  type: 'text' | 'voice' | 'image' | 'video';
  mediaUrl?: string;
  timestamp: Date;
  isRead: boolean;
}

export interface Chat {
  id: string;
  participants: string[]; 
  name: string;
  lastMessage?: string;
  time: string;
  unread: number;
  avatar: string;
  isOnline: boolean;
  type: 'private' | 'group' | 'channel';
  messages: Message[];
}

export interface Video {
  id: string;
  title: string;
  author: string;
  views: string;
  time: string;
  thumbnail: string;
  duration: string;
  authorAvatar: string;
  likes: number;
  comments: number;
}

export interface Story {
  id: string;
  user: string;
  avatar: string;
  hasUnwatched: boolean;
}
