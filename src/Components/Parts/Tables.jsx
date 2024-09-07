import { RiDeleteBin2Line } from "react-icons/ri"; 
import { BsFillTrashFill } from "react-icons/bs";
import { BsFillEyeFill } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { useMemo } from 'react';
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

const Table = ({data, col, deletingText, updateData}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = (dataId, deleteLink) => {
    confirmAlert({
      customUI: ({ onClose }) => {

        const deleteData = async (id, link)=> {
          setIsLoading(true);
          const accessAuth = window.sessionStorage.getItem('accessAuth');
          const api = `${process.env.NEXT_PUBLIC_API_URL}/${link}`;

          const response = await fetch(api, {
             method:"POST",
             headers:{
              'Content-Type': "application/json",
              'Authorization': `Bearer ${accessAuth}`
             }, body: JSON.stringify({id:id})
          });
          
          const data = await response.json();
          onClose();
          setIsLoading(false)
          if(data.status == 'success'){
            updateData(data.data);
            toast.success(data.message, toastconfig)
          }else{
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

  const actionColumn = useMemo(
    () => ({
      id: 'actions',
      accessorKey: 'actions',
      header: 'Actions',
      Cell: ({ row }) => {
        console.log(row);
        return (
          <div className="flex gap-2">
            <button onClick={()=>alert(row.original.id)} class="border border-success text-success hover:bg-success hover:text-white transition-colors duration-300 px-4 py-2 rounded">
               <BiEdit />
            </button>
            <button onClick={()=>alert(row.original.id)} class="border border-info text-info hover:bg-info hover:text-white transition-colors duration-300 px-4 py-2 rounded">
              <BsFillEyeFill />
            </button>
           <button onClick={() => handleDelete(row.original.id, row.original.deletelink )} class="border border-danger text-danger hover:bg-danger hover:text-white transition-colors duration-300 px-4 py-2 rounded">
           <BsFillTrashFill />
         </button>
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
  </>;
};

export default Table;