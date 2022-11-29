import './App.css';

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import UserProfile from './pages/UserProfile'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from './components/Header'
import {AuthProvider} from "./context/AuthContext";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import EditUserProfile from "./pages/EditUserProfile";
import SortStudio from "./pages/SortStudio";

function App() {
  return (
    <div className="App">
        <Router>
            <Header/>
            <AuthProvider>
            <Routes>
                <Route element= {<HomePage />} path="/" exact/>
                <Route element={<LoginPage />} path="/login"/>
                <Route element={<RegisterPage />} path="/register"/>
                <Route element={<UserProfile />} path="/profile/view"/>
                <Route element={<EditUserProfile />} path="/profile/edit"/>
                <Route element={<SortStudio />} path="/studio/currlocation"/>
            </Routes>
            </AuthProvider>
        </Router>

    </div>
  );
}

export default App;
