import { AiOutlineUser } from "react-icons/ai";
import { BsFillMegaphoneFill } from "react-icons/bs";
import { AiTwotoneCustomerService } from "react-icons/ai";
import { RiProfileFill } from "react-icons/ri";
import { MdArticle } from "react-icons/md";
import { FaQuestion } from "react-icons/fa";
import { RiTeamFill } from "react-icons/ri";
import { BiError } from "react-icons/bi";
import { MdOutlineReviews } from "react-icons/md";
import { IoIosContact } from "react-icons/io";
import { FcContacts } from "react-icons/fc";
import { IoMdBus } from "react-icons/io";
import { BsFillPeopleFill } from "react-icons/bs";
import { RiListOrdered } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { Link, NavLink } from "react-router-dom"
import { TfiGallery } from "react-icons/tfi";
export default function ListMenu() {
    const menuClass = ({ isActive }) =>
        `flex cursor-pointer items-center rounded-xl p-4 space-x-2
        ${isActive ?
            "text-white bg-blue-500 font-extrabold" :
            "text-gray-600 hover:text-white hover:bg-blue-500 hover:border-b-4 hover:border-blue-500 hover:font-extrabold"
        }`
    return (
        <div id="sidebar-menu" className="mt-2">
            <ul id="menu-list" className="space-y-1">
                <li>
                    <NavLink id="menu-1" to="/" className={menuClass}>
                        <RxDashboard className="mr-4 text-xl" />
                        <span className="hidden md:inline font-medium">Dashboard</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink id="menu-2" to="/booking" className={menuClass}>
                        <RiListOrdered className="mr-4 text-xl" />
                        <span className="hidden md:inline font-medium">Booking</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink id="menu-3" to="/listbus" className={menuClass}>
                        <IoMdBus className="mr-4 text-xl" />
                        <span className="hidden md:inline font-medium">List Bus</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink id="menu-4" to="/contact" className={menuClass}>
                        <IoIosContact className="mr-4 text-xl" />
                        <span className="hidden md:inline font-medium">Contact</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink id="menu-5" to="/testimoni" className={menuClass}>
                        <MdOutlineReviews className="mr-4 text-xl" />
                        <span className="hidden md:inline font-medium">Testimoni</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink id="menu-6" to="/badrequest" className={menuClass}>
                        <BiError className="mr-2 text-xl" />
                        <span className="hidden md:inline font-medium">Error 400</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink id="menu-7" to="/Unauthorized" className={menuClass}>
                        <BiError className="mr-2 text-xl" />
                        <span className="hidden md:inline font-medium">Error 401</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink id="menu-8" to="/forbidden" className={menuClass}>
                        <BiError className="mr-2 text-xl" />
                        <span className="hidden md:inline font-medium">Error 403</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink id="menu-9" to="/team" className={menuClass}>
                        <RiTeamFill className="mr-2 text-xl" />
                        <span className="hidden md:inline font-medium">Tim Karyawan</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink id="menu-10" to="/faq" className={menuClass}>
                        <FaQuestion className="mr-2 text-xl" />
                        <span className="hidden md:inline font-medium">FAQ</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink id="menu-11" to="/artikel" className={menuClass}>
                        <MdArticle className="mr-2 text-xl" />
                        <span className="hidden md:inline font-medium">Artikel</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink id="menu-12" to="/profile" className={menuClass}>
                        <RiProfileFill className="mr-2 text-xl" />
                        <span className="hidden md:inline font-medium">Company Profile</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink id="menu-13" to="/layanan" className={menuClass}>
                        <AiTwotoneCustomerService className="mr-2 text-xl" />
                        <span className="hidden md:inline font-medium">Layanan</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink id="menu-14" to="/lowongan" className={menuClass}>
                        <BsFillMegaphoneFill className="mr-2 text-xl" />
                        <span className="hidden md:inline font-medium">Lowongan</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink id="menu-15" to="/user" className={menuClass}>
                        <AiOutlineUser className="mr-2 text-xl" />
                        <span className="hidden md:inline font-medium">User</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink id="menu-15" to="/galeri" className={menuClass}>
                        <TfiGallery className="mr-2 text-xl" />
                        <span className="hidden md:inline font-medium">Gallery</span>
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}
