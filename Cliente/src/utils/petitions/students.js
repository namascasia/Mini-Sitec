import { MESSAGES_TYPES, notify } from "../helpers/notify";
import { useStore } from "../../store/store";
import { api } from '../../api'
import Swal from "sweetalert2";

const store = useStore();

export const createStudent = async (student = []) => {

    const newStudent = {
        nControl: student[0].value,
        name: student[1].value,
        career: student[2].value,
        status: student[3].value
    }
    try {
        const { data, message } = await api.post('/students/create', newStudent);
        notify(message);
        store.students.push(data.data);
    } catch (error) {
        const { response } = error;
        notify(response.data.message, MESSAGES_TYPES.ERROR);
    }

}

export const getStudents = async () => {
    const { data, status } = await api.get('/students/get');

    if (status >= 400) {
        notify(data.message, MESSAGES_TYPES.ERROR);
        return;
    }

    store.students = [...data.data];
    notify(data.message);
}

export const deleteStudent = async (studentId) => {

    const { isConfirmed } = await Swal.fire({
        title: 'Borrado',
        text: '¿Estas seguro de querer borrar a este estudiante?',
        icon: 'warning',
        showConfirmButton: true,
        confirmButtonText: 'Si',
        showCancelButton: true,
        cancelButtonText: 'No'
    });


    if (!isConfirmed) return;

    const { data, status } = await api.delete(`/students/delete/${studentId}`);

    if (status >= 400) {
        notify(data.message, MESSAGES_TYPES.ERROR);
        return;
    }

    const index = store.students.findIndex(student => student.nControl === studentId);
    store.students[index].status = 'B';

    notify(data.message, MESSAGES_TYPES.INFO);
}