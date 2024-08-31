"use client";

import Sidebar from "@/Components/Parts/Sidebar";
import text from "@/Components/text";
import Schedules from "@/Components/Page/Schedule";
const SchedulePage = () => {
  return (
    <Sidebar header={<Header />} selected={3} >
        <Schedules/>
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
export default SchedulePage