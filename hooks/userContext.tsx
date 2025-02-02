'use client'
import { getStudentDetails } from "@/lib/requests";
import { StudentData, User } from "@/types/user";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

type UserContextType = {
    user: User | null;
    setUser: (user: User) => void;
    clearUser: () => void;
    studentData: StudentData | null;
};


const UserContext = createContext<UserContextType | undefined>(undefined);


export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUserState] = useState<User | null>(null);
    const [studentData, setStudentData] = useState<StudentData | null>(null);

    useEffect(() => {
        if (user?.uuid && user.userRole.roleName === "Student") {
            async function getData() {
                const data = await getStudentDetails(user?.uuid!)
                setStudentData(data);
            }
            getData()
        }
    }, [user])

    const setUser = (newUser: User) => setUserState(newUser);
    const clearUser = () => setUserState(null);

    return (
        <UserContext.Provider value={{ studentData, user, setUser, clearUser }}>
            {children}
        </UserContext.Provider>
    );
};


export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
