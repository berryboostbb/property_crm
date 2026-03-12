import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Logo from "../assets/PropertyCRM Logo 1.png";
const QueryList = lazy(() => import("../pages/queryList"));
const Leads = lazy(() => import("../pages/leads"));
const Tasks = lazy(() => import("../pages/tasks"));
const Todos = lazy(() => import("../pages/todos"));
const Contact = lazy(() => import("../pages/contact"));
const BusinessIntelligence = lazy(
  () => import("../pages/businessIntelligence"),
);
const Define = lazy(() => import("../pages/define"));

export default function MainRoutes() {
  return (
    <Suspense
      fallback={
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40">
          <img src={Logo} className="h-auto w-30 rounded-xl" alt="logo" />
          <p className="text-3xl font-medium">Loading...</p>
        </div>
      }
    >
      <Routes>
        <Route
          path="/businessIntelligence"
          element={<BusinessIntelligence />}
        />
        <Route path="/queryList" element={<QueryList />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="/contacts" element={<Contact />} />
        <Route path="/define" element={<Define />} />
      </Routes>
    </Suspense>
  );
}
