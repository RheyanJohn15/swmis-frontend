"use client";
import { AiOutlinePlus } from "react-icons/ai"; 
import { FiTruck } from "react-icons/fi"; 
import { BsPersonAdd } from "react-icons/bs"; 
import text from "../text";
import Modal from "../Parts/Modal";
import { useState } from "react";
const TruckAndDriver = () =>{

    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [title, setTitle] = useState('');
    return (
      <>
          <div className="overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
            <div className="flex-row items-center justify-between p-4 space-y-3 sm:flex sm:space-y-0 sm:space-x-4">
              <div>
                <h5 className="mr-3 font-semibold dark:text-white">{text.truck_drivers.header}</h5>
                <p className="text-gray-500 dark:text-gray-400">{text.truck_drivers.subheader}</p>
              </div>
             <div className="flex gap-4">
             <button type="button" onClick={()=>{setModalOpen(true); setModalContent(<Driver />); setTitle(text.truck_drivers.addDriver)}}
                      className="flex items-center gap-2 justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary hover:bg-primary-hover focus:ring-4 focus:ring-secondary  focus:outline-none dark:focus:ring-primary-hover">
                 <BsPersonAdd />
                {text.truck_drivers.addDriver}
              </button>
             <button type="button" onClick={()=>{setModalOpen(true); setModalContent(<Truck />); setTitle(text.truck_drivers.addTruck)}}
                      className="flex items-center gap-2 justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary hover:bg-primary-hover focus:ring-4 focus:ring-secondary  focus:outline-none dark:focus:ring-primary-hover">
                 <FiTruck />
                {text.truck_drivers.addTruck}
              </button>
             </div>
            </div>
          </div>
          <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} content={modalContent} title={title} />
      </>
    )
}

const Driver = () => {

    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [license, setLicense] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    
    const addDriver = (e) => {
        e.preventdefault();
    }
    return (<div className="p-8">
            <form onSubmit={addDriver}>
                <div className="grid gap-4 mb-4 sm:grid-cols-2">
                    <div>
                        <label for="fname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{text.truck_drivers.addDModal.fname}</label>
                        <input type="text"  onChange={()=>setFname((e)=> e.target.value)} id="fname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder={text.truck_drivers.addDModal.fname} required="" />
                    </div>
                    <div>
                        <label for="lname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{text.truck_drivers.addDModal.lname}</label>
                        <input type="text"  onChange={()=>setLname((e)=> e.target.value)} id="lname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder={text.truck_drivers.addDModal.lname} required="" />
                    </div>
                    <div>
                        <label for="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{text.truck_drivers.addDModal.username}</label>
                        <input type="text"  onChange={()=>setUsername((e)=> e.target.value)} id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder={text.truck_drivers.addDModal.username} required="" />
                    </div>
                    <div>
                        <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{text.truck_drivers.addDModal.password}</label>
                        <input type="password"  onChange={()=>setPassword((e)=> e.target.value)} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder={text.truck_drivers.addDModal.password} required="" />
                    </div>
                    <hr className="border-1 border-grey col-span-2 my-4" />
                    <div>
                        <label for="license" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{text.truck_drivers.addDModal.license}</label>
                        <input type="text"  onChange={()=>setLicense((e)=> e.target.value)} id="license" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder={text.truck_drivers.addDModal.license} required="" />
                    </div>
                    <div>
                        <label for="contact" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{text.truck_drivers.addDModal.contact}</label>
                        <input type="text"  onChange={()=>setContact((e)=> e.target.value)} id="contact" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder={text.truck_drivers.addDModal.contact} required="" />
                    </div>
                    <div className="sm:col-span-2">
                        <label for="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address{text.truck_drivers.addDModal.address}</label>
                        <input type="text" id="address"  onChange={()=>setAddress((e)=> e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder={text.truck_drivers.addDModal.address} required="" />
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

const Truck = () => {
    const [model, setModel] = useState('');
    const [plateNum, setPlateNum] = useState('');
    const [canCarry, setCanCarry] = useState('');
    const [driver, setDriver] = useState('');

    const addTruck = (e) => {
        e.preventdefault()
    }

    return (<div className="p-8">
        <form onSubmit={addTruck}>
                  <div className="grid gap-4 mb-4 sm:grid-cols-2">
                      <div>
                          <label for="model" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{text.truck_drivers.addTModal.model}</label>
                          <input type="text" onChange={()=>setModel((e)=> e.target.value)} id="model" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder={text.truck_drivers.addTModal.model} required="" />
                      </div>
                      <div>
                          <label for="plate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{text.truck_drivers.addTModal.plate}</label>
                          <input type="text"  onChange={()=>setPlateNum((e)=> e.target.value)} id="plate" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder={text.truck_drivers.addTModal.plate} required="" />
                      </div>
                      <div>
                          <label for="capacity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{text.truck_drivers.addTModal.carry}</label>
                          <input type="text" id="capacity"  onChange={()=>setCanCarry((e)=> e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder={text.truck_drivers.addTModal.carry} required="" />
                      </div>
                      <div>
                          <label for="assigned" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{text.truck_drivers.addTModal.driver}</label>
                          <select id="assigned"  onChange={()=>setDriver((e)=> e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                              <option selected="">Select category</option>
                              <option value="TV">TV/Monitors</option>
                              <option value="PC">PC</option>
                              <option value="GA">Gaming/Console</option>
                              <option value="PH">Phones</option>
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