
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Search, Plus, Bell, Lock, ShieldCheck, Mail, ArrowRight, User as UserIcon } from 'lucide-react';
import { TabType, Chat, User, Message, AppTheme, Wallpaper } from './types';
import { MOCK_CHATS, MOCK_VIDEOS, MOCK_STORIES, WALLPAPERS } from './constants';
import ChatView from './components/Chats/ChatView';
import VideoFeed from './components/Videos/VideoFeed';
import BottomDock from './components/Layout/BottomDock';
import CreateModal from './components/Layout/CreateModal';
import AISmartAssistant from './components/AI/AISmartAssistant';
import VideoCallOverlay from './components/Calls/VideoCallOverlay';
import ProfileView from './components/Profile/ProfileView';
import SecurityOverlay from './components/Security/SecurityOverlay';
import AuthFlow from './components/Auth/AuthFlow';
import { supabase } from './lib/supabase';

const App: React.FC = () => {
  const [isLocked, setIsLocked] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('chats');
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCall, setActiveCall] = useState<{ type: 'audio' | 'video', chat: Chat } | null>(null);
  const [theme, setTheme] = useState<AppTheme>('deep-dark');
  const [wallpaper, setWallpaper] = useState<Wallpaper>(WALLPAPERS[0]);
  
  const [myUser, setMyUser] = useState<User | null>(null);

  const [chats, setChats] = useState<Chat[]>([]);
  const selectedChat = chats.find(c => c.id === selectedChatId);

  useEffect(() => {
    // 1. Initial Session Check
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        handleAuthSuccess(session.user);
      } else {
        setIsLoading(false);
      }
    });

    // 2. Auth State Listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        handleAuthSuccess(session.user);
      } else {
        setMyUser(null);
      }
    });

    const savedWall = localStorage.getItem('volna_wallpaper');
    const savedTheme = localStorage.getItem('volna_theme') as AppTheme;
    if (savedWall) setWallpaper(JSON.parse(savedWall));
    if (savedTheme) setTheme(savedTheme);

    return () => subscription.unsubscribe();
  }, []);

  const handleAuthSuccess = (supabaseUser: any) => {
    const userData: User = {
      id: supabaseUser.id,
      username: supabaseUser.user_metadata?.username || supabaseUser.email.split('@')[0],
      email: supabaseUser.email,
      phone: supabaseUser.phone || '',
      avatar: supabaseUser.user_metadata?.avatar_url || `https://picsum.photos/seed/${supabaseUser.id}/200`,
      bio: supabaseUser.user_metadata?.bio || 'Volna Explorer 🌊',
      status: 'online',
      isLoggedIn: true,
      isVerified: !!supabaseUser.email_confirmed_at,
      security: JSON.parse(localStorage.getItem(`volna_sec_${supabaseUser.id}`) || '{"isFaceIdEnabled":false,"isPasscodeEnabled":false,"passcode":null}')
    };
    setMyUser(userData);
    setIsLoading(false);

    // Load Chats
    const savedChats = localStorage.getItem(`volna_chats_${supabaseUser.id}`);
    if (savedChats) {
      setChats(JSON.parse(savedChats));
    } else {
      setChats(MOCK_CHATS.map(c => ({
        ...c,
        participants: [userData.id, c.id],
        messages: [{ id: 'm1', senderId: c.id, text: c.lastMessage, type: 'text', timestamp: new Date(), isRead: true }]
      })) as Chat[]);
    }

    // Auto-lock
    if (userData.security.isFaceIdEnabled || userData.security.isPasscodeEnabled) {
      setIsLocked(true);
    }
  };

  useEffect(() => {
    if (myUser) {
      localStorage.setItem(`volna_chats_${myUser.id}`, JSON.stringify(chats));
      localStorage.setItem(`volna_sec_${myUser.id}`, JSON.stringify(myUser.security));
    }
    localStorage.setItem('volna_wallpaper', JSON.stringify(wallpaper));
    localStorage.setItem('volna_theme', theme);
  }, [chats, myUser, wallpaper, theme]);

  const handleSendMessage = (chatId: string, message: Partial<Message>) => {
    if (!myUser) return;
    setChats(prev => prev.map(c => {
      if (c.id === chatId) {
        const newMsg: Message = { id: Date.now().toString(), senderId: myUser.id, timestamp: new Date(), isRead: false, type: message.type || 'text', ...message };
        return { ...c, messages: [...c.messages, newMsg], lastMessage: message.text || '📎 Media', time: 'Now' };
      }
      return c;
    }));
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setMyUser(null);
  };

  const isLight = theme === 'glass-light';

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[#0b0e14] flex flex-col items-center justify-center">
        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }} className="flex flex-col items-center">
          <div className="w-24 h-24 wave-gradient rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-blue-500/50 mb-8">
            <Sparkles size={48} className="text-white fill-white" />
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-white">VOLNA</h1>
        </motion.div>
      </div>
    );
  }

  if (!myUser) {
    return <AuthFlow onComplete={() => {}} />;
  }

  if (isLocked) {
    return <SecurityOverlay config={myUser.security} onUnlock={() => setIsLocked(false)} />;
  }

  return (
    <div className={`relative h-screen w-full flex flex-col overflow-hidden transition-all duration-700 ${isLight ? 'bg-gray-50 text-black' : 'bg-black text-white'}`}>
      {!isLight && (
        <>
          <motion.div key={wallpaper.id} initial={{ opacity: 0 }} animate={{ opacity: 0.35 }} className="fixed inset-0 z-0 pointer-events-none" style={{ backgroundImage: `url(${wallpaper.url})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
          <div className="fixed inset-0 z-0 bg-gradient-to-b from-black/60 via-transparent to-black pointer-events-none" />
        </>
      )}

      <header className={`px-6 pt-14 pb-4 flex items-center justify-between z-30 sticky top-0 backdrop-blur-3xl border-b ${isLight ? 'bg-white/70 border-gray-200' : 'bg-transparent border-white/5'}`}>
        <div className="flex items-center gap-4">
          <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="w-10 h-10 rounded-2xl wave-gradient flex items-center justify-center shadow-lg shadow-blue-500/30">
             <Sparkles size={20} className="text-white fill-white" />
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className={`text-lg font-black tracking-tight leading-none ${isLight ? 'text-black' : 'text-white'}`}>
                {activeTab === 'chats' ? 'Volna Chat' : activeTab === 'videos' ? 'Discovery' : 'Settings'}
              </h1>
              {myUser.isVerified && <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center"><ShieldCheck size={10} className="text-white" /></div>}
            </div>
            <span className="text-[9px] text-blue-500 font-bold uppercase tracking-widest">ID: {myUser.id.slice(0, 8)}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className={`w-10 h-10 rounded-2xl flex items-center justify-center active:scale-90 transition-all ${isLight ? 'bg-gray-100' : 'glass'}`}>
            <Bell size={20} />
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-40 px-6 py-4 z-10 relative no-scrollbar">
        <AnimatePresence mode="wait">
          {activeTab === 'chats' && (
            <motion.div key="chats" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              {/* Stories */}
              <div className="flex gap-4 overflow-x-auto py-2 no-scrollbar mb-6">
                <div onClick={() => setIsCreateOpen(true)} className="flex flex-col items-center gap-2 min-w-[76px]">
                  <div className={`w-[72px] h-[72px] rounded-3xl border-2 border-dashed flex items-center justify-center active:scale-90 transition-all ${isLight ? 'bg-gray-100 border-gray-300' : 'glass border-white/20'}`}>
                    <Plus className="text-blue-500" />
                  </div>
                  <span className="text-[9px] text-gray-400 font-black uppercase">Story</span>
                </div>
                {MOCK_STORIES.map((story) => (
                  <div key={story.id} className="flex flex-col items-center gap-2 min-w-[76px]">
                    <div className={`p-1 rounded-[2.2rem] ${story.hasUnwatched ? 'bg-gradient-to-tr from-blue-500 to-purple-600 shadow-md' : isLight ? 'bg-gray-200' : 'bg-white/10'}`}>
                      <img src={story.avatar} className={`w-[66px] h-[66px] rounded-[2.1rem] border-4 object-cover ${isLight ? 'border-white' : 'border-[#0b0e14]'}`} alt="" />
                    </div>
                    <span className={`text-[10px] font-bold truncate w-full text-center ${isLight ? 'text-gray-600' : 'text-gray-300'}`}>{story.user}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                {chats.map((chat) => (
                  <motion.div layout key={chat.id} onClick={() => setSelectedChatId(chat.id)} whileTap={{ scale: 0.97 }} className={`flex items-center gap-4 p-4 rounded-[2.2rem] border transition-all cursor-pointer group ${isLight ? 'bg-white border-gray-100 shadow-sm hover:shadow-md' : 'glass border-white/5 hover:bg-white/[0.06]'}`}>
                    <div className="relative">
                      <img src={chat.avatar} className="w-16 h-16 rounded-[1.8rem] object-cover shadow-xl" alt="" />
                      {chat.isOnline && <div className={`absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-4 rounded-full shadow-lg ${isLight ? 'border-white' : 'border-[#0b0e14]'}`} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-0.5">
                        <h3 className={`font-bold text-lg truncate ${isLight ? 'text-gray-900' : 'text-white'}`}>{chat.name}</h3>
                        <span className="text-[9px] font-black text-gray-500 uppercase">{chat.time}</span>
                      </div>
                      <p className={`text-sm truncate font-medium ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>{chat.lastMessage}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'videos' && (
            <motion.div key="videos" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              <VideoFeed videos={MOCK_VIDEOS} theme={theme} />
            </motion.div>
          )}

          {activeTab === 'profile' && (
            <ProfileView 
              user={myUser} onUpdateUser={setMyUser} theme={theme} onThemeChange={setTheme} 
              wallpaper={wallpaper} onWallpaperChange={setWallpaper} onLogout={handleLogout}
            />
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {selectedChat && <ChatView chat={selectedChat} myUser={myUser} onClose={() => setSelectedChatId(null)} onSendMessage={(msg) => handleSendMessage(selectedChat.id, msg)} onStartCall={(type) => setActiveCall({ type, chat: selectedChat })} wallpaper={wallpaper} theme={theme} />}
      </AnimatePresence>

      <AnimatePresence>
        {activeCall && <VideoCallOverlay callType={activeCall.type} chat={activeCall.chat} onClose={() => setActiveCall(null)} />}
      </AnimatePresence>
      
      <CreateModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} onAddContact={() => {}} />
      <BottomDock activeTab={activeTab} onTabChange={setActiveTab} onCreateClick={() => setIsCreateOpen(true)} theme={theme} />
      <AISmartAssistant />
    </div>
  );
};

export default App;
