declare type Gender = "male" | "female" | "other";
declare type Status = "pending" | "scheduled" | "cancelled";

declare interface CreateUserParams {
  name: string;
  email: string;
  phone: string;
}
declare interface User extends CreateUserParams {
  $id: string;
}

declare interface RegisterUserParams extends CreateUserParams {
  userId: string;
  gender: Gender;
  privacyConsent: boolean;
}

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare type CreateAppointmentParams = {
  userId: string;
  patient: string;
  primaryPhysician: string;
  schedule: Date;
  status: Status;
};

declare type UpdateAppointmentParams = {
  appointmentId: string;
  userId: string;
  timeZone: string;
  appointment: Appointment;
  type: string;
};

export interface Appointment extends Models.Document {
  $id?:string
  patient: Patient;
  schedule: Date;
  status: Status;
  primaryPhysician: string;
  userId: string;
  cancellationReason: string | null;
}