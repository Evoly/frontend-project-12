import { toast } from 'react-toastify';

export const toastPromise = (promise, message) => {
  return toast.promise(promise, {
    pending: {
      render() {
        return message.loading;
      },
    },
    success: {
      render() {
        return message.success || 'Channel created!';
      },
    },
    error: {
      render() {
        return message.error;
      },
    },
  });
};