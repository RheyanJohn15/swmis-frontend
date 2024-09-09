const TextArea = ({label, placeholder, icon, onchange}) => {
    return (
      <>
        <label className='mb-[10px] block text-base font-medium text-dark dark:text-white'>
        {label}
        </label>
        <div className='relative'>
          <textarea
            type='email'
            rows='6'
            required
            onChange={(e) => onchange(e.target.value)}
            placeholder={placeholder}
            className='w-full bg-transparent rounded-md border border-stroke dark:border-dark-3 p-3 pl-12 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2'
          />
          <span className='absolute text-2xl text-grey/60 top-[18px] left-4'>
           {icon}
          </span>
        </div>
      </>
    )
  }

  export default TextArea