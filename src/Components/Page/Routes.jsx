import { MdOutlineSend } from "react-icons/md"; 
import { BsFillPersonBadgeFill } from "react-icons/bs"; 
import { AiFillFileAdd } from "react-icons/ai"; 
import Loading from "./Loading";
import { toastconfig } from "../Parts/Configs";
import { CgAdd } from "react-icons/cg"; 
import MapRoutes from "../Parts/MapRoutes";
import Table from "../Parts/Tables";
import text from "../text";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import Input from "../Parts/Input";
import Select from "../Parts/Select";
import Searching from "../Parts/Searching";
const Routes = () =>{
    const [driverList, setDriverList] = useState([]);
    const [wayPointList, setWayPointList] = useState([]);
    const access_token = typeof window !== "undefined" ? window.sessionStorage.getItem('accessAuth') : null;
    
    const getAllDriver = async () => {

        const api = `${process.env.NEXT_PUBLIC_API_URL}/truckdriver/listdriver/`;

        const response = await fetch(api, {
            method: "GET",
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${access_token}`}
        });

        const result = await response.json();

        setDriverList(result.data);
    }

    useEffect(()=>{
  
        getAllDriver();
    }, []);

    const routeCol = [
        {
          accessorKey: 'route_name', 
          header: 'Route Name',
          size: 150,
        },
        {
          accessorKey: 'coordinates',
          header: 'Route Point',
          size: 150,
        },

        {
          accessorKey: 'driver',
          header: 'Driver',
          size: 150,
        },
        {
            accessorKey: 'schedule',
            header: 'Schedule',
            size: 150,
          },
          
    ];

    const [routeData, setRouteData] = useState([]);
    const [isSearching, setIsSearching] = useState(true);
    const getAllRoutes = async () => {
      const api = `${process.env.NEXT_PUBLIC_API_URL}/routes/list/`;

      const response = await fetch(api, {
        method: "GET",
        headers: {"Content-Type": 'application/json', "Authorization": `Bearer ${access_token}`}
      });

      const result = await response.json();
      if(result.status == 'success'){
        setRouteData(result.data);
        setIsSearching(false);
        console.log(result)
      }else{
        console.log(result);
      }
    }

    useEffect(()=>{
      getAllRoutes();
    }, []);

    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => setIsOpen(!isOpen);

    const [isLoading, setIsLoading] = useState(false);
    const [routeName, setRouteName] = useState('');
    const [selectDriver, setSelectDriver] = useState('');
    const submitData = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      const api = `${process.env.NEXT_PUBLIC_API_URL}/routes/add/`;

      const coordinates = wayPointList.map(location => location.coordinates);
      const data = {
        route_name: routeName,
        driver: selectDriver,
        coordinates: coordinates,
      }
      const response = await fetch(api, {
        method: "POST",
        headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${access_token}`},
        body: JSON.stringify(data)
      });

      const result = await response.json();
      if(result.status == 'success'){
        toast.success(result.message, toastconfig);
      }else{
        toast.error(result.message, toastconfig);
      }

      setIsLoading(false);
      setIsOpen(!isOpen)
    }

    return<>
     <ToastContainer />
        {isLoading? <Loading text={text.Routes.addRoute.loading} /> : ''}
     <MapRoutes setwaypointlist={setWayPointList} />
     <header className="border-b border-grey bg-white">
        <div className="mx-auto max-w-screen-xl py-4">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                {text.Routes.header}
              </h1>

              <p className="mt-1.5 text-sm text-gray-500">
                {text.Routes.subheader}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button
                className="flex gap-2 items-center rounded bg-primary px-5 py-3 text-sm font-medium text-white transition hover:bg-primary-hover focus:outline-none focus:ring"
                type="button"
                onClick={toggleAccordion}
              >
                <CgAdd />
                {text.Routes.add}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Accordion body */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mx-auto w-full bg-background-hover p-4"
          >
            <form onSubmit={submitData} className="bg-background-hover p-4 rounded-md">
              <Input 
                label={text.Routes.addRoute.routelabel} 
                icon={<AiFillFileAdd />} 
                placeholder={text.Routes.addRoute.routeplaceholder}
                onchange={setRouteName}
                />

              <Select  
                key={driverList.length}  
                icon={<BsFillPersonBadgeFill />} 
                list={driverList}
                onchange={setSelectDriver} 
                holder={text.Routes.addRoute.selectPlaceHolder}
                label={text.Routes.addRoute.selectLabel} />

              <label className='mb-[10px] mt-2 block text-base font-medium text-dark dark:text-white'>
                {text.Routes.addRoute.waypoints}
                </label>
              <div className="border border-1 overflow-y-auto border-black rounded w-full h-[30vh] mt-4">
              <ul>
                {wayPointList.map((list, index)=>(
                    <li key={index}  className="block text-primary hover:text-white hover:bg-primary-hover rounded-lg px-4 py-2 transition-colors duration-300">Waypoint({index + 1}): {list.placename}</li>
                ))}
                </ul>

              </div>
              <div className="w-full flex justify-end mt-4">
                  <button type="submit" className="flex gap-2 items-center rounded bg-primary px-5 py-3 text-sm font-medium text-white transition hover:bg-primary-hover focus:outline-none focus:ring"><MdOutlineSend />{text.Routes.addRoute.submit}</button>
                </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {isSearching ? <Searching text={text.Routes.searching} /> : <Table col={routeCol} data={routeData} />}
     </>
}

export default Routes;