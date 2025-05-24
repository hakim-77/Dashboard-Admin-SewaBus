import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <div id="layout-wrapper" className="flex flex-row flex-1">
            <Sidebar />
            <div id="main-content" className="flex-1 space-y-4">
                <Header />
                
                <Outlet/>
            </div>
        </div>
    )
}