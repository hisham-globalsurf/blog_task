import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 text-center">
            <h1 className="text-6xl font-bold text-black mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
            <p className="text-gray-600 mb-6">Sorry, the page you're looking for doesn't exist.</p>
            <Button className={"bg-cyan-500 hover:bg-cyan-600 text-white font-bold"} onClick={() => navigate("/")}>Go to Home</Button>
        </div>
    );
};

export default NotFoundPage;