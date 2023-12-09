import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthRoutes } from "../auth";
import { JournalRoutes } from "../Journal/routes";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login and Register */}
        <Route path="/auth/*" element={<AuthRoutes />} />

        {/* JournalApp */}
        <Route path="/*" element={<JournalRoutes />} />
      </Routes>
    </BrowserRouter>
  );
};
