import { AiOutlineUser } from "react-icons/ai"; 
const Input = ({label, icon, placeholder, onchange}) => {
    return (
      <>
        <label className='mb-[10px] mt-2 block text-base font-medium text-dark dark:text-white'>
          {label}
        </label>
        <div className='relative'>
          <input
            type='text'
            onChange={(e)=> onchange(e.target.value)}
            required
            placeholder={placeholder}
            className='w-full bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] pr-3 pl-12 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2'
          />
          <span className='absolute text-2xl text-grey/60 top-1/2 left-4 -translate-y-1/2'>
           {icon}
          </span>
        </div>
      </>
    )
  }

  export default Input;