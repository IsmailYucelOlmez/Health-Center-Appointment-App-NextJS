/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { ID, Query } from "node-appwrite";

import {
  DATABASE_ID,
  PATIENT_COLLECTION_ID,
  //PROJECT_ID,
  databases,
  //storage,
  users,
} from "../appwrite.config";
import { CreateUserParams, RegisterUserParams } from "../../../types";


export const createUser = async (user: CreateUserParams) => {
  try {
    
    const newuser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );

    return JSON.parse(JSON.stringify(newuser))
  } catch (error:any) {
    
    if (error && error?.code === 409) {
      const existingUser = await users.list([
        Query.equal("email", [user.email]),
      ]);

      return existingUser.users[0];
    }
    console.error("An error occurred while creating a new user:", error);
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);

    return JSON.parse(JSON.stringify(user))
  } catch (error) {
    console.error(
      "An error occurred while retrieving the user details:",
      error
    );
  }
};

export const registerPatient = async (patient : RegisterUserParams) => {
  try {
    
    const newPatient = await databases.createDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      ID.unique(),      
      patient,
    );

    return JSON.parse(JSON.stringify(newPatient))
  } catch (error) {
    console.error("An error occurred while creating a new patient:", error);
  }
};

export const getPatient = async (userId: string) => {
  try {
    const patients = await databases.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    );

    return  JSON.parse(JSON.stringify(patients.documents[0]))
  } catch (error) {
    console.error(
      "An error occurred while retrieving the patient details:",
      error
    );
  }
};