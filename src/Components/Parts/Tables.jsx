import { BsFillTrashFill } from "react-icons/bs";
import { BsFillEyeFill } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';


const Table = ({data, col}) => {

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
           <button onClick={()=>alert(row.original.id)} class="border border-danger text-danger hover:bg-danger hover:text-white transition-colors duration-300 px-4 py-2 rounded">
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

  return <MaterialReactTable
  table={table}
  />;
};

export default Table;