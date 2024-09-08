"use client";

import text from "@/Components/text";
import Image from "next/image";
import Input from "@/Components/Parts/Input";
import Select from "@/Components/Parts/Select";
export default function Home() {
  return (
    <div className="w-full h-auto flex flex-col p-8 justify-center items-center">
    
    <section className="text-black h-screen">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
          <Image
            className="object-cover object-center rounded"
            alt="logo"
            src="/logo/logo.png"
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
       </div>
    </div>
  );
}
