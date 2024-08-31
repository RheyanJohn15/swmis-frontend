"use client";

import Sidebar from "@/Components/Parts/Sidebar";
import text from "@/Components/text";
import Settings from "@/Components/Page/Settings";
const SettingsPage = () => {
  return (
    <Sidebar header={<Header />} selected={1} >
        <Settings/>
    </Sidebar>
  )
}


const Header = () => {
    return (
      <h1 className="text-2xl text-white font-semibold">
        {text.App}
      </h1>
    );
  };
export default SettingsPage