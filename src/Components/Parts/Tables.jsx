import { RiDeleteBin2Line } from "react-icons/ri";
import { BsFillTrashFill } from "react-icons/bs";
import { BsFillEyeFill } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { useEffect, useMemo } from 'react';
import { AiOutlinePlus } from "react-icons/ai";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Loading from "../Page/Loading";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastconfig } from "./Configs";
import { useState } from "react";
import ContentViewer from "./ContentViewer";
import text from "../text";
import { AnimatePresence, motion } from "framer-motion";

const Table = ({ data, col, deletingText = null, updateData = null, type }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [updateContent, setUpdateContent] = useState(null);

  const setUpdateContentModal = (modalType, id)=>{
    switch(modalType){
      case "driver":
        setUpdateContent(<DriverUpdate id={id} closeModal={setIsOpenUpdateModal} />);
        break;
      case "truck":
        setUpdateContent(<TruckUpdate id={id} closeModal={setIsOpenUpdateModal} />)
        break;
    }
  }


  const handleDelete = (dataId, deleteLink) => {
    confirmAlert({
      customUI: ({ onClose }) => {

        const deleteData = async (id, link) => {
          setIsLoading(true);
          const api = `${process.env.NEXT_PUBLIC_API_URL}/${link}`;
          const access_token = typeof window !== "undefined" ? window.sessionStorage.getItem('accessAuth') : null;
          const response = await fetch(api, {
            method: "POST",
            headers: {
              'Content-Type': "application/json",
              'Authorization': `Bearer ${access_token}`
            }, body: JSON.stringify({ id: id })
          });

          const data = await response.json();
          onClose();
          setIsLoading(false)
          if (data.status == 'success') {
            updateData(data.data);
            toast.success(data.message, toastconfig)
          } else {
            toast.error(data.message, toastconfig)
          }

        }
        return (
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 mx-auto flex justify-center flex-col items-center text-center">
            <h1 className="text-primary text-6xl font-bold"> <RiDeleteBin2Line /></h1>
            <h2 className="text-primary text-2xl mb-4 font-semibold">Confirm Delete</h2>
            <p className="text-grey mb-6">Are you sure you want to delete this item?</p>
            <div className="flex justify-around gap-4 w-full">
              <button
                onClick={onClose}
                className="bg-secondary hover:bg-secondary-hover w-full text-white font-bold py-2 px-4 rounded-lg"
              >
                No
              </button>

              <button
                onClick={() => {
                  deleteData(dataId, deleteLink)
                  onClose();
                }}
                className="bg-danger hover:bg-danger-hover w-full text-white font-bold py-2 px-4 rounded-lg"
              >
                Yes
              </button>
            </div>
          </div>
        );
      },
    });
  };

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  useEffect(() => {
    if (isDrawerOpen == false) {
      setSelectedId(null);
    }
  }, [isDrawerOpen]);
  const actionColumn = useMemo(
    () => ({
      id: 'actions',
      accessorKey: 'actions',
      header: 'Actions',
      Cell: ({ row }) => {
        return (
          <div className="flex gap-2">
            {type !== 'complaints' ? <button onClick={() => { setIsOpenUpdateModal(true); setUpdateContentModal(type, row.original.id) }} class="border border-success text-success hover:bg-success hover:text-white transition-colors duration-300 px-4 py-2 rounded">
              <BiEdit />
            </button> : ''}

            <button onClick={() => { setIsDrawerOpen(true); setSelectedId(row.original.id) }} class="border border-info text-info hover:bg-info hover:text-white transition-colors duration-300 px-4 py-2 rounded">
              <BsFillEyeFill />
            </button>

            {type !== 'complaints' ? <button onClick={() => handleDelete(row.original.id, row.original.deletelink)} class="border border-danger text-danger hover:bg-danger hover:text-white transition-colors duration-300 px-4 py-2 rounded">
              <BsFillTrashFill />
            </button> : ''}


          </div>
        );
      },
    }),
    []
  );

  const columns = useMemo(
    () => [...col, actionColumn],
    [col]
  );


  const table = useMaterialReactTable({
    columns,
    data,
    state: {
      columnOrder: [...col.map(c => c.accessorKey || c.id), 'actions'], // Force actions column to be last
    },
  });

  return <>
    {isLoading ? <Loading text={deletingText} /> : ''}
    <MaterialReactTable
      table={table}
    />


    {
      selectedId != null ?
        <ContentViewer
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
          type={type}
          selectedId={selectedId}
        />
        :
        ''
    }


    <UpdateModal isOpen={isOpenUpdateModal} setIsOpen={setIsOpenUpdateModal}>
      {updateContent}
    </UpdateModal>
  </>;
};

