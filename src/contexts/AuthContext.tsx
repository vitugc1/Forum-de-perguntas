import { createContext, ReactNode, useEffect, useState  } from 'react';
import firebase from 'firebase';
import { auth } from '../services/firebase';

type User = {
    id: string;
    name: string;
    avatar: string;
  }
  
type AuthContextType ={
    user: User | undefined;
    signInWithgoogle: () => Promise<void>;
  }

type AuthContextProviderProps ={
    children: ReactNode;
}

export const AuthContext =  createContext({} as AuthContextType );

export const AuthContextProvider = (props:  AuthContextProviderProps) => {
    const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, uid} =user

        if (!displayName || !photoURL) {
          throw new Error('Missing information From Google Scconut.');
        }
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    })
    return () => {
      unsubscribe();
    }
  }, []);

  const signInWithgoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);
      if (result.user) {
        const { displayName, photoURL, uid } = result.user
          if (!displayName || !photoURL) {
                throw new Error('Missing information from Google Account.')
              }
            setUser({
              id: uid,
              name: displayName,
              avatar: photoURL
            })
      }
  };

    return (
        <AuthContext.Provider value={{ user, signInWithgoogle }}>
            {props.children}
        </AuthContext.Provider>
    );
}