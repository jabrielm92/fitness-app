import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import Dashboard from "./components/Dashboard/Dashboard";
import Homepage from "./components/Homepage/Homepage";
import Profile from "./components/Profile/Profile";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import SavedExercises from "./components/SavedExercises/SavedExercises";
import SearchExercises from "./components/SearchExercises/SearchExercises";
import WorkoutPlan from "./components/WorkoutPlan/WorkoutPlan";
import ProgressTracking from "./components/ProgressTracking/ProgressTracking";

import "./App.css";

function App() {
  const { currentUser } = useAuth();

  return (
    <AuthProvider>
      <Router>
        {currentUser && <Navigation />}
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Homepage />} index/>
            <Route path="/fitness-app" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            {currentUser && (
              <>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/search-exercises" element={<SearchExercises />} />
                <Route path="/saved-exercises" element={<SavedExercises />} />
                <Route path="/workout-plan" element={<WorkoutPlan />} />
                <Route path="/progress-tracking" element={<ProgressTracking />} />
              </>
            )}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}


export default App;
