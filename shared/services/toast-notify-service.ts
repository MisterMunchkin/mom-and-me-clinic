import { toast } from "react-toastify"

const notifyWarning = (toastId: string, message: string) => 
  toast(message, {
    toastId: toastId,
    type: 'warning',
    theme: 'colored'
  });

const notifyError = (toastId: string, message: string) => 
  toast(message, {
    toastId: toastId,
    type: 'error',
    theme: 'colored'
  });

const notifySuccess = (toastId: string, message: string) => 
  toast(message, {
    toastId: toastId,
    type: 'success',
    theme: 'colored'
  });

const dismiss = (toastId?: string) => 
  toast.dismiss(toastId)

export const toastNotifyService = {
  notifyWarning,
  notifyError,
  notifySuccess,
  dismiss
}