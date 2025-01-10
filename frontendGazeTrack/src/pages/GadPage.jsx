import React from "react";
import GadForm from "../components/GadForm";
import NavbarManu from "../components/NavbarMenu";
import Footer from "./Footer";

const GadPage  = () => {
    return (
        <div className="bg-theme-background min-h-screen flex flex-col space-y-20">
            <NavbarManu />
            <GadForm />
            <Footer />
        </div>
    );
};

export default GadPage;