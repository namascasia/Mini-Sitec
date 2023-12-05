import { useToast } from 'vue-toastification';

export const MESSAGES_TYPES = {
    SUCCESS: 'success',
    ERROR: 'error',
    INFO: 'info'
}

export const notify = (message, type = 'success') => {
    const toast = useToast();

    if (type === MESSAGES_TYPES.SUCCESS) {
        toast.success(message, { timeout: 2000 });
    }

    if (type === MESSAGES_TYPES.ERROR) {
        toast.error(message, { timeout: 2000 });
    }

    if (type === MESSAGES_TYPES.INFO) {
        toast.info(message, { timeout: 2000 });
    }
};