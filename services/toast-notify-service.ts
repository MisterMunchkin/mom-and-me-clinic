import { toast } from "react-toastify"

const notifyWarning = (toastId: string, message: string) => 
  toast(message, {
    toastId: toastId,
    type: 'warning',
    theme: 'colored'
  });

export const toastNotifyService = {
  notifyWarning
}