import React, { createContext, useState, useEffect, useRef } from 'react';
import { getHistory, getUser, initializeUser, getRank } from './player';
import { initializeSocket, getSocket } from './socket';
import { User, user, user_stats, History } from './Components/types';
import { Socket } from 'socket.io-client';
import axios from 'axios';

interface UserContextProps {
  user: user | null;
  history: History[] | null;
  socket: Socket | null;
  updateUser: (newUser: user) => void; // Add this line
  initialize: () => Promise<void>;
  updateStats: (win: Boolean) => void;
  updatehistory: (gameId: number) => Promise<void>;
}

interface UserProviderProps {
    children: React.ReactNode;
  }
const getSessionCookies = (): string => {
  const cookies = document.cookie.split(';');
  return cookies[0];
};


export const UserContext = createContext<UserContextProps>({ 
  user: null, // Provide a default value
  history: null,
  updateUser: (newUser:user) => {}, // Provide a default function
  initialize: async () => {},
  updateStats: (win:Boolean) => {},
  updatehistory: async (gameId: number) => {},
  socket: null
});

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<user | null>(null);
    const [history, setHistory] = useState<History[] | null>(null);
    // const [ user_stats, setStats ] = useState<user_stats | any>(null);
    const [socket, setSocket] = useState<Socket | null>(null);
    const hasInitialized = useRef(false);

  const updateUser = (newUser:user) => {
    setUser(newUser);
  };

  const updatehistory = async (gameId: number) => {
    // const newHistory: History = history;
    await axios.get(`http://localhost:3000/profile/game/${gameId}`, { withCredentials: true }).then(res => {
      const newusergames: any[] = res.data;
      const newHistory: History = {} as History;
      newHistory.score1 = newusergames.find(game => game.userId === user?.id)?.score;
      newHistory.score2 = newusergames.find(game => game.userId !== user?.id)?.score;
      newHistory.user2 = newusergames.find(game => game.userId !== user?.id).user.avatar;
      setHistory(prevHistory => {
        if (prevHistory) {
          return [newHistory, ...prevHistory];
        } else {
          // return a default user object with all properties defined
          return null;
        }
      } );
      } );
  }

  const updateStats = (win: Boolean) => {
    // setStats(newStats);
    const states = user?.user_stats;
    if (!states) {
      return;
    }
    states.total_matches++;
    win ? states.wins++ : states.wins;
    states.winsRat = states.wins / states.total_matches;
    getRank().then(res => {
      setUser(prevUser => {
        if (prevUser) {
          return { ...prevUser, user_stats: states, rank: res };
        } else {
          // return a default user object with all properties defined
          return null;
        }
      });
    }
    ).catch(error => {
      console.error("Failed to get rank: ", error);
    } );
  };


  const initialize = async () => {
    await initializeUser().then(res => {
      // console.log("User: initialize", res);
      if (res) {
        getUser().then(res => {
          if (res) {
            setUser(res);
            getHistory().then(res => {
              if (res) {
                setHistory(res);
              } else {
                console.error("Failed to get history: ", res);
              }
            } ).catch(error => {
              console.error("Failed to get history: ", error);
              return false;
            } );
            // console.log("User: set", res);
          }
          initializeSocket(res.id, getSessionCookies()).then(res => {
            if (res) {
              // console.log("Socket: set", res);
              setSocket(res);
            } else {
              console.error("Failed to initialize socket: ", res);
            }
          } ).catch(error => {
            console.error("Failed to initialize socket: ", error);
            return false;
          } );
          console.log("User: provider", res);
          
        } ).catch(error => {
          console.error("Failed to get user: ", error);
          return false;
        });
        hasInitialized.current = true;
        return true;
      }
    } ).catch(error => {
      console.error("Failed to get user: ", error);
      return false;
    } );
    console.log("User: provider");
  }

  return (
    <UserContext.Provider value={{ user, history, updatehistory, updateStats, updateUser, initialize, socket }}>
      {children}
    </UserContext.Provider>
  );
};