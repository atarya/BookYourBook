import React from 'react';


// screens
import Splash from './screens/Splash';
import Login from './screens/Login';
import MobVerify from './screens/MobVerify';
import Signup from './screens/Signup';
import Welcome from './screens/Welcome';


// React Stack navigation 
import RootStack from './navigators/RootStack';


export default function App() {
  return (
    <RootStack />

    // <Splash />
    // <Login />
    // <MobVerify />
    // <Signup />
    // <Welcome />


  );
}


