import React, { useEffect } from 'react';
import './App.scss';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat/Chat';
import { useSelector } from 'react-redux';
import Login from './components/login/Login';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { auth } from './firebase';
import { login, logout } from './features/userSlice';


function App() {

  const user = useAppSelector((state) => state.user)
  // const user = null;
  // console.log(user);

  const dispatch = useAppDispatch();

  useEffect (() => {
    auth.onAuthStateChanged((loginUser) => {
      console.log(loginUser);
      if(loginUser){
        dispatch(
          login({
            uid:loginUser.uid,
            photo: loginUser.photoURL,
            email: loginUser.email,
            displayName: loginUser.displayName,
          })
        );
      }else{
        dispatch(logout());
      }
    })
  },[dispatch])

  return (
    <div className="App">
      {user ? (
      <>
      {/* サイドバー */}
      <Sidebar />
      {/* チャット */}
      <Chat />
      </>
      ):(
        <><Login /></>
      )}

    </div>
  );
}

export default App;
