import Image from "next/image";

import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { SearchParamProps } from "../../../../../types";
import { getPatient } from "@/lib/actions/patient";

const NewAppointment = async ({ params }: SearchParamProps) => {
  
  const { userId } = await params
  const patient = await getPatient(userId);

  return (
    <div className="flex justify-between h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <h1 className="text-xl font-bold text-dark-800 mb-10">
            <span className="text-green-500">Sağlık Merkezi</span> Randevu Sistemi
          </h1>

          <AppointmentForm
            patientId={patient?.$id}
            userId={userId}
            type="create"
          />

          
        </div>
      </section>

      <Image
        src="/assets/images/appointment-img.png"
        height={1500}
        width={1500}
        alt="appointment"
        className="side-img xs:max-w-[390px] lg:max-w-[900px] bg-bottom"
      />
    </div>
  );
};

export default NewAppointment;
