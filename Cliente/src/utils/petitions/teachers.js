import { api } from "../../api";
import { useStore } from '../../store/store';
import { MESSAGES_TYPES, notify } from "../helpers";

const store = useStore();

export const getTeachers = async () => {
    const { data, status } = await api.get('/teachers/get');

    if (status >= 400) {
        notify(data.message, MESSAGES_TYPES.ERROR);
        return;
    }

    store.teachers = [...data.data];
}