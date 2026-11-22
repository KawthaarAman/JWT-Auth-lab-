import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import SignupPage from "./pages/SignupPage";
import Homepage from "./pages/Homepage";
import SignInPage from "./pages/SigninPage";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import MyEntriesPage from "./pages/MyEntriesPage";
import EntriesPage from "./pages/EntriesPage";
import CreateEntryPage from "./pages/CreateEntryPage";
import EditEntryPage from "./pages/EditEntryPage";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/my-entries" element={<ProtectedRoute><MyEntriesPage /></ProtectedRoute>} />
        <Route path="/entries" element={<EntriesPage />} />
        <Route path="/entries/create" element={<ProtectedRoute><CreateEntryPage /></ProtectedRoute>}/>
        <Route path="/entries/:id/edit" element={<ProtectedRoute><EditEntryPage /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

export default App;
