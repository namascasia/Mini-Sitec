import { HttpStatusCode } from "axios";
import { api } from "../../api";
import { useStore } from "../../store/store";
import { MESSAGES_TYPES, notify } from "../helpers";

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
    console.log('here');
    if (status >= HttpStatusCode.BadRequest) {
        notify(data.message, MESSAGES_TYPES.ERROR);
        return { ok: false };
    }

    store.subjects.push(data.data);
    notify(data.message);
    return { ok: true };
}
