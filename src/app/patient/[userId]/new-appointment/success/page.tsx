import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Doctors } from "@/lib/constants";
import { getAppointment } from "@/lib/actions/appointment";
import { formatDateTime } from "@/lib/utils";
import { SearchParamProps } from "../../../../../../types";

const RequestSuccess = async ({ searchParams, params: { userId },}: SearchParamProps) => {
  const appointmentId =await (searchParams?.appointmentId as string) || "";
  const appointment = await getAppointment(appointmentId);

  const doctor = Doctors.find(
    (doctor) => doctor.name === appointment.primaryPhysician
  );

  return (
    <div className=" flex h-screen max-h-screen px-[5%] justify-center items-center">
      <div className="success-img flex flex-col justify-center gap-8">
        <Link href="/">
          <h1 className="text-xl font-bold text-dark-800 mb-10">
            <span className="text-green-500">Sağlık Merkezi</span> Randevu Sistemi
          </h1>
        </Link>

        <section className="flex flex-col items-center">
          <Image
            src="/assets/gifs/success.gif"
            height={300}
            width={280}
            alt="success"
          />
          <h2 className="header mt-6 mb-2 max-w-[600px] text-center text-lg font-semibold">
          <span className="text-green-500">Randevu </span>isteğiniz gönderilmiştir
          </h2>
          <p className="text-sm">İlerleyen dakikalarda onaylanacaktır</p>
        </section>

        <section className="flex flex-col justify-center gap-2">
          <p className="text-sm">Randevu Detayları</p>
          <div className="flex items-center gap-3">
            <Image
              src="/assets/icons/user.svg"
              height={24}
              width={24}
              alt="user"
            />
            <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
          </div>
          <div className="flex gap-2">
            <Image
              src="/assets/icons/calendar.svg"
              height={24}
              width={24}
              alt="calendar"
            />
            <p> {formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>

        <Button  className="bg-green-500 text-white hover:text-slate-700" asChild>
          <Link href={`/patients/${userId}/new-appointment`}>
            Yeni Randevu
          </Link>
        </Button>

      </div>
    </div>
  );
};

export default RequestSuccess;