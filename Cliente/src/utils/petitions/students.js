import { MESSAGES_TYPES, notify, confirmDelete } from "../helpers";
import { useStore } from "../../store/store";
import { api } from '../../api'
import { HttpStatusCode } from "axios";

const store = useStore();

export const createStudent = async (student = {}) => {
    const { data, status } = await api.post('/students/create', student);

    if (status >= HttpStatusCode.BadRequest) {
        notify(data.message, MESSAGES_TYPES.ERROR);
        return { ok: false };
    }

    notify(data.message);
    store.students.push(data.data);
    return { ok: true };

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

    const isOk = await confirmDelete();

    if (!isOk) return;

    const { data, status } = await api.delete(`/students/delete/${studentId}`);

    if (status >= 400) {
        notify(data.message, MESSAGES_TYPES.ERROR);
        return;
    }

    const newStudents = store.students.filter(student => student.nControl != studentId);
    console.log(newStudents);
    store.students = [...newStudents];

    notify(data.message);
}

export const updateStudent = async (student) => {

    const { data, status } = await api.put(`/students/update/${student.nControl}`, student);

    if (status >= HttpStatusCode.BadRequest) {
        notify(data.message, MESSAGES_TYPES.ERROR);
        return { ok: false };
    }

    const studentIndex = store.students.findIndex(s => s.nControl == student.nControl);
    store.students[studentIndex] = student;
    notify(data.message);
    return { ok: true };
}