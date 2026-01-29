import { Route, Routes } from "react-router";
import { PrivateRoute, PublicRoute } from "./guards";
import SigninPage from "@/components/pages/auth/signin";
import SignupPage from "@/components/pages/auth/signup";
import DocumentPage from "@/components/pages/document";
import LayoutAdmin from "@/components/templates/layout";
import DocumentFormPage from "@/components/pages/document/form";
import DocumentViewPage from "@/components/pages/document/view";

export default function AppRoutes() {
    return (
        <Routes>
            <Route element={<PublicRoute />}>
                <Route path="/auth/signin" element={<SigninPage />} />
                <Route path="/auth/signup" element={<SignupPage />} />
            </Route>
            <Route element={<PrivateRoute />}>
                <Route element={<LayoutAdmin />}>
                    <Route path="/" element={<DocumentPage />} />
                    <Route path="/document/form" element={<DocumentFormPage />} />
                    <Route path="/document/edit/:id" element={<DocumentFormPage />} />
                    <Route path="/document/:id" element={<DocumentViewPage />} />
                </Route>
            </Route>
            <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
    );
}
