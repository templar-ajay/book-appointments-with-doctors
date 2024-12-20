"use client";
import axios from "axios";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:80";

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
});

export const createDoctor = async ({
  username,
  first_name,
  last_name,
  email,
}: {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
}) => {
  try {
    const response = await axiosInstance.post("/doctors", {
      username,
      first_name,
      last_name,
      email,
    });

    return response;
  } catch (error: any) {
    return error?.response;
  }
};

export const deleteDoctor = async ({ id }: { id: string }) => {
  try {
    const response = await axiosInstance.delete("/doctors/" + id);

    return response;
  } catch (error: any) {
    return error?.response;
  }
};

export const getAllDoctors = async () => {
  try {
    const response = await axiosInstance.get("/doctors");

    return response;
  } catch (error: any) {
    return error?.response;
  }
};

export const createSlot = async ({
  doctorId,
  start_time,
  end_time,
  duration,
  recurrence: { type, days, end_date },
}: {
  doctorId: string;
  start_time: string;
  end_time: string;
  duration: string | number;
  recurrence: {
    type: "weekly" | "daily" | "one-time";
    days: (
      | "Sunday"
      | "Monday"
      | "Tuesday"
      | "Wednesday"
      | "Thursday"
      | "Friday"
      | "Saturday"
    )[];
    end_date: string;
  };
}) => {
  try {
    const response = await axiosInstance.post(`/doctors/${doctorId}/slots`, {
      start_time,
      end_time,
      duration,
      recurrence: {
        type,
        days,
        end_date,
      },
    });

    return response;
  } catch (error: any) {
    return error?.response;
  }
};

export const getAvailableSlots = async ({
  doctorId,
  date,
}: {
  doctorId: string;
  date?: string;
}) => {
  try {
    const response = await axiosInstance.get(
      `/doctors/${doctorId}/available_slots${date ? "?date=" + date : ""}`
    );

    return response;
  } catch (error: any) {
    return error?.response;
  }
};
