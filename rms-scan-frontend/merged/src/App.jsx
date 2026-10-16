
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./assets/pages/sign-up";
import SignIn from "./assets/pages/sign-in";
import HomePage from "./assets/pages/home";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}



