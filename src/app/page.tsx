"use client";
import Image from "next/image";
import PasskeyModal from "@/components/PassKeyModal";
import { PatientForm } from "@/components/forms/PatientForm";
import { useState } from "react";
import { LoginForm } from "@/components/forms/LoginForm";
import React from "react";
import { Button } from "@/components/ui/button";


const Home = () => {

  const [isLogin,setIsLogin]=useState(true);
  const [adminModalOpen, setAdminModalOpen] = useState(false);

  return (
    <div className="flex h-screen max-h-screen">
      {adminModalOpen && <PasskeyModal adminModalOpen={adminModalOpen} />}

      <section className="remove-scrollbar container my-auto md:w-1/2 lg:w-1/3">
        <div className="sub-container max-w-[496px]">
          <h1 className="text-xl font-bold text-dark-800 mb-10">
          <span className="text-green-500">Sağlık Merkezi</span> Randevu Sistemi
          </h1>
          
          {isLogin ? (
              <LoginForm setIsLogin={setIsLogin}/>
          ):(
              <PatientForm setIsLogin={setIsLogin} />
          )}

          

          <div className="text-14-regular mt-20 flex justify-between">
            <p></p>
            
            <Button variant={'link'} onClick={()=>{setAdminModalOpen(true)}} className="text-green-500">
              Admin
            </Button>
          </div>
        </div>
      </section>

      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="xs:hidden md:block side-img max-w-[50%]"
      />
    </div>
  );
};

export default Home;