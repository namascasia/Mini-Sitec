import { api } from "../../api"
import { MESSAGES_TYPES, notify } from "../helpers";

export const getTeachers = async () => {
    const { data, status } = await api.get('/subjects/get');

    if (status >= 400) {
        notify(data.message, MESSAGES_TYPES.ERROR);
        return;
    }

    store.teachers = [...data.data];
}