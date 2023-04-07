import "./App.css";
import { Routes, Route, Outlet, Link } from "react-router-dom";

import Courses from "./components/courses/Courses";
import LearnCourse from "./components/LearnCourse/LearnCourse";

import Register from "./components/register/Register";
import Login from "./components/login/Login";
import { createContext, useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/register" element={<Register toast={toast} />}></Route>

        <Route path="/courses" element={<Courses />}></Route>

        <Route
          path="/learn-course/:courseid"
          element={<LearnCourse toast={toast} />}
        ></Route>

        <Route path="/register" element={<Register />}></Route>

        <Route path="/login" element={<Login toast={toast} />}></Route>

        <Route path="*" element={<>404</>}></Route>
      </Routes>
    </>
  );
}

export default App;
