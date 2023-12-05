import axios from "axios";
import { useToast } from "vue-toastification";

export const createStudent = async (student = []) => {

    const toast = useToast();

    const newStudent = {
        nControl: student[0].value,
        name: student[1].value,
        career: student[2].value,
        status: student[3].value
    }
    try {
        const resp = await axios.post('http://localhost:3000/api/students/create', newStudent);
        toast(resp.data.message);
    } catch (error) {
        console.log(error);
        const { response } = error;
        toast.error(response.data.message);
    }

}