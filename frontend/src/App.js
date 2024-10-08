import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import ContactUs from "./pages/contactus";
import Homepage from "./pages/HomePage";
import NotFound from "./pages/404"; // Import the 404 component
import "./styles/app.css";
import { PrivateRoute, AnonymousRoute } from "./components/utils";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar></Navbar>
        <div className="pages">
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Homepage></Homepage>}></Route>
            </Route>

            <Route element={<AnonymousRoute />}>
              <Route path="/" element={<Navigate to="/sign-in" />} />
              <Route path="/sign-in" element={<Login></Login>}></Route>
              <Route path="/sign-up" element={<Signup></Signup>}></Route>
            </Route>

            <Route path="/contact-us" element={<ContactUs></ContactUs>}></Route>

            {/* Catch-all route for non-existent paths */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
