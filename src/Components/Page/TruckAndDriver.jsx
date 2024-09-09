"use client";
import { AiOutlinePlus } from "react-icons/ai"; 
import { FiTruck } from "react-icons/fi"; 
import { BsPersonAdd } from "react-icons/bs"; 
import text from "../text";
import Modal from "../Parts/Modal";
import { useState, useEffect } from "react";
import Loading from "./Loading";
import Table from "../Parts/Tables";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastconfig, access_token } from "../Parts/Configs";
const TruckAndDriver = () =>{

    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [title, setTitle] = useState('');
    const [driverList, setDriverList] = useState([]);
    const [truckList, setTruckList] = useState([]);

    useEffect(() =>{
        const truckApi = "truckdriver/listtruck";
        const driverApi = "truckdriver/listdriver";

        Promise.all([
            getList(access_token, truckApi),
            getList(access_token, driverApi)
          ])
          .then(([truckListData, driverListData]) => {
            setDriverList(driverListData);
            setTruckList(truckListData);

            console.log("Truck: " + driverListData);
          })
          .catch(error => {
            console.error('Error fetching lists:', error);
          });

    }, []);
    
    const getList = async (accessAuth, apiRoute) => {
        const api = `${process.env.NEXT_PUBLIC_API_URL}/${apiRoute}`;

        const response = await fetch(api, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessAuth}`,
            },
        });

        if(!response.ok){
            throw new Error("Network response was not ok");
        }

        const result = await response.json();

        return result.data;
    }

    
    const driverColumn = [
        {
          accessorKey: 'first_name', 
          header: 'First Name',
          size: 150,
        },
        {
          accessorKey: 'last_name',
          header: 'Last Name',
          size: 150,
        },
        {
          accessorKey: 'address',
          header: 'Address',
          size: 200,
        },
        {
          accessorKey: 'license',
          header: 'License',
          size: 150,
        },
        {
            accessorKey: 'contact',
            header: 'Contact',
            size: 150,
          },
          
    ];

    const truckColumn = [
        {
          accessorKey: 'model', 
          header: 'Model',
          size: 150,
        },
        {
          accessorKey: 'plate_num',
          header: 'Plate Number',
          size: 150,
        },
        {
          accessorKey: 'can_carry',
          header: 'Capacity',
          size: 200,
        },
        {
          accessorKey: 'driver',
          header: 'Driver',
          size: 150,
        },
          
    ];

    const tableType = [
        {
            name: "Driver List",
            value: 'driver',
        },
        {
            name: "Truck List",
            value: 'truck',
        },
    ]

    const [selectedType, setSelectedType] = useState('driver');

    return (
      <>
       <ToastContainer  className="z-[99999999999999999]" />

          <div className="overflow-hidden bg-white shadow-md dark:bg-black-800 sm:rounded-lg">
            <div className="flex-row items-center justify-between p-4 space-y-3 sm:flex sm:space-y-0 sm:space-x-4">
              <div>
                <h5 className="mr-3 font-semibold text-black">{text.truck_drivers.header}</h5>
                <p className="text-black-500 dark:text-black-400">{text.truck_drivers.subheader}</p>
              </div>
             <div className="flex gap-4">
             <button type="button" onClick={()=>{setModalOpen(true); setModalContent(<Driver currentData={driverList} updateData={setDriverList} setModalOpen={setModalOpen} />); setTitle(text.truck_drivers.addDriver)}}
                      className="flex items-center gap-2 justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary hover:bg-primary-hover focus:ring-4 focus:ring-secondary  focus:outline-none dark:focus:ring-primary-hover">
                 <BsPersonAdd />
                {text.truck_drivers.addDriver}
              </button>
             <button type="button" onClick={()=>{setModalOpen(true); setModalContent(<Truck currentData={truckList} updateData={setTruckList} setModalOpen={setModalOpen} />); setTitle(text.truck_drivers.addTruck)}}
                      className="flex items-center gap-2 justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary hover:bg-primary-hover focus:ring-4 focus:ring-secondary  focus:outline-none dark:focus:ring-primary-hover">
                 <FiTruck />
                {text.truck_drivers.addTruck}
              </button>
             </div>
            </div>
            <ul className="mb-4 px-4 flex gap-4 w-full">
                {
                    tableType.map((item, idx) => (
                        <li key={idx}>
                            <label htmlFor={item.name} className="block relative">
                                <input id={item.name} type="radio" onChange={()=>{setSelectedType(item.value)}} defaultChecked={idx == 0 ? true : false} name="payment" class="sr-only peer" />
                                <div className="w-full p-5 cursor-pointer rounded-lg border bg-white shadow-sm ring-primary peer-checked:ring-2 duration-200">
                                    <div className="pl-7">
                                        <h3 className="leading-none text-secondary font-medium">
                                            {item.name}
                                        </h3>
                                       
                                    </div>
                                </div>
                                <span className="block absolute top-5 left-5 border peer-checked:border-[5px] peer-checked:border-primary w-4 h-4 rounded-full">
                                </span>
                            </label>
                        </li>
                    ))
                }
            </ul>

            {selectedType == 'driver' ?  (<Table
                data={driverList}
                col={driverColumn}
                deletingText={text.truck_drivers.addDModal.deleting}
                updateData={setDriverList}
            />) :
            (<Table
            data={truckList}
            col={truckColumn}
            deletingText={text.truck_drivers.addTModal.deleting}
            updateData={setTruckList}
        />)}
            

          </div>
          <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} content={modalContent} title={title} />
      </>
    )
}

const Driver = ({currentData, updateData, setModalOpen}) => {

    const [isLoading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState('');

    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [license, setLicense] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    
    const addDriver = async (e) => {
        e.preventDefault();
        setLoading(true);
        setLoadingText(text.truck_drivers.addDModal.loading);
        const data = {
            fname: fname,
            lname: lname,
            username: username,
            password: password,
            license: license,
            contact: contact,
            address: address,
        }

        const accessAuth = window.sessionStorage.getItem('accessAuth');

        const api  = `${process.env.NEXT_PUBLIC_API_URL}/truckdriver/adddriver/`;
        const response = await fetch(api, {
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${accessAuth}`
            },
            body: JSON.stringify(data)
        });

      

        if(!response.ok){
            setLoading(false);
            toast.error(response.message, toastconfig);
        }

        const result = await response.json();
        setLoading(false);

        setModalOpen(false);

        if(result.status == 'success'){
            toast.success(result.message,toastconfig);
            currentData.push(result.data);
            updateData(currentData);
        }else{
            toast.error(result.message, toastconfig);
        }

    }

   

    return (<div className="p-8">
        {isLoading ? <Loading text={loadingText} /> : null}
            <form onSubmit={addDriver}>
                <div className="grid gap-4 mb-4 sm:grid-cols-2">
                    <div>
                        <label for="fname" className="block mb-2 text-sm font-medium text-black dark:text-white">{text.truck_drivers.addDModal.fname}</label>
                        <input type="text"  onChange={(e)=>setFname(e.target.value)} id="fname" className="bg-black-50 border border-black text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-black-700 dark:border-black-600 dark:placeholder-black-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder={text.truck_drivers.addDModal.fname} required />
                    </div>
                    <div>
                        <label for="lname" className="block mb-2 text-sm font-medium text-black dark:text-white">{text.truck_drivers.addDModal.lname}</label>
                        <input type="text"  onChange={(e)=>setLname(e.target.value)} id="lname" className="bg-black-50 border border-black text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-black-700 dark:border-black-600 dark:placeholder-black-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder={text.truck_drivers.addDModal.lname} required />
                    </div>
                    <div>
                        <label for="username" className="block mb-2 text-sm font-medium text-black dark:text-white">{text.truck_drivers.addDModal.username}</label>
                        <input type="text"  onChange={(e)=>setUsername(e.target.value)} id="username" className="bg-black-50 border border-black text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-black-700 dark:border-black-600 dark:placeholder-black-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder={text.truck_drivers.addDModal.username} required />
                    </div>
                    <div>
                        <label for="password" className="block mb-2 text-sm font-medium text-black dark:text-white">{text.truck_drivers.addDModal.password}</label>
                        <input type="password"  onChange={(e)=>setPassword(e.target.value)} id="password" className="bg-black-50 border border-black text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-black-700 dark:border-black-600 dark:placeholder-black-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder={text.truck_drivers.addDModal.password} required />
                    </div>
                    <hr className="border-1 border-grey col-span-2 my-4" />
                    <div>
                        <label for="license" className="block mb-2 text-sm font-medium text-black dark:text-white">{text.truck_drivers.addDModal.license}</label>
                        <input type="text"  onChange={(e)=>setLicense(e.target.value)} id="license" className="bg-black-50 border border-black text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-black-700 dark:border-black-600 dark:placeholder-black-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder={text.truck_drivers.addDModal.license} required />
                    </div>
                    <div>
                        <label for="contact" className="block mb-2 text-sm font-medium text-black dark:text-white">{text.truck_drivers.addDModal.contact}</label>
                        <input type="text"  onChange={(e)=>setContact(e.target.value)} id="contact" className="bg-black-50 border border-black text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-black-700 dark:border-black-600 dark:placeholder-black-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder={text.truck_drivers.addDModal.contact} required />
                    </div>
                    <div className="sm:col-span-2">
                        <label for="address" className="block mb-2 text-sm font-medium text-black dark:text-white">{text.truck_drivers.addDModal.address}</label>
                        <input type="text" id="address"  onChange={(e)=>setAddress(e.target.value)} className="bg-black-50 border border-black text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-black-700 dark:border-black-600 dark:placeholder-black-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder={text.truck_drivers.addDModal.address} required />
                    </div>
                </div>
                <div className="flex justify-end w-full">
                <button type="submit" className="text-white inline-flex items-center bg-primary hover:bg-primary-hover focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                   <AiOutlinePlus />
                    {text.truck_drivers.addDModal.add}
                </button>
                </div>
            </form>
            </div>)
}

