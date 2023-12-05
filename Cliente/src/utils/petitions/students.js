import { MESSAGES_TYPES, notify, confirm } from "../helpers";
import { useStore } from "../../store/store";
import { api } from '../../api'

const store = useStore();

export const createStudent = async (student = []) => {

    const newStudent = {
        nControl: student[0].value,
        name: student[1].value,
        career: student[2].value,
        status: student[3].value
    }
    try {
        const { data } = await api.post('/students/create', newStudent);
        notify(data.message);
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
}

export const deleteStudent = async (studentId) => {

    const isOk = await confirm();

    if (!isOk) return;

    const { data, status } = await api.delete(`/students/delete/${studentId}`);

    if (status >= 400) {
        notify(data.message, MESSAGES_TYPES.ERROR);
        return;
    }

    const index = store.students.findIndex(student => student.nControl === studentId);
    store.students[index].status = 'B';

    notify(data.message, MESSAGES_TYPES.INFO);
}