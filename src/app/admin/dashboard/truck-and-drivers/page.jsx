"use client";

import Sidebar from "@/Components/Parts/Sidebar";
import text from "@/Components/text";
import TruckAndDriver from "@/Components/Page/TruckAndDriver";
const TruckAndDriverPage = () => {
  return (
    <Sidebar header={<Header />} selected={1} >
        <TruckAndDriver/>
    </Sidebar>
  )
}


const Header = () => {
    return (
      <h1 className="text-2xl font-semibold">
        {text.App}
      </h1>
    );
  };
export default TruckAndDriverPage