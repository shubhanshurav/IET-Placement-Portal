// const BASE_URL = process.env.REACT_APP_BASE_URL;
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000/api/v1";

export const addStudentEndpoints = {
    ADDSTUDENT_API: BASE_URL + "/placed",
}