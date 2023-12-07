import { api } from '../../api';
import { MESSAGES_TYPES, confirm, notify } from '../helpers'
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
            group.scheduleMonday,
            group.scheduleTuesday,
            group.scheduleWednesday,
            group.scheduleThursday,
            group.scheduleFriday
        ]
    };

    const { data, status } = await api.post('/groups/create', newGroup);
    console.log(data);
    if (status >= HttpStatusCode.BadRequest) {
        notify(data.message, MESSAGES_TYPES.ERROR);
        return { ok: false };
    }

    store.groups.push(group);
    notify(data.message);
    return { ok: true };
}

export const updateGroup = async (group) => {

    const newGroup = {
        ...group,
        schedules: [
            group.scheduleMonday,
            group.scheduleTuesday,
            group.scheduleWednesday,
            group.scheduleThursday,
            group.scheduleFriday
        ]
    };

    const { data, status } = await api.put(`/groups/update/${group.id}`, newGroup);

    if (status >= HttpStatusCode.BadRequest) {
        notify(data.message, MESSAGES_TYPES.ERROR);
        return { ok: false };
    }

    const groupIndex = store.groups.findIndex(({ id }) => id == group.id);
    console.log({ groupIndex });
    store.groups[groupIndex] = group;
    notify(data.message);
    return { ok: true };

}

export const deleteGroup = async (groupId) => {

    const isOk = await confirm('grupo');

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