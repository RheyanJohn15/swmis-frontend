import { BiLogOut } from "react-icons/bi"; 
import { BsGearFill } from "react-icons/bs"; 
import { BiUserCircle } from "react-icons/bi"; 
import { BiMapAlt } from "react-icons/bi"; 
import { BiMessageDetail } from "react-icons/bi"; 
import { BiCalendar } from "react-icons/bi"; 
import { FaRoute } from "react-icons/fa"; 
import { GiMineTruck } from "react-icons/gi"; 
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { BsHouseDoorFill, BsFillChatLeftTextFill, BsFillPeopleFill   } from "react-icons/bs";
import Link from "next/link";
import { Tooltip } from "@material-tailwind/react";
import text from "../text";

export default function Sidebar({children, header, selected}) {

  
  return (
    <div className="bg-dark h-full flex">
    <SideNav select={selected} />
    <div className="w-full">
      <div className="h-[35px] m-4 rounded p-8 flex items-center bg-grey text-white">{header}</div>
      <div className="h-[83vh] overflow-auto m-4 rounded  bg-background">
        {children}
      </div>
    </div>
  </div>
  );
}

const SideNav = ({select}) => {
  const [selected, setSelected] = useState(0);
  
  useEffect(() => {
    setSelected(select);
  }, []);
  return (
    // NOTE: In prod, you'd likely set height to h-screen and fix to the viewport
    <nav className="h-screen bg-grey shadow-sm w-fit p-4 flex flex-col justify-between items-center gap-2">
      {/* Temp logo from https://logoipsum.com/ */}
      <div className="flex flex-col gap-2 items-center">
      <Image
       src="/logo/logo.png"
       width={70}
       height={70}
       alt="Logo"
      />
      <NavItem selected={selected === 0} tooltip={text.Navigation.dash} id={0} setSelected={setSelected} link="/admin/dashboard">
        <BsHouseDoorFill />
      </NavItem>
      <NavItem selected={selected === 1} tooltip={text.Navigation.td} id={1} setSelected={setSelected} link="/admin/dashboard/truck-and-drivers">
        <GiMineTruck />
      </NavItem>
      <NavItem selected={selected === 2} id={2} tooltip={text.Navigation.routes} setSelected={setSelected} link="/admin/dashboard/routes">
        <FaRoute  />
      </NavItem>
      <NavItem selected={selected === 3} id={3} tooltip={text.Navigation.sched} setSelected={setSelected} link="/admin/dashboard/schedules">
        <BiCalendar />  
      </NavItem>
      <NavItem selected={selected === 4} id={4} tooltip={text.Navigation.complaints} setSelected={setSelected} link="/admin/dashboard/residence-complaints">
         <BiMessageDetail />
      </NavItem>
      <NavItem selected={selected === 5} id={5} tooltip={text.Navigation.nav} setSelected={setSelected} link="/admin/dashboard/map-and-navigation">
        <BiMapAlt />
      </NavItem>
      </div>

      <div className="flex flex-col gap-2">
      <NavItem selected={selected === 6} id={6} tooltip={text.Navigation.profile} setSelected={setSelected} link="/admin/dashboard/profile">
       <BiUserCircle />
      </NavItem>
      <NavItem selected={selected === 7} id={7} tooltip={text.Navigation.settings} setSelected={setSelected} link="/admin/dashboard/settings">
       <BsGearFill />
      </NavItem>
      <NavItem selected={selected === 8} id={8} tooltip={text.Navigation.logout} setSelected={setSelected} link="/admin/dashboard/employees">
        <BiLogOut />
      </NavItem>
      </div>
    </nav>
  );
};

const NavItem = ({ children, selected, id, setSelected, link, tooltip }) => {
  return (
  <Link href={link}>
     <Tooltip className="p-4 bg-black" content={tooltip} placement="right">
    <motion.button
      className="p-3 text-xl bg-primary hover:bg-secondary text-white rounded-md transition-colors relative"
      onClick={() => setSelected(id)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="block relative z-10">{children}</span>
      <AnimatePresence>
        {selected && (
          <motion.span
            className="absolute inset-0 rounded-md bg-highlight z-0"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          ></motion.span>
        )}
      </AnimatePresence>
    </motion.button>
    </Tooltip>
    </Link>
  );
};