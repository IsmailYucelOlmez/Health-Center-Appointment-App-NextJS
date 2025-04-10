import { DataTable } from '@/components/DataTable'
import Link from 'next/link'
import React from 'react'
import { Doctorcolumns } from '@/components/TableColumns';
import { getTodayAppointments } from '@/lib/actions/appointment';


const TodayAppointments =async () => {

    const appointments = await getTodayAppointments();

  return (
    <div className="mx-auto flex justify-center max-w-7xl flex-col space-y-14">
      <header className="sticky top-3 z-20 mx-3 flex items-center justify-start gap-6 rounded-2xl bg-dark-200 px-[5%] py-5 mb-10 shadow-lg xl:px-12">
            
        <Link href="/">
            <h1 className="text-xl font-bold text-dark-800">
                <span className="text-green-500">Sağlık Merkezi</span> Randevu Sistemi
            </h1>
        </Link>
        <p className="text-16-semibold">Today&apos;s Appointments</p>
            
      </header>

      <DataTable columns={Doctorcolumns} data={appointments} />
      
    </div>
  )
}

export default TodayAppointments
