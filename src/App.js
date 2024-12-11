// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
// import React from 'react';
// import Login from './Login';

// function App() {
//   return (
//     <div className="App">
//       <Login />
      
//     </div>
    
//   );
// }




// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import SignupPage from "./SignupPage";
// import IllustrationPage from "./IllustrationPage";

// const App = () => {
//   return (
//     <Router>
//       <div className="app">
//         <nav>
//           <Link to="/">Illustration</Link> | <Link to="/signup">Sign Up</Link>
//         </nav>
//         <Routes>
//           <Route path="/" element={<IllustrationPage />} />
//           <Route path="/signup" element={<SignupPage />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import VerifyCode from "./VerifyCode";
import UserProfile from "./UserProfile"; 
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Login Page */}
          <Route path="/" element={<Login />} />

          {/* Signup Page */}
          <Route path="/signup" element={<Signup />} />

          <Route path="/VerifyCode" element={<VerifyCode/>} />
          <Route path="/profile" element={<UserProfile />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
