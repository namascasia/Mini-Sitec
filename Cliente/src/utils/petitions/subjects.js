import { HttpStatusCode } from "axios";
import { api } from "../../api";
import { useStore } from "../../store/store";
import { MESSAGES_TYPES, confirmDelete, notify } from "../helpers";

const store = useStore();

export const getSubjects = async () => {
    const { data, status } = await api.get('/subjects/get');

    if (status >= 400) {
        notify(data.message, MESSAGES_TYPES.ERROR);
        return;
    }

    store.subjects = [...data.data];
}

export const createSubject = async (subject) => {
    const { data, status } = await api.post('/subjects/create', subject);

    if (status >= HttpStatusCode.BadRequest) {
        notify(data.message, MESSAGES_TYPES.ERROR);
        return { ok: false };
    }

    store.subjects.push(data.data);
    notify(data.message);
    return { ok: true };
}

export const updateSubject = async (subject) => {
    const { data, status } = await api.put(`/subjects/update/${subject.id}`, subject);

    if (status >= HttpStatusCode.BadRequest) {
        notify(data.message, MESSAGES_TYPES.ERROR);
        return { ok: false };
    }

    const subjectIndex = store.subjects.findIndex(s => s.id === subject.id);
    store.subjects[subjectIndex] = subject;
    notify(data.message);
    return { ok: true };

}

export const deleteSubject = async (subjectId) => {

    const isOk = await confirmDelete();

    if (!isOk) return;

    const { data, status } = await api.delete(`/subjects/delete/${subjectId}`);

    if (status >= HttpStatusCode.BadRequest) {
        notify(data.message, MESSAGES_TYPES.ERROR);
        return { ok: false };
    }

    const newSubjects = store.subjects.filter(subject => subject.id !== subjectId);
    store.subjects = newSubjects;
    notify(data.message);
    return { ok: true };

}
