import { authStatus } from "@/lib/token";
import { Navigate, Outlet } from "react-router";

export const PrivateRoute = () => {
    const isAuth = authStatus();
    return isAuth ? <Outlet /> : <Navigate to="/auth/signin" replace />;
};

export const PublicRoute = () => {
    const isAuth = authStatus();
    return isAuth ? <Navigate to="/" replace /> : <Outlet />;
};
