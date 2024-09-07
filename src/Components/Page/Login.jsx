"use client";

import React, { useState } from "react";
import Image from "next/image";
import text from '@/Components/text';
import { ThreeCircles } from "react-loader-spinner";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";


const Login = () => {

  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  
  const login = async (e)=> {
    e.preventDefault();

    setLoading(true);
    setDisable(true)
    
    const myPromise = new Promise(async (resolve, reject) => {
        try{
         const api = `${process.env.NEXT_PUBLIC_API_URL}/user/login/`;

         const data = {
          username: username,
          password: password
         }
         const response = await fetch(api, {
          method: "POST",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data)
         });

         if (!response.ok) {
          const errorResult = await response.json();
          reject(errorResult.message);
          setLoading(false);
          setDisable(false);      
          return;
        }

        const result = await response.json();
        resolve(result.message);

        window.sessionStorage.setItem('accessAuth', result.data.access);
        window.sessionStorage.setItem('user', JSON.stringify(result.data.account));

        router.push('/admin/dashboard');

        }catch(error){
          setLoading(false);
          setDisable(false);
      
          reject(error.message);
        }
    });

 
    toast.promise(
      myPromise,
      {
        pending: {
          render: "Verifying Credentials...",
          position: "top-right",
          autoClose: 3000,
          isLoading: true,
        },
        success: {
          render({ data }) {
            return `Success: ${data}`;
          },
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
        },
        error: {
          render({ data }) {
            return `Error: ${data}`;
          },
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
        },
      }
    );
  }
    return ( <section className="bg-gray-1 h-screen w-full py-8">
        <ToastContainer />
    <div className="container mx-auto overflow-hidden">
      <div className="-mx-4 flex flex-wrap">
        <div className="w-full px-4">
          <div className=" mx-auto overflow-hidden rounded-lg bg-white px-10 py-16 text-center w-full md:w-2/5">
            <div className="mb-10 text-center md:mb-16">
              <Link
                href="/"
                className="mx-auto flex gap-4 items-center flex-col justify-center"
              >
                
                <Image src="/logo/logo.png" width={100} height={100} alt="Logo" />
                <h1 className="text-2xl font-semibold text-primary">{text.Login.title}</h1>
              </Link>
            </div>
            <form onSubmit={login}>
              <InputBox type="text" onChange={(e)=>{setUsername(e.target.value)}} name="username" placeholder={text.Login.username} />
              <InputBox
                type="password"
                onChange={(e)=> setPassword(e.target.value)}
                name="password"
                placeholder={text.Login.password}
              />
              <div className="mb-10">
                <button
                  disabled={disable}
                  type="submit"
                  className="w-full disabled:bg-secondary flex items-center justify-center gap-4 cursor-pointer rounded-md border border-primary bg-primary px-5 py-3 text-base font-medium text-white transition hover:bg-opacity-90"
                >
                  {loading ?
                  (<><ThreeCircles
                    visible={true}
                    height="30"
                    width="30"
                    color="#fff"
                    ariaLabel="three-circles-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    /> <span>Authenticating.....</span></>) : text.Login.button
                }
                 </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  </section>
  );
}
const InputBox = ({ type, placeholder, name, onChange }) => {
    return (
      <div className="mb-6">
        <input
          type={type}
          required
          placeholder={placeholder}
          name={name}
          onChange={onChange}
          className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3"
        />
      </div>
    );
}

export default Login