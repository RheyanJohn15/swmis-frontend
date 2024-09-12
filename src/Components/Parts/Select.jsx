import { useEffect, useState } from "react";
const Select = ({icon, list, holder, label, onchange, value = null}) => {

    const [options, setOptions] = useState([]);
    useEffect(() => {
        setOptions(list);
    }, [list]);

    return (
      <>
        <label className='mb-[10px] block mt-2 text-base font-medium text-dark dark:text-white'>
          {label}
        </label>
        <div className='relative z-20'>
          <span className='absolute text-2xl text-grey/60 top-1/2 left-4 -translate-y-1/2'>
          {icon}
          </span>
          <select 
            onChange={(e)=> onchange(e.target.value)}
            required 
            value={value}
            className='relative z-20 w-full appearance-none rounded-md border border-stroke dark:border-dark-3 bg-transparent py-[10px] px-12 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2'>
            <option value='' disabled selected className='dark:bg-dark-2'>{holder}</option>
            {options.map((data, index) => (
            <option selected={value === data.id} key={index} value={data.id} className='dark:bg-dark-2'>
              {data.first_name + ' ' + data.last_name}
            </option>
          ))}
          </select>
          <span className='absolute top-1/2 right-4 z-10 -translate-y-1/2'>
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity={0.8}>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                  fill="#9CA3AF"
                />
              </g>
            </svg>
          </span>
        </div>
      </>
    )
  }

  export default Select