"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { createUser } from "@/lib/actions/patient";
import { UserLoginFormValidation } from "@/lib/validation";

import "react-phone-number-input/style.css";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import SubmitButton from "../SubmitButton";

interface LoginFormProps {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoginForm = ({ setIsLogin }: LoginFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UserLoginFormValidation>>({
    resolver: zodResolver(UserLoginFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof UserLoginFormValidation>) => {
    setIsLoading(true);

    try {
      const user = { name: values.name, email: values.email, phone: values.phone};
      
      const newUser = await createUser(user);

      if (!newUser) {
        throw new Error("user could not created");     
      }

      if (newUser) {
        router.push(`/patient/${newUser.$id}/new-appointment`);
      }

      
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <section className="mb-12 space-y-4">
          <p className="text-dark-700">Giriş Yaparak Randevu Alabilirsiniz</p>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="İsim - Soyisim"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="johndoe@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />

        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Telefon Numarası"
          placeholder="(555) 123-4567"
        />
          
        <SubmitButton isLoading={isLoading}>Giriş Yap</SubmitButton>

        <button onClick={()=>setIsLogin((prev)=>!prev)} className="text-sm cursor-pointer">Hesabın Yok mu ? <span className="font-semibold underline">Kaydol</span></button>
      </form>
    </Form>
  );
};
