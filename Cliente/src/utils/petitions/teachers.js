import { HttpStatusCode } from "axios";
import { api } from "../../api";
import { useStore } from '../../store/store';
import { MESSAGES_TYPES, confirm, notify } from "../helpers";
import { STATUS } from "../constants/status.contants";

const store = useStore();

export const getTeachers = async () => {
    const { data, status } = await api.get('/teachers/get');

    if (status >= 400) {
        notify(data.message, MESSAGES_TYPES.ERROR);
        return;
    }

    store.teachers = [...data.data];
}

export const createTeacher = async (teacher = {}) => {
    const { data, status } = await api.post('/teachers/create', teacher);

    if (status === HttpStatusCode.Created) {
        notify(data.message);
        store.teachers.push(data.data);
        return { ok: true };
    }

    notify(data.message, MESSAGES_TYPES.ERROR);
    return { ok: false }
}

export const deleteTeacher = async (teacherId) => {

    const isOk = await confirm('maestro');

    if (!isOk) return;

    const { data, status } = await api.delete(`/teachers/delete/${teacherId}`);

    if (status >= HttpStatusCode.BadRequest) {
        notify(data.message, MESSAGES_TYPES.ERROR);
        return { ok: false };
    }

    const teacherIndex = store.teachers.findIndex(teacher => teacher.id === teacherId);
    store.teachers[teacherIndex].status = STATUS.DELETED;
    notify(data.message, MESSAGES_TYPES.INFO);
}