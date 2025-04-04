"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl } from "@/components/ui/form";
import { createUser, getPatient, registerPatient } from "@/lib/actions/patient";
import { UserFormValidation } from "@/lib/validation";

import "react-phone-number-input/style.css";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import SubmitButton from "../SubmitButton";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { GenderOptions } from "@/lib/constants";

interface LoginFormProps {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PatientForm = ({ setIsLogin }: LoginFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      privacyConsent:false,
      gender:"male"
    },
  });

  const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true);

    try {
      const user = { name: values.name, email: values.email, phone: values.phone};
      
      const newUser = await createUser(user);

      if (!newUser) {
        throw new Error("user could not created");     
      }
      const existingPatient=await getPatient(newUser.$id)

      if(existingPatient){
        router.push(`/patient/${newUser.$id}/new-appointment`);
        return;
      }

      const patient={name: values.name, email: values.email, phone: values.phone, userId:newUser.$id, privacyConsent:values.privacyConsent,gender:values.gender}

      const newPatient = await registerPatient(patient);

      if (newPatient) {
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
          <p className="text-dark-700">Randevu Almak için Kayıt Olmanız Gereklidir</p>
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

        <CustomFormField
          fieldType={FormFieldType.SKELETON}
          control={form.control}
          name="gender"
          label="Cinsiyet"
          renderSkeleton={(field) => (
            <FormControl>
              <RadioGroup className="flex h-11 gap-6 justify-start " onValueChange={field.onChange} defaultValue={field.value} >
                {GenderOptions.map((option, i) => (
                  <div key={option + i} className="radio-group">
                    <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option} className="cursor-pointer">
                        {option=="male" ? 'Erkek': 'Kadın'}
                      </Label>
                  </div>
                ))}
              </RadioGroup>
              </FormControl>
            )}
          />

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="privacyConsent"
            label="Gizlilik Sözleşmesini Okudum ve Kabul Ediyorum"
          />

        <SubmitButton isLoading={isLoading}>Kayıt Ol</SubmitButton>

        <button onClick={()=>setIsLogin((prev)=>!prev)} className="text-sm cursor-pointer">Zaten Hesabın Var mı ? <span className="font-semibold underline">Giriş Yap</span></button>
   
      </form>
    </Form>
  );
};
