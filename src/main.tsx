import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { Toaster } from "react-hot-toast";
import { SessionGuard } from "./hook";

const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
    <React.StrictMode>
        <SessionGuard fallback={<div className="loading-screen"><div className="spinner" /></div>}>
            {(session, setSession) => <App session={session} setSession={setSession} />}
        </SessionGuard>
        <Toaster />
    </React.StrictMode>
);