const UpdateModal = ({ isOpen, setIsOpen, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-black/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white text-white p-6 rounded-lg w-[60vw] h-auto shadow-xl cursor-default relative overflow-hidden"
          >
            {children}
            {/* <div className="relative z-10 border border-1">
              <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-indigo-600 grid place-items-center mx-auto">
                <FiAlertCircle />
              </div>
              <h3 className="text-3xl font-bold text-center mb-2">
                One more thing!
              </h3>
              <p className="text-center mb-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
                aperiam vitae, sapiente ducimus eveniet in velit.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                >
                  Nah, go back
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded"
                >
                  Understood!
                </button>
              </div>
            </div> */}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const DriverUpdate = ({id, closeModal}) => {
  const [isLoading, setLoading] = useState(false);

  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [username, setUsername] = useState('');
  const [license, setLicense] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  
  const getDriver = async () => {
    const api = `${process.env.NEXT_PUBLIC_API_URL}/truckdriver/driverdetail/`;
    const accessAuth = window.sessionStorage.getItem('accessAuth');
    const response = await fetch(api, {
      method: "POST",
      headers:{"Content-Type": "application/json", "Authorization": `Bearer ${accessAuth}`},
      body: JSON.stringify({id:id})
    });

    const result = await response.json();

    return result.data;
  }

  useEffect(()=> {
    getDriver().then((data)=>{
      console.log(data);
        setFname(data.first_name);
        setLname(data.last_name);
        setUsername(data.username);
        setLicense(data.license);
        setContact(data.contact);
        setAddress(data.address);
    });
  },[])

  const updateDriver = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
        id: id,
        fname: fname,
        lname: lname,
        username: username,
        license: license,
        contact: contact,
        address: address,
    }

    const accessAuth = window.sessionStorage.getItem('accessAuth');

    const api  = `${process.env.NEXT_PUBLIC_API_URL}/truckdriver/updatedriver/`;
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
    closeModal(false);

    if(result.status == 'success'){
        toast.success(result.message,toastconfig);
        currentData.push(result.data);
        updateData(currentData);
    }else{
        toast.error(result.message, toastconfig);
    }

}

  return (
  <>  
  {isLoading ? <Loading text={text.truck_drivers.addDModal.updating} /> : null}
    <form onSubmit={updateDriver} className="w-full p-8" >
      <div className="grid gap-4 mb-4 sm:grid-cols-2">
        <div>
          <label for="fname" className="block mb-2 text-sm font-medium text-black dark:text-white">{text.truck_drivers.addDModal.fname}</label>
          <input type="text"  value={fname}  onChange={(e) => setFname(e.target.value)} id="fname" className="bg-black-50 border border-black text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-black-700 dark:border-black-600 dark:placeholder-black-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder={text.truck_drivers.addDModal.fname} required />
        </div>
        <div>
          <label for="lname" className="block mb-2 text-sm font-medium text-black dark:text-white">{text.truck_drivers.addDModal.lname}</label>
          <input type="text" value={lname} onChange={(e) => setLname(e.target.value)} id="lname" className="bg-black-50 border border-black text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-black-700 dark:border-black-600 dark:placeholder-black-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder={text.truck_drivers.addDModal.lname} required />
        </div>
        <div className="sm:col-span-2">
          <label for="username" className="block mb-2 text-sm font-medium text-black dark:text-white">{text.truck_drivers.addDModal.username}</label>
          <input type="text"  value={username}  onChange={(e) => setUsername(e.target.value)} id="username" className="bg-black-50 border border-black text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-black-700 dark:border-black-600 dark:placeholder-black-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder={text.truck_drivers.addDModal.username} required />
        </div>
      
        <hr className="border-1 border-grey col-span-2 my-4" />
        <div>
          <label for="license" className="block mb-2 text-sm font-medium text-black dark:text-white">{text.truck_drivers.addDModal.license}</label>
          <input type="text"  value={license}  onChange={(e) => setLicense(e.target.value)} id="license" className="bg-black-50 border border-black text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-black-700 dark:border-black-600 dark:placeholder-black-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder={text.truck_drivers.addDModal.license} required />
        </div>
        <div>
          <label for="contact" className="block mb-2 text-sm font-medium text-black dark:text-white">{text.truck_drivers.addDModal.contact}</label>
          <input type="text"  value={contact}  onChange={(e) => setContact(e.target.value)} id="contact" className="bg-black-50 border border-black text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-black-700 dark:border-black-600 dark:placeholder-black-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder={text.truck_drivers.addDModal.contact} required />
        </div>
        <div className="sm:col-span-2">
          <label for="address" className="block mb-2 text-sm font-medium text-black dark:text-white">{text.truck_drivers.addDModal.address}</label>
          <input type="text"  value={address}  id="address" onChange={(e) => setAddress(e.target.value)} className="bg-black-50 border border-black text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-black-700 dark:border-black-600 dark:placeholder-black-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder={text.truck_drivers.addDModal.address} required />
        </div>
      </div>
      <div className="flex justify-end w-full">
        <button type="submit" className="text-white inline-flex items-center bg-primary hover:bg-primary-hover focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
          <AiOutlinePlus />
          {text.truck_drivers.addDModal.update}
        </button>
      </div>
    </form>
    </>
  )
}

