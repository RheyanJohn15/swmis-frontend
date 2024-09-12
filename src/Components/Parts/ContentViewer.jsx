import { BsFillInfoSquareFill } from "react-icons/bs"; 
import { useEffect, useState } from "react";
import text from "../text";
const ContentViewer = ({isDrawerOpen, setIsDrawerOpen, type, selectedId}) => {
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const [title, setTitle] = useState('');
  const [content, setContent] = useState(null);

  const accessAuth = typeof window !== 'undefined' ? window.sessionStorage.getItem('accessAuth') :  null;

  useEffect(()=>{
    switch(type){
        case 'truck':
            setTitle(text.truck_drivers.View.truck);
            setContent(<TruckDetail id={selectedId} token={accessAuth} />)
            break;
        case 'driver':
            setTitle(text.truck_drivers.View.driver);
            setContent(<DriverDetail id={selectedId} token={accessAuth} />)
            break;
        case "complaints":
          setTitle(text.Complaints.View);
          setContent(<ComplaintDetails id={selectedId} token={accessAuth} />)
        default:
            setTitle('Default');
            break;
    }
  }, [type]);

  return (

      <div
        className={`fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform bg-white w-full dark:bg-gray-800 ${
          isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        tabIndex="-1"
        aria-labelledby="drawer-label"
      >
        <h5
          id="drawer-label"
          className="inline-flex items-center mb-4 text-2xl gap-4 font-semibold text-gray-500 dark:text-gray-400"
        >
        <BsFillInfoSquareFill />
          {title}
        </h5>
        <button
          type="button"
          onClick={toggleDrawer}
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close menu</span>
        </button>

     
        {content}
      </div>

  );
};


const TruckDetail = ({id, token}) => {

    const defaultTruck = {
        model: "Loading....",
        driver: "Loading....",
        can_carry: "0",
        plate_number: "Loading...",
        driverdata:{
            first_name: "--------",
            last_name: "---------",
            license: "Loading....",
            contact: "Loading.....",
            address: "Loading.....",
        }
    }
    const [truck, setTruck] = useState(defaultTruck);
    
    const details = async () => {
        const api = `${process.env.NEXT_PUBLIC_API_URL}/truckdriver/truckdetail/`;

        const response = await fetch(api, {
            method: "POST",
            headers: {"Content-Type":"application/json", "Authorization": `Bearer ${token}`},
            body: JSON.stringify({id:id})
        });

        if(!response.ok){
            throw new Error(response.statusText);
        }

        const result = await response.json();

        return result.data;
    }

    useEffect(()=>{
        details().then((result) => {
            setTruck(result);
            console.log(result);
          });
    },[]);

   return (
    <div className="flex w-full gap-4">
 <div className="mx-auto w-full bg-white rounded-lg shadow-md overflow-hidden dark:bg-gray-800 dark:border-gray-700">
    <div className="p-6">
      <h5 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
        {truck.model}
      </h5>
      <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">
        Capacity: {truck.can_carry} tons
      </p>
      <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">
        Plate Number: {truck.plate_number}
      </p>
    </div>
  </div>
  <div className="mx-auto w-full bg-white rounded-lg shadow-md overflow-hidden dark:bg-gray-800 dark:border-gray-700">
    <div className="p-6">
      <h5 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
        Driver: {truck.driverdata.first_name} {truck.driverdata.last_name}
      </h5>
      <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">
        License: {truck.driverdata.license}
      </p>
      <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">
        Contact: {truck.driverdata.contact}
      </p>
      <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">
        Address: {truck.driverdata.address}
      </p>
    </div>
  </div>    
    </div>

   )
}

const DriverDetail = ({id, token}) => {
  const defaultDriver = {
            first_name: "--------",
            last_name: "---------",
            license: "Loading....",
            contact: "Loading.....",
            address: "Loading.....",
  }

  const [driverList, setDriverList] = useState(defaultDriver);

  const details = async () => {
    const api = `${process.env.NEXT_PUBLIC_API_URL}/truckdriver/driverdetail/`;

    const response = await fetch(api, {
        method: "POST",
        headers: {"Content-Type":"application/json", "Authorization": `Bearer ${token}`},
        body: JSON.stringify({id:id})
    });

    if(!response.ok){
        throw new Error(response.statusText);
    }

    const result = await response.json();

    return result.data;
}

useEffect(()=>{
    details().then((result) => {
        setDriverList(result);
      });
},[]);


  return (
    <div className="mx-auto w-full bg-white rounded-lg shadow-md overflow-hidden dark:bg-gray-800 dark:border-gray-700">
    <div className="p-6">
      <h5 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
        Driver: {driverList.first_name} {driverList.last_name}
      </h5>
      <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">
        License: {driverList.license}
      </p>
      <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">
        Contact: {driverList.contact}
      </p>
      <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">
        Address: {driverList.address}
      </p>
    </div>
  </div> 
  )

}

const ComplaintDetails = ({id, token}) => {

  const loadComplaint = {
    complainant: "Loading.....",
    remarks: "Loading......",
    contact: "Loading.....",
    nature: "Loading.....",
  }

  const [compList, setCompList] = useState(loadComplaint);

  const getDetails = async () => {
    const api = `${process.env.NEXT_PUBLIC_API_URL}/complaints/details/`;

    const response = await fetch(api, {
      method: "POST",
      headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`},
      body: JSON.stringify({id:id})
    });

    if(!response.ok){
      console.error(response.responseText);
    }

    const result = await response.json();

    return result.data;
  }

  useEffect(()=> {
    getDetails().then((res)=>{
      setCompList(res);
    });
  }, []);

  return (
    <div className="mx-auto w-full bg-white rounded-lg shadow-md overflow-hidden dark:bg-gray-800 dark:border-gray-700">
    <div className="p-6">
      <h5 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
        Complainant: {compList.complainant}
      </h5>
      <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">
        Contact: {compList.contact}
      </p>
      <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">
        Nature: {compList.nature}
      </p>
     <div className="border border-1 w-full rounded p-8">
      <p className="text-base text-black">{compList.remarks}</p>
     </div>
    </div>
  </div> )
}

export default ContentViewer;
