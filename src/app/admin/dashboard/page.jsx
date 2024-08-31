"use client";

import Sidebar from "@/Components/Parts/Sidebar";
import text from "@/Components/text";
const Dashboard = () => {
  return (
    <Sidebar header={<Header />} selected={0} />
  )
}


const Header = () => {
    return (
      <h1 className="text-2xl text-white font-semibold">
        {text.App}
      </h1>
    );
  };
export default Dashboard