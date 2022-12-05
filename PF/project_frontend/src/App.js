import './App.css';

import HomePage from './pages/Homepage/HomePage'
import LoginPage from './pages/Login/LoginPage'
import RegisterPage from './pages/RegisterPage'
import UserProfile from './pages/UserProfile'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from './components/Header'
import {AuthProvider} from "./context/AuthContext";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import EditUserProfile from "./pages/EditUserProfile";
import SortStudio from "./pages/SortStudio";
import StudioPage from "./pages/StudioPage";
import ClassesPage from "./pages/ClassesPage";
import SchedulePage from "./pages/SchedulePage";
import HistoryPage from "./pages/HistoryPage";
import FilterStudiosPage from "./pages/FilterStudiosPage";
import FilterClassesPage from "./pages/FilterClassesPage";
import SortStudioPostCode from "./pages/SortStudioPostCode";

function App() {
  return (
    <div className="App">
        <Router>
            <Header/>
            <AuthProvider>
            <Routes>
                <Route element={<HomePage />} path="/" exact/>
                <Route element={<LoginPage />} path="/login"/>
                <Route element={<RegisterPage />} path="/register"/>
                <Route element={<UserProfile />} path="/profile/view"/>
                <Route element={<EditUserProfile />} path="/profile/edit"/>
                <Route element={<SortStudio />} path="/studio/sortby/currlocation"/>
                <Route element={<SortStudioPostCode />} path="/studio/postcode/"/>
                <Route element={<StudioPage />} path="/studio/:id/details"/>
                <Route element={<ClassesPage />} path="/studio/:id/classes"/>
                <Route element={<SchedulePage />} path="/class/schedule"/>
                <Route element={<HistoryPage />} path="/class/history"/>
                <Route element={<FilterStudiosPage />} path="/studio/filter"/>
                <Route element={<FilterClassesPage />} path="/studio/:id/classes/filter"/>
            </Routes>
            </AuthProvider>
        </Router>

    </div>
  );
}

export default App;
