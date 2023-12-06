import { MESSAGES_TYPES, notify, confirm } from "../helpers";
import { useStore } from "../../store/store";
import { api } from '../../api'
import { HttpStatusCode } from "axios";

const store = useStore();

export const createStudent = async (student = {}) => {
    const { data, status } = await api.post('/students/create', student);

    if (status == HttpStatusCode.Created) {
        notify(data.message);
        store.students.push(data.data);
        return { ok: true };
    }

    notify(data.message, MESSAGES_TYPES.ERROR);
    return { ok: false };


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

export const updateStudent = async (student) => {

    console.log(student);
    const { data, status } = await api.put(`/students/update/${student.nControl}`, student);

    if (status >= HttpStatusCode.BadRequest) {
        notify(data.message, MESSAGES_TYPES.ERROR);
        return { ok: false };
    }

    const studentIndex = store.students.findIndex(s => s.nControl == student.nControl);
    console.log(store.students[studentIndex]);
    store.students[studentIndex] = student;
    notify(data.message);
    return { ok: true };
}