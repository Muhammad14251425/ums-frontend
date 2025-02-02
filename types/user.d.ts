type UserRole = {
    userRoleId: number;
    roleName: string;
};

export type User = {
    uuid: string;
    fullName: string;
    userName: string;
    userEmail: string;
    userPhone: string;
    gender: "Male" | "Female" | "Other"; // Assuming fixed gender options
    age: number;
    userRole: UserRole;
};

type SeasonModel = {
    seasonId: number;
    seasonName: string;
};

type Semester = {
    semesterId: number;
    semesterName: string;
    seasonModel: SeasonModel;
    semesterYear: number;
    startDate: string; // ISO date string
    endDate: string;   // ISO date string
};

export type StudentData = {
    uuid: string;
    studentId: string;
    studentName: string;
    departmentName: string;
    enrollmentYear: string; // Can be Date if you parse it
    semester: Semester;
    cgpa: number;
};
