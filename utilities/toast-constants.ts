const serviceSelection = {
  noSelectedService: {
    toastId: 'service-invalid',
    message: 'Please select a service to request an appointment'
  }
}

const doctorSelection = {
  noSelectedDoctor: {
    toastId: 'doctor-invalid',
    message: 'Please select a doctor to request an appointment'
  }
}

const visisScheduleSelection = {
  noSelectedVisit: {
    toastId: 'schedule-invalid',
    message: 'Please select a date and time block to schedule an appointment'
  }
}

const confirmationStep = {
  submitError: {
    toastId: 'confirmation-submit-error',
    message: 'An error has ocurred, Please resubmit. If issue persist, contact support.'
  }
}
export const toastConstants = {
  serviceSelection,
  doctorSelection,
  visisScheduleSelection,
  confirmationStep
}