import Image from "next/image";
import Link from "next/link";
import PasskeyModal from "@/components/PassKeyModal";
import { PatientForm } from "@/components/forms/PatientForm";

type SearchParamProps = {
  searchParams: {
    admin: string;
  };
};

const Home = ({ searchParams }: SearchParamProps) => {
  const isAdmin = searchParams?.admin === "true";

  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PasskeyModal />}

      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <h1 className="text-xl font-bold text-dark-800 mb-10">
          <span className="text-green-500">Sağlık Merkezi</span> Randevu Sistemi
          </h1>
          

          <PatientForm />

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 text-sm xl:text-left">
              © 2025 Copyright
            </p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>

      <Image
        src="/assets/images/onboarding-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[50%]"
      />
    </div>
  );
};

export default Home;