import { PersonalDetailsMTFormInterface } from "@/interfaces/appointment";
import * as yup from "yup";
import "yup-phone-lite";
import { Button, Input } from "./../material-tailwind-export/MaterialTailwindExport";
import { FieldError, FieldErrorsImpl, Merge, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Typography } from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/20/solid";
import { isDate, differenceInYears } from "date-fns";

interface PersonalDetailsForm {
  handleFormSubmit: (personalDetails: PersonalDetailsMTFormInterface) => void;
}

const personalDetailsFormSchema: yup.ObjectSchema<PersonalDetailsMTFormInterface> = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .test('maxChar', 'Must not exceed 40 characters', val => val.length <= 41),
  middleName: yup
    .string()
    .test('maxChar', 'Must not exceed 40 characters', val => val === undefined || val.length <= 41),
  lastName: yup
    .string()
    .required('Last name is required')
    .test('maxChar', 'Must not exceed 40 characters', val => val.length <= 41),
  dateOfBirth: yup.object().shape({
    day: yup
      .number()
      .required(),
    month: yup
      .number()
      .required(),
    year: yup
      .number()
      .required()
  })
  .test('validDate', 'Date of birth is an invalid date', val => {
    const { day, month, year } = val;
    if (!day || !month || !year) { //all 3 must not be null or empty
      return false;
    }
    
    if (day < 1 || day > 31) { //day must be between 1 to 31
      return false;
    }
    if (month < 1 || month > 12) { //month must be between 1 to 12
      return false;
    }
    if (year < 1990) {//year must not be lesser than 1990
      return false;
    }

    //age must not be lesser than 1 year old
    const dateValue = new Date(year, month - 1, day);
    const currentDate = new Date();
    const validMinimumAge = differenceInYears(currentDate, dateValue) >= 1;
    if (!validMinimumAge) {
      return false;
    }

    //must be a valid date
    return isDate(dateValue);
  }),
  phoneNumber: yup
    .string()
    .phone("PH", "Must be a valid Philippine phone number")
    .required("Phone number is required"),
  sex: yup
    .string()
    .required("Gender is required")
    .oneOf(['Male', 'Female', 'Others']),
  honeyPotEmail: yup
    .string()
});

export default function PersonalDetailsForm({handleFormSubmit}: PersonalDetailsForm) {

  const {
    register: registerPersonalDetails,
    handleSubmit: handleSubmitPersonalDetails,
    formState: { errors: errorsPersonalDetails},
    reset: resetPersonalDetails
  } = useForm<PersonalDetailsMTFormInterface>({
    resolver: yupResolver(personalDetailsFormSchema),
  });

  const submit: SubmitHandler<PersonalDetailsMTFormInterface> = async (personalDetails) => {
    const isValid = await personalDetailsFormSchema.isValid(personalDetails);
    if (isValid) {
      handleFormSubmit(personalDetails);
    }
  }

  const getDateOfBirthErrorMessage = (dateOfBirth: Merge<FieldError, FieldErrorsImpl>) => {
    console.log(dateOfBirth);
  }

  return (
    <form className="flex flex-col space-y-4" onSubmit={handleSubmitPersonalDetails(submit)}>
      {/* This is for the bot */}
      <div className="hidden">
        <label htmlFor="honeyPotEmail">Email</label>
        <input 
          id="honeyPotEmail" 
          type="email" 
          autoComplete="off" 
          {...registerPersonalDetails("honeyPotEmail")}
        />
      </div>
      <div>
        <Input 
          label="First Name" 
          {...registerPersonalDetails("firstName")}
        />
        {errorsPersonalDetails && errorsPersonalDetails.firstName && (
          <Typography variant="small" color="red" className="flex items-center gap-1 font-normal mt-2">
            <InformationCircleIcon className="w-4 h-4 -mt-px" />
            {errorsPersonalDetails.firstName.message}
          </Typography>
        )}
      </div>
      <div>
        <Input 
          label="Middle Name" 
          {...registerPersonalDetails("middleName")}
        />
        {errorsPersonalDetails && errorsPersonalDetails.middleName && (
          <Typography variant="small" color="red" className="flex items-center gap-1 font-normal mt-2">
            <InformationCircleIcon className="w-4 h-4 -mt-px" />
            {errorsPersonalDetails.middleName.message}
          </Typography>
        )}
      </div>
      <div>
        <Input 
          label="Last Name" 
          {...registerPersonalDetails("lastName")}
        />
        {errorsPersonalDetails && errorsPersonalDetails.lastName && (
          <Typography variant="small" color="red" className="flex items-center gap-1 font-normal mt-2">
            <InformationCircleIcon className="w-4 h-4 -mt-px" />
            {errorsPersonalDetails.lastName.message}
          </Typography>
        )}
      </div>
      <div>
        <div className="flex space-x-2">
          <div>
            <Input 
              label="Day" 
              maxLength={2}
              {...registerPersonalDetails("dateOfBirth.day")}
            />
          </div>
          <div>
            <Input 
              label="Month" 
              maxLength={2}
              {...registerPersonalDetails("dateOfBirth.month")}
            />
          </div>
          <div>
            <Input 
              label="Year" 
              maxLength={4}
              {...registerPersonalDetails("dateOfBirth.year")}
            />
            {/* {errorsPersonalDetails?.dateOfBirth?.year?.message &&  (
              <Typography variant="small" color="red" className="flex items-center gap-1 font-normal mt-2">
                <InformationCircleIcon className="w-4 h-4 -mt-px" />
                {errorsPersonalDetails?.dateOfBirth?.year?.message}
              </Typography>
            )} */}
          </div>
        </div>
        {errorsPersonalDetails?.dateOfBirth?.message && (
          <Typography variant="small" color="red" className="flex items-center gap-1 font-normal mt-2">
            <InformationCircleIcon className="w-4 h-4 -mt-px" />
            {getDateOfBirthErrorMessage(errorsPersonalDetails?.dateOfBirth)}
          </Typography>
        )}
      </div>
      <div>
        <Input 
          label="Phone Number" 
          {...registerPersonalDetails("phoneNumber")}
        />
        {errorsPersonalDetails && errorsPersonalDetails.phoneNumber && (
          <Typography variant="small" color="red" className="flex items-center gap-1 font-normal mt-2">
            <InformationCircleIcon className="w-4 h-4 -mt-px" />
            {errorsPersonalDetails.phoneNumber.message}
          </Typography>
        )}
      </div>
      <div className="flex justify-between">
        <Button type="submit">
          Next
        </Button>
      </div>
    </form>
  );
}