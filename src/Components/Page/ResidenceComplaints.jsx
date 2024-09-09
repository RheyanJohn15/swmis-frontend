"use client";
import text from "../text";
import Table from "../Parts/Tables";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { toastconfig } from "../Parts/Configs";
import "react-toastify/dist/ReactToastify.css";
const ResidenceComplaints = () =>{

    const [complaints, setComplaints] = useState([]);

    const column = [
        {
          accessorKey: 'complainant', 
          header: 'Complainants',
          size: 150,
        },
        {
          accessorKey: 'contact',
          header: 'Contact',
          size: 150,
        },
        {
          accessorKey: 'nature',
          header: 'Nature of Complaint',
          size: 200,
        },
       {
          accessorKey: 'remarks',
          header: 'Remarks',
          size: 150,
        }, 
        {
            accessorKey: 'location',
            header: 'Location',
            size: 150,
        }, 
    ];

    const access_token = typeof window !== 'undefined' ? window.sessionStorage.getItem('accessAuth') : null;
    const getAllComplaints = async () => {
       const api = `${process.env.NEXT_PUBLIC_API_URL}/complaints/list/`;

       const response = await fetch(api, {
        method: 'GET',
        headers: {"Content-Type": "application/json", "Authorization": `Bearer ${access_token}`}
       });

       if(!response.ok){
            toast.error(response.message, toastconfig);
       }

       const result = await response.json();

       if(result.status == 'success'){
        setComplaints(result.data);
       }else{
        toast.error(result.message, toastconfig);
       }
    }

    useEffect(()=> {
        getAllComplaints();
    }, []);
    return <>
    <ToastContainer />
    <div className="flex-row bg-white shadow rounded items-center justify-between p-4 space-y-3 sm:flex sm:space-y-0 sm:space-x-4">
        <div>
          <h5 className="mr-3 font-semibold dark:text-white">{text.Complaints.Dashboard.header}</h5>
          <p className="text-gray-500 dark:text-gray-400">{text.Complaints.Dashboard.subheader}</p>
        </div>
      </div>
      <Table data={complaints} col={column} />
</>
}

export default ResidenceComplaints;