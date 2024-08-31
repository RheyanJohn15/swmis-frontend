"use client";

import Sidebar from "@/Components/Parts/Sidebar";
import text from "@/Components/text";
import Routes from "@/Components/Page/Routes";
const RoutesPage = () => {
  return (
    <Sidebar header={<Header />} selected={2} >
        <Routes/>
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
export default RoutesPage