import { getMyAppointments } from '@/lib/actions/appointment';
import React from 'react'
import {  Patientcolumns } from "@/components/TableColumns";
import { SearchParamProps } from '../../../../../types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { DataTable } from '@/components/DataTable';

const MyAppointments = async({params}:SearchParamProps) => {

  const { userId } = await params

  const appointments = await getMyAppointments(userId);

  return (
    <div className="mx-auto flex justify-center max-w-7xl flex-col space-y-14">
        <header className='flex justify-between items-center gap-6 rounded-2xl bg-dark-200 px-[5%] py-5 mb-10 shadow-lg xl:px-12'>
            <div className='flex justify-start items-center gap-6'>
                <Link href="/">
                <h1 className="text-xl font-bold text-dark-800">
                    <span className="text-green-500">Sağlık Merkezi</span> Randevu Sistemi
                </h1>
                </Link>
                <p className="text-16-semibold">Randevularım</p>
            </div>

            <Button  className="bg-green-500 text-white hover:text-slate-700" asChild>
                <Link href={`/patients/${userId}/new-appointment`}> Yeni Randevu </Link>
            </Button>
            
        </header>

        <DataTable data={appointments.documents} columns={Patientcolumns}/>
        
    </div>
  )
}

export default MyAppointments
