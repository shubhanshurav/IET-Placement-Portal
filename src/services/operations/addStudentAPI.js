import { toast } from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { addStudentEndpoints } from "../apis"

const {
    ADDSTUDENT_API,
} = addStudentEndpoints;

export const getAllStudents = async() => {
    const toastId = toast.loading("Loading...")
    let result = []  
    try {
      const response = await apiConnector("GET", ADDSTUDENT_API)
      if (!response?.data?.success) {
        throw new Error("Could Not Fetch Students Details")
      }
      result = response?.data?.data
    } catch (error) {
      console.log("GET_ALL_Students_API API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}