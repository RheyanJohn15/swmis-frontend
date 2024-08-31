"use client";

import Sidebar from "@/Components/Parts/Sidebar";
import text from "@/Components/text";
import MapAndNavigation from "@/Components/Page/MapAndNavigation";
const MapAndNavigationPage = () => {
  return (
    <Sidebar header={<Header />} selected={5} >
        <MapAndNavigation/>
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
export default MapAndNavigationPage