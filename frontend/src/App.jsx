import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import {
  lazy,
  Suspense
} from "react";

import Navbar from "./components/Navbar";

import ProtectedRoute from "./components/ProtectedRoute";

import LoginPage from "./pages/LoginPage";
import ClassesPage from "./pages/ClassesPage";
import MyBookingsPage from "./pages/MyBookingsPage";

const AdminPanel =
  lazy(
    () => import(
      "./pages/AdminPanel"
    )
  );

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<LoginPage />}
        />

        <Route
          path="/classes"
          element={
            <ProtectedRoute>
              <ClassesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute>
              <MyBookingsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <Suspense
              fallback={
                <h2>
                  Loading Admin Panel...
                </h2>
              }
            >
              <AdminPanel />
            </Suspense>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;