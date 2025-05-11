import { Routes, Route, Navigate } from "react-router-dom";
import { routes } from "./routeConfig";

const AppRoutes = () => {
  return (
    <Routes>
      {routes?.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
