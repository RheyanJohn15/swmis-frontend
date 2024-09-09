"use client";

import { MdSend } from "react-icons/md"; 
import { BiMessageAltEdit } from "react-icons/bi"; 
import { MdOutlineReportProblem } from "react-icons/md"; 
import { AiOutlinePhone } from "react-icons/ai"; 
import { BsFillPersonFill } from "react-icons/bs"; 
import text from "@/Components/text";
import Image from "next/image";
import Input from "@/Components/Parts/Input";
import { useState } from "react";
import Loading from "@/Components/Page/Loading";
import TextArea from "@/Components/Parts/TextArea";
import { toastconfig, access_token } from "@/Components/Parts/Configs";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {

  const [complainantName, setComplainantName] = useState('');
  const [contact, setContact] = useState('');
  const [nature, setNature] = useState('');
  const [remark, setRemark] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const api = `${process.env.NEXT_PUBLIC_API_URL}/complaints/sendmessage/`;

    const data = {
      complainant: complainantName,
      contact: contact,
      nature: nature,
      remark: remark
    };
    const response = await fetch(api, {
      method: "POST",
      headers: {"Content-Type": 'application/json', "Authorization": `Bearer ${access_token}`},
      body: JSON.stringify(data)
    });

    if(!response.ok){
      setIsLoading(false);
      toast.error(response.message, toastconfig);
    }
    const result =  await response.json();

    if(result.status == 'success'){
      toast.success(result.message, toastconfig);
    }else{
      toast.error(result.message, toastconfig);
    }

    setIsLoading(false);
  }

  const options = [
    'Missed Collection',
    'Late Irregular Service',
    'Improper Handling of waste',
    'Overfilled Bins or Dumpsters',
    'Unclean Service',
    'Noise Complaints',
    'Missorted Waste',
    'Non-compliance with Special Waste Services',
    'Bin Request or Replacement issue',
    'Unpleasant Odor',
    'Route Issue',
    'Poor Customer Service'
  ]
  return (
    <div className="w-full h-auto flex flex-col p-8 justify-center items-center">
      <ToastContainer />
    {isLoading ? <Loading text={text.Complaints.form.loading} /> : ''}
    <section className="text-black h-screen">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
          <Image
            className="object-cover object-center rounded"
            alt="logo"
            src="/Logo/logo.png"
            width={700}
            height={700}
          />
        </div>
        <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-black">
           {text.App}
          </h1>
          <p className="mb-8 leading-relaxed">
            {text.intro}
          </p>
          <div className="flex justify-center">
            <button className="inline-flex text-white bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-primary-hover rounded text-lg">
              Browse
            </button>
          </div>
        </div>
      </div>
    </section>

    <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-col text-center w-full mb-20">
      <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">{text.feat.header}</h1>
      <p className="lg:w-2/3 mx-auto leading-relaxed text-base">{text.feat.subheader}</p>
    </div>
    <div className="flex flex-wrap">
      <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
        <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">{text.feat.f1}</h2>
        <p className="leading-relaxed text-base mb-4">{text.feat.f1sub}</p>
      </div>
      <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
        <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">{text.feat.f2}</h2>
        <p className="leading-relaxed text-base mb-4">{text.feat.f2sub}</p>
      </div>
      <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
        <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">{text.feat.f3}</h2>
        <p className="leading-relaxed text-base mb-4">{text.feat.f3sub}</p>
      </div>
      <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
        <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">{text.feat.f4}</h2>
        <p className="leading-relaxed text-base mb-4">{text.feat.f4sub}</p>
      </div>
    </div>

  </div>
</section>

       <div className="w-full h-[90vh] rounded-md bg-white  shadow-md">
        <div className=" border-b-2 flex w-full justify-between">
          <div className="p-8">
            <h1 className="text-black text-2xl font-bold">{text.Complaints.header}</h1>
            <p className="text-grey">{text.Complaints.subheader}</p>
          </div>

        </div>
        <form onSubmit={sendMessage} className="w-full px-4 flex mt-8">
            <div className="w-1/2 px-4">
                <Input 
                  label={text.Complaints.form.name}
                  icon={<BsFillPersonFill />}
                  placeholder={text.Complaints.form.nameHolder}
                  onchange={setComplainantName}
                  />

          <label className='mb-[10px] block mt-4 text-base font-medium text-dark dark:text-white'>
            {text.Complaints.form.nature}
          </label>
        <div className='relative z-20'>
          <span className='absolute text-2xl text-grey/60 top-1/2 left-4 -translate-y-1/2'>
       <MdOutlineReportProblem />
          </span>
          <select 
            onChange={(e)=> setNature(e.target.value)}
            required 
            className='relative z-20 w-full appearance-none rounded-md border border-stroke dark:border-dark-3 bg-transparent py-[10px] px-12 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2'>
            <option value='' disabled selected className='dark:bg-dark-2'>{text.Complaints.form.natureHolder}</option>
          {options.map((data, index) => (
            <option key={index} value={data} className='dark:bg-dark-2'>
                {data}
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
      
            </div>
            <div className="w-1/2 px-4">
              <Input 
                  label={text.Complaints.form.contact}
                  icon={<AiOutlinePhone />}
                  placeholder={text.Complaints.form.contactHolder}
                  onchange={setContact}
                  />
                <div className="mt-4">
                <TextArea 
                  icon={<BiMessageAltEdit />} 
                  label={text.Complaints.form.remark} 
                  placeholder={text.Complaints.form.remarkHolder}
                  onchange={setRemark} />
                </div>
                <button className="flex float-right mt-4 gap-2 items-center text-white bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-primary-hover rounded text-lg">
               <MdSend /> {text.Complaints.form.submit}
            </button> 
            </div>    
          </form>
       </div>
    </div>
  );
}
