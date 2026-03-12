import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Logo from "../assets/PropertyCRM Logo 1.png";
const Login = lazy(() => import("../pages/login"));

export default function AuthRoutes() {
  return (
    <Suspense
      fallback={
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-70">
          <img src={Logo} className="h-auto w-30 rounded-xl" alt="logo" />
          <p className="text-3xl font-medium">Loading...</p>
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </Suspense>
  );
}
