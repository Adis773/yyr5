
import { Chat, Video, Story, Wallpaper } from './types';

export const WALLPAPERS: Wallpaper[] = [
  // Anime
  { id: 'a1', category: 'Anime', label: 'Neon Samurai', url: 'https://images.unsplash.com/photo-1578632738980-422137bc6797?auto=format&fit=crop&q=80&w=1000' },
  { id: 'a2', category: 'Anime', label: 'Spirit Forest', url: 'https://images.unsplash.com/photo-1613376023733-0a73315d9b06?auto=format&fit=crop&q=80&w=1000' },
  { id: 'a3', category: 'Anime', label: 'Cyber Runner', url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1000' },
  { id: 'a4', category: 'Anime', label: 'Mecha Core', url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=1000' },
  { id: 'a5', category: 'Anime', label: 'Pixel Sky', url: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=1000' },
  // Kung Fu
  { id: 'k1', category: 'Kung Fu', label: 'Dragon Path', url: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&q=80&w=1000' },
  { id: 'k2', category: 'Kung Fu', label: 'Shaolin Mist', url: 'https://images.unsplash.com/photo-1599313002231-64e03f09804c?auto=format&fit=crop&q=80&w=1000' },
  { id: 'k3', category: 'Kung Fu', label: 'Crane Style', url: 'https://images.unsplash.com/photo-1520038410233-7141be7e6f97?auto=format&fit=crop&q=80&w=1000' },
  { id: 'k4', category: 'Kung Fu', label: 'Ancient Master', url: 'https://images.unsplash.com/photo-1493236795728-99b007e10100?auto=format&fit=crop&q=80&w=1000' },
  { id: 'k5', category: 'Kung Fu', label: 'Bamboo Fight', url: 'https://images.unsplash.com/photo-1508612761958-e931d843bdd5?auto=format&fit=crop&q=80&w=1000' },
  // Sport
  { id: 's1', category: 'Sport', label: 'Stadium Lights', url: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=1000' },
  { id: 's2', category: 'Sport', label: 'Formula Speed', url: 'https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&q=80&w=1000' },
  { id: 's3', category: 'Sport', label: 'B-Ball Glow', url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=1000' },
  { id: 's4', category: 'Sport', label: 'Snow Shred', url: 'https://images.unsplash.com/photo-1551698618-1fed5d978044?auto=format&fit=crop&q=80&w=1000' },
  { id: 's5', category: 'Sport', label: 'Surf Peak', url: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&q=80&w=1000' },
  // Gaming
  { id: 'g1', category: 'Gaming', label: 'Level Up', url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1000' },
  { id: 'g2', category: 'Gaming', label: 'Controller Void', url: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&q=80&w=1000' },
  { id: 'g3', category: 'Gaming', label: 'Neon Setup', url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000' },
  { id: 'g4', category: 'Gaming', label: 'Vapor Wave', url: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=1000' },
  { id: 'g5', category: 'Gaming', label: 'Dungeon Master', url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=1000' },
  // Abstract
  { id: 'ab1', category: 'Abstract', label: 'Deep Fluid', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000' },
  { id: 'ab2', category: 'Abstract', label: 'Glass Prism', url: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=1000' },
  { id: 'ab3', category: 'Abstract', label: 'Silk Flow', url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=1000' },
  { id: 'ab4', category: 'Abstract', label: 'Dark Lava', url: 'https://images.unsplash.com/photo-1604076913837-52ab5629fba9?auto=format&fit=crop&q=80&w=1000' },
  { id: 'ab5', category: 'Abstract', label: 'White noise', url: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&q=80&w=1000' },
];

export const MOCK_CHATS: Chat[] = [
  { id: '1', name: 'Volna Team', lastMessage: 'AI update deployed 🚀', time: '12:45', unread: 5, avatar: 'https://picsum.photos/seed/volna/200', isOnline: true, type: 'channel', participants: [], messages: [] },
  { id: '2', name: 'Artem Sokolov', lastMessage: 'Let’s record the podcast later?', time: '11:20', unread: 0, avatar: 'https://picsum.photos/seed/artem/200', isOnline: true, type: 'private', participants: [], messages: [] },
  { id: '3', name: 'Design Hub', lastMessage: 'New blurred glass icons are ready', time: '10:05', unread: 12, avatar: 'https://picsum.photos/seed/design/200', isOnline: false, type: 'group', participants: [], messages: [] },
  { id: '4', name: 'Maria Ivanova', lastMessage: 'Sent a photo', time: 'Yesterday', unread: 0, avatar: 'https://picsum.photos/seed/maria/200', isOnline: false, type: 'private', participants: [], messages: [] },
];

export const MOCK_VIDEOS: Video[] = [
  { id: 'v1', title: 'Why Volna is the next big thing in Social Media', author: 'Tech Insider', views: '1.2M', time: '2 hours ago', thumbnail: 'https://picsum.photos/seed/vid1/800/450', duration: '12:45', authorAvatar: 'https://picsum.photos/seed/auth1/100', likes: 12400, comments: 452 },
  { id: 'v2', title: 'Exploring Kamchatka with a Drone 4K', author: 'Travel Vlogs', views: '450K', time: '1 day ago', thumbnail: 'https://picsum.photos/seed/vid2/800/450', duration: '08:20', authorAvatar: 'https://picsum.photos/seed/auth2/100', likes: 8500, comments: 128 },
];

export const MOCK_STORIES: Story[] = [
  { id: 's1', user: 'My Story', avatar: 'https://picsum.photos/seed/me/200', hasUnwatched: false },
  { id: 's2', user: 'Alex', avatar: 'https://picsum.photos/seed/alex/200', hasUnwatched: true },
  { id: 's3', user: 'Sasha', avatar: 'https://picsum.photos/seed/sasha/200', hasUnwatched: true },
];