const Truck = ({currentData, updateData, setModalOpen}) => {
    const [model, setModel] = useState('');
    const [plateNum, setPlateNum] = useState('');
    const [canCarry, setCanCarry] = useState('');
    const [driver, setDriver] = useState('');

    const [driverList, setDriverList] = useState([]);
    const accessAuth = window.sessionStorage.getItem('accessAuth');

    const [isLoading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState('');

    const fetchAllDrivers = async ()=> {

        const api = `${process.env.NEXT_PUBLIC_API_URL}/truckdriver/listdriver/`
        const response = await fetch(api, {
            method: "GET",
            headers: {
                'Content-Type': "application/json",
                'Authorization' : `Bearer ${accessAuth}`
            }
        });

        const result = await response.json();

        setDriverList(result.data);
    }
    useEffect(()=> {
       fetchAllDrivers();
    }, []);

  

    const addTruck = async (e) => {
        e.preventDefault();
        setLoading(true);
        setLoadingText(text.truck_drivers.addTModal.loading);
        const data = {
            model: model,
            plate_number: plateNum,
            can_carry: canCarry,
            driver: driver   
        }

        const api = `${process.env.NEXT_PUBLIC_API_URL}/truckdriver/addtruck/`;
        const accessAuth = window.sessionStorage.getItem('accessAuth');
        const response = await fetch(api,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessAuth}`,
            },
            body: JSON.stringify(data)
        });

        if(!response.ok){
            setLoading(false);
            toast.error(response.message, toastconfig);
        }

        const result = await response.json();
        setLoading(false);

        setModalOpen(false);
        
        if(result.status == 'success'){
            toast.success(result.message, toastconfig);
            currentData.push(result.data);

            updateData(currentData);
        }else{
            toast.error(result.message, toastconfig);
        }
    }

    return (<div className="p-8">
      {isLoading ? <Loading text={loadingText} /> : null}
        <form onSubmit={addTruck}>
                  <div className="grid gap-4 mb-4 sm:grid-cols-2">
                      <div>
                          <label for="model" className="block mb-2 text-sm font-medium text-black dark:text-white">{text.truck_drivers.addTModal.model}</label>
                          <input type="text" onChange={(e)=>setModel(e.target.value)} id="model" className="bg-black-50 border border-black text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-black-700 dark:border-black-600 dark:placeholder-black-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder={text.truck_drivers.addTModal.model} required />
                      </div>
                      <div>
                          <label for="plate" className="block mb-2 text-sm font-medium text-black dark:text-white">{text.truck_drivers.addTModal.plate}</label>
                          <input type="text"  onChange={(e)=>setPlateNum(e.target.value)} id="plate" className="bg-black-50 border border-black text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-black-700 dark:border-black-600 dark:placeholder-black-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder={text.truck_drivers.addTModal.plate} required />
                      </div>
                      <div>
                          <label for="capacity" className="block mb-2 text-sm font-medium text-black dark:text-white">{text.truck_drivers.addTModal.carry}</label>
                          <input type="text" id="capacity"  onChange={(e)=>setCanCarry(e.target.value)} className="bg-black-50 border border-black text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-black-700 dark:border-black-600 dark:placeholder-black-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder={text.truck_drivers.addTModal.carry} required />
                      </div>
                      <div>
                          <label for="assigned" className="block mb-2 text-sm font-medium text-black dark:text-white">{text.truck_drivers.addTModal.driver}</label>
                          <select id="assigned" required onChange={(e)=>setDriver(e.target.value)} className="bg-black-50 border border-black text-black text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-black-700 dark:border-black-600 dark:placeholder-black-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                          <option selected disabled value="">------Select driver------</option>
                             {driverList.map((list, index)=> (
                              <option key={index} value={list.id}>{list.first_name} {list.last_name}</option>
                             ))}
                          </select>
                      </div>
                     
                  </div>
                 <div className="flex justify-end w-full">
                 <button type="submit" className="text-white inline-flex items-center bg-primary hover:bg-primary-hover focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                  <AiOutlinePlus />
                  {text.truck_drivers.addTModal.add}
                  </button>
                  </div>
              </form>
              </div>
            )
}

export default TruckAndDriver;