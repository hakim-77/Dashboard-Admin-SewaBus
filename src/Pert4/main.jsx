import { createRoot } from "react-dom/client";
import FrameworkList from "./frameworklist.jsx";
import './tailwind.css';


createRoot(document.getElementById("root"))
    .render(
        <div>
            <FrameworkList/>
        </div>
    )