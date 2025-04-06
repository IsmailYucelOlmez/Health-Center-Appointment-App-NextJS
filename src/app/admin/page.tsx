import Link from "next/link";

import { StatCard } from "@/components/StatusCard";
import { columns } from "@/components/TableColumns";
import { DataTable } from "@/components/DataTable";
import { getRecentAppointmentList } from "@/lib/actions/appointment";
import { Button } from "@/components/ui/button";

const AdminPage = async () => {
  const appointments = await getRecentAppointmentList();

  return (
    <div className="mx-auto flex justify-center max-w-7xl flex-col space-y-14">
      <header className="sticky top-3 z-20 mx-3 flex items-center justify-between gap-6 rounded-2xl bg-dark-200 px-[5%] py-5 mb-10 shadow-lg xl:px-12">
            <div className='flex justify-start items-center gap-6'>
              <Link href="/">
                <h1 className="text-xl font-bold text-dark-800">
                    <span className="text-green-500">Sağlık Merkezi</span> Randevu Sistemi
                </h1>
              </Link>
                <p className="text-16-semibold">Admin Panel</p>
            </div>

            <Button  className="bg-green-500 text-white hover:text-slate-700" asChild>
                <Link href={``}> Today&apos;s Appointment Flow</Link>
            </Button>
      </header>

      <main className="flex flex-col items-center space-y-6 px-[5%] pb-12 xl:space-y-12 xl:px-12">      
        
        <section className="flex w-full flex-col justify-between gap-5 sm:flex-row xl:gap-10">
          <StatCard
            type="appointments"
            count={appointments.scheduledCount}
            label="Scheduled appointments"
            icon={"/assets/icons/appointments.svg"}
          />
          <StatCard
            type="pending"
            count={appointments.pendingCount}
            label="Pending appointments"
            icon={"/assets/icons/pending.svg"}
          />
          <StatCard
            type="cancelled"
            count={appointments.cancelledCount}
            label="Cancelled appointments"
            icon={"/assets/icons/cancelled.svg"}
          />
        </section>

        <DataTable columns={columns} data={appointments.documents} />
      </main>
    </div>
  );
};

export default AdminPage;