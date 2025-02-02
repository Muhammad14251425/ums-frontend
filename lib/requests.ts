'use server'

import { StudentData } from "@/types/user";
import axios from "axios";

export async function getStudentDetails(user: string) {
    const response = await axios.get(`https://still-atoll-25843-bcb87143defc.herokuapp.com/students/uid/${user}`);
    const data: StudentData = response.data;
    return data;
}

type passwordData = {
    email: string,
    oldPassword: string,
    newPassword: string,
}

export async function forgotPassword(data: passwordData) {
    try {
        const res = await axios.put('https://still-atoll-25843-bcb87143defc.herokuapp.com/forgotpass', data);

        if (res.status === 200) {
            return res.data; // Return user object if credentials are correct
        }

    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                // API responded with an error (e.g., 400, 401, etc.)
                return {
                    error: error.response.data?.message || "Invalid credentials"
                };
            } else if (error.request) {
                // No response from server
                return {
                    error: "No response from server. Please try again."
                };
            }
        }

        return {
            error: "Internal server error"
        };
    }
}
