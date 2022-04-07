import './App.css';
import app from './firebase.init';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { useState } from 'react';
const auth = getAuth(app);

function App() {
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState({});
  const handleGoogleSighnIn = () => {
    signInWithPopup(auth, provider)
      .then(result => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch(error => {
        console.log('error', error);
      })
  }

  const handleGoogleSighnOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch(error => {
        setUser({});
      })
  }

  return (
    <div className="App">
      {
        user.email ? <button onClick={handleGoogleSighnOut}>Sighn Out</button> : <button onClick={handleGoogleSighnIn}>Google Sighn In</button>
      }
      <h2>Name: {user.displayName}</h2>
      <h5>I know your email: {user.email}</h5>
      <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;
