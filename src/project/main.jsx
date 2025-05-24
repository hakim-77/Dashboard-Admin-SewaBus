import { createRoot } from "react-dom/client";
import Karyawan from "./karyawan";
import Booking from "./booking";
import Profile from "./profile";
import Dashboard from "./dashboard";
import './custom.css';
import './tailwind.css';

createRoot(document.getElementById("root"))
    .render(
        <div>
            {/* <Karyawan/> */}
            <hr />
            <Booking/>
            <hr />
            {/* <Profile/> */}
            <hr />
            {/* <Dashboard/> */}
        </div>
    )