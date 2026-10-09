import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import Home from "../pages/home/Home";
import Eventos from "../pages/Eventos/Eventos";
import DetalhesEvento from "../pages/DetalhesEvento/DetalhesEvento";

// O React Router não rola até o #id sozinho (ex.: /home#contato).
function ScrollToHash() {
    const { pathname, hash, key } = useLocation();

    useEffect(() => {
        if (hash) {
            document.getElementById(hash.slice(1))?.scrollIntoView();
        } else {
            window.scrollTo({ top: 0, behavior: "instant" });
        }
    }, [pathname, hash, key]);

    return null;
}

function AppRoutes() {
    return (
        <>
            <ScrollToHash />
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/eventos" element={<Eventos />} />
                <Route path="/eventos/:id" element={<DetalhesEvento/>} />

                <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
        </>
    );
}

export default AppRoutes;
