import { api } from '../../api';
import { MESSAGES_TYPES, confirmDelete, notify } from '../helpers'
import { useStore } from '../../store/store';
import { HttpStatusCode } from 'axios';

const store = useStore();

export const getGroups = async () => {
    const { data, status } = await api.get('/groups/get');

    if (status >= HttpStatusCode.BadRequest) {
        notify(data.message, MESSAGES_TYPES.ERROR);
        return;
    }

    store.groups = data.data;
}

export const createGroup = async (group) => {

    const newGroup = {
        ...group,
        schedules: [
            group.schedule,
            group.schedule,
            group.schedule,
            group.schedule,
            group.schedule
        ]
    };

    const { data, status } = await api.post('/groups/create', newGroup);
    if (status >= HttpStatusCode.BadRequest) {
        notify(data.message, MESSAGES_TYPES.ERROR);
        return { ok: false };
    }

    store.groups.push(data.data);
    notify(data.message);
    return { ok: true };
}

export const updateGroup = async (group, groupId) => {

    const newGroup = {
        ...group,
        schedules: [
            group.schedule,
            group.schedule,
            group.schedule,
            group.schedule,
            group.schedule
        ]
    };

    const { data, status } = await api.put(`/groups/update/${groupId}`, newGroup);

    if (status >= HttpStatusCode.BadRequest) {
        notify(data.message, MESSAGES_TYPES.ERROR);
        return { ok: false };
    }

    const groupIndex = store.groups.findIndex(({ id }) => id == group.id);
    store.groups[groupIndex] = data.data;
    notify(data.message);
    return { ok: true };

}

export const inscribe = async (groupId) => {
    const { data, status } = await api.put(`/groups/inscribe/${groupId}`);

    if (status >= HttpStatusCode.BadRequest) {
        notify(data.message, MESSAGES_TYPES.ERROR);
        return { ok: false };
    }

    return { ok: true };
}

export const dismissInscribe = async (groupId) => {
    const { data, status } = await api.put(`/groups/dismiss-inscribe/${groupId}`);

    if (status >= HttpStatusCode.BadRequest) {
        notify(data.message, MESSAGES_TYPES.ERROR);
        return { ok: false };
    }

    return { ok: true };
}

export const deleteGroup = async (groupId) => {

    const isOk = await confirmDelete('grupo');

    if (!isOk) return;

    const { data, status } = await api.delete(`/groups/delete/${groupId}`);

    if (status >= HttpStatusCode.BadRequest) {
        notify(data.message, MESSAGES_TYPES.ERROR);
        return { ok: false };
    }

    const newGroups = store.groups.filter(group => group.id !== groupId);
    store.groups = newGroups;
    notify(data.message);
    return { ok: true };
}