const TruckUpdate = ({id, closeModal}) => {
  const [model, setModel] = useState('');
  const [plateNum, setPlateNum] = useState('');
  const [canCarry, setCanCarry] = useState('');
  const [driver, setDriver] = useState('');

  const [driverList, setDriverList] = useState([]);
  const accessAuth = window.sessionStorage.getItem('accessAuth');

  const [isLoading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');

  return (
    <form className="w-full p-8">
      <div className="grid gap-4 mb-4 sm:grid-cols-2">
        <div>
          <label for="model" className="block mb-2 text-sm font-medium text-black dark:text-white">{text.truck_drivers.addTModal.model}</label>
          <input type="text" onChange={(e) => setModel(e.target.value)} id="model" className="bg-black-50 border border-black text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-black-700 dark:border-black-600 dark:placeholder-black-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder={text.truck_drivers.addTModal.model} required />
        </div>
        <div>
          <label for="plate" className="block mb-2 text-sm font-medium text-black dark:text-white">{text.truck_drivers.addTModal.plate}</label>
          <input type="text" onChange={(e) => setPlateNum(e.target.value)} id="plate" className="bg-black-50 border border-black text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-black-700 dark:border-black-600 dark:placeholder-black-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder={text.truck_drivers.addTModal.plate} required />
        </div>
        <div>
          <label for="capacity" className="block mb-2 text-sm font-medium text-black dark:text-white">{text.truck_drivers.addTModal.carry}</label>
          <input type="text" id="capacity" onChange={(e) => setCanCarry(e.target.value)} className="bg-black-50 border border-black text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-black-700 dark:border-black-600 dark:placeholder-black-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder={text.truck_drivers.addTModal.carry} required />
        </div>
        <div>
          <label for="assigned" className="block mb-2 text-sm font-medium text-black dark:text-white">{text.truck_drivers.addTModal.driver}</label>
          <select id="assigned" required onChange={(e) => setDriver(e.target.value)} className="bg-black-50 border border-black text-black text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-black-700 dark:border-black-600 dark:placeholder-black-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
            <option selected disabled value="">------Select driver------</option>
            {driverList.map((list, index) => (
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
  )
}

export default Table;