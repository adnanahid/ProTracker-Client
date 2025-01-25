import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import auth from "../firebase";
import useAxiosPublic from "../CustomHooks/UseAxiosPublic";

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const axiosPublic = useAxiosPublic();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //Login with google
  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  //Create User With Email and PassWord
  const userRegistration = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //sign in user
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //Update User Profile
  const updateUserProfile = (updateData) => {
    setLoading(true);
    return updateProfile(auth.currentUser, updateData);
  };

  const userLogOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  //Observer for current user
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //     if (currentUser) {
  //       const userInfo = { email: currentUser.email };
  //       axiosPublic.post("/jwt", userInfo).then((res) => {
  //         if (res.data.token) {
  //           localStorage.setItem("access-token", res.data.token);
  //           setLoading(false);
  //         }
  //       });
  //     } else {
  //       localStorage.removeItem("access-token");
  //       setLoading(false);
  //     }
  //   });
  //   return () => {
  //     return unsubscribe();
  //   };
  // }, [axiosPublic]);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const userInfo = { email: currentUser.email };
          const res = await axiosPublic.post("/jwt", userInfo);
          if (res.data.token) {
            localStorage.setItem("access-token", res.data.token);
            setUser(currentUser);
            setLoading(false);
          }
        } catch (error) {
          console.error("Error fetching token:", error);
        }
      } else {
        localStorage.removeItem("access-token");
        setUser(currentUser);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);
  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    signInWithGoogle,
    userRegistration,
    signInUser,
    updateUserProfile,
    userLogOut,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
