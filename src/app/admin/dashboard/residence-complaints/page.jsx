"use client";

import Sidebar from "@/Components/Parts/Sidebar";
import text from "@/Components/text";
import ResidenceComplaints from "@/Components/Page/ResidenceComplaints";
const ResidenceComplaintsPage = () => {
  return (
    <Sidebar header={<Header />} selected={4} >
        <ResidenceComplaints/>
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
export default ResidenceComplaintsPage