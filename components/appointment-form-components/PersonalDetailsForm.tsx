import { PersonalDetailsFormInterface } from "@/shared/interfaces/appointment.interface";
import * as yup from "yup";
import "yup-phone-lite";
import { Button } from "../../shared/utilities/material-tailwind-export";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Typography } from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/20/solid";
import { isDate, differenceInYears } from "date-fns";

interface PersonalDetailsForm {
  handleFormSubmit: (personalDetails: PersonalDetailsFormInterface) => void;
  handleBack: (personalDetails: PersonalDetailsFormInterface) => void;
  defaultPersonalDetails: PersonalDetailsFormInterface | undefined
}

const genders = ['Female', 'Male', 'Others'];

const personalDetailsFormSchema: yup.ObjectSchema<PersonalDetailsFormInterface> = yup.object().shape({
  firstName: yup
    .string()
    .required("required")
    .test('maxChar', 'must not exceed 40 characters', val => val.length <= 41),
  middleName: yup
    .string()
    .test('maxChar', 'must not exceed 40 characters', val => val === undefined || val.length <= 41),
  lastName: yup
    .string()
    .required('required')
    .test('maxChar', 'must not exceed 40 characters', val => val.length <= 41),
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
  .test({
    name: 'validBirthdate',
    test: function (birthdate) {
      const { day, month, year } = birthdate;
      if (!day || !month || !year) { //all 3 must not be null or empty
        return this.createError({
          path: 'dateOfBirth',
          message: 'day, month, and year must be set'
        });
      }
      
      if (day < 1 || day > 31) { //day must be between 1 to 31
        return this.createError({
          path: 'dateOfBirth',
          message: 'day must be between 1 to 31'
        });
      }
      if (month < 1 || month > 12) { //month must be between 1 to 12
        return this.createError({
          path: 'dateOfBirth',
          message: 'month must be between 1 to 12'
        });
      }
      if (year < 1900) {//year must not be lesser than 1900
        return this.createError({
          path: 'dateOfBirth',
          message: 'are you a vampire? Please double check the year'
        });
      }

      //age must not be lesser than 1 year old
      const dateValue = new Date(year, month - 1, day);
      const currentDate = new Date();
      const validMinimumAge = differenceInYears(currentDate, dateValue) >= 1;
      if (!validMinimumAge) {
        return this.createError({
          path: 'dateOfBirth',
          message: 'must be atleast 1 year old'
        });
      }

      //must be a valid date
      return (isDate(dateValue)) ? true : this.createError({
        path: 'dateOfBirth',
        message: 'must be a valid date'
      });
    }
  }),
  phoneNumber: yup
    .string()
    .phone("PH", "must be a valid Philippine phone number")
    .required("required"),
  sex: yup
    .string()
    .required("required")
    .oneOf(genders),
  medicalConcern: yup
    .string()
    .required("required"),
  honeyPotEmail: yup
    .string()
});

export default function PersonalDetailsForm({handleFormSubmit, handleBack, defaultPersonalDetails}: PersonalDetailsForm) {

  const {
    register: registerPersonalDetails,
    handleSubmit: handleSubmitPersonalDetails,
    formState: { errors: errorsPersonalDetails},
    getValues,
  } = useForm<PersonalDetailsFormInterface>({
    resolver: yupResolver(personalDetailsFormSchema),
    defaultValues: defaultPersonalDetails
  });

  const submit: SubmitHandler<PersonalDetailsFormInterface> = async (personalDetails) => {
    const isValid = await personalDetailsFormSchema.isValid(personalDetails);
    if (isValid) {
      handleFormSubmit(personalDetails);
    }
  }

  return (
    <>
      <Typography variant="lead" className="font-light text-gray-650">Personal Details</Typography>
      <form 
        className="flex flex-col space-y-4" 
        onSubmit={handleSubmitPersonalDetails(submit)}
      >
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
          <label className="block text-sm font-normal leading-6 text-gray-650" htmlFor="firstName">
            <span className="inline-flex items-center">
              First Name
              {errorsPersonalDetails?.firstName?.message && (
                <Typography variant="small"  color="red" className="flex items-center gap-1 font-normal ml-2">
                  <InformationCircleIcon className="w-4 h-4 -mt-px" />
                  {errorsPersonalDetails.firstName.message}
                </Typography>
              )}
            </span>
          </label>
          <input 
            type="text"
            id="firstName"
            className="mt-1 w-full input-theme sm:text-sm"
            {...registerPersonalDetails("firstName")}
          />
        </div>
        <div>
          <label className="block text-sm font-normal leading-6 text-gray-650" htmlFor="middleName">
            <span className="inline-flex items-center">
              Middle Name
              {errorsPersonalDetails?.middleName?.message && (
                <Typography variant="small" color="red" className="flex items-center gap-1 font-normal ml-2">
                  <InformationCircleIcon className="w-4 h-4 -mt-px" />
                  {errorsPersonalDetails.middleName.message}
                </Typography>
              )}
            </span>
          </label>
          <input 
            type="text"
            id="middleName"
            className="mt-1 w-full input-theme sm:text-sm"
            {...registerPersonalDetails("middleName")}
          />
        </div>
        <div>
          <label className="block text-sm font-normal leading-6 text-gray-650" htmlFor="lastName">
            <span className="inline-flex items-center">
              Last Name
              {errorsPersonalDetails?.lastName?.message && (
                <Typography variant="small" color="red" className="flex items-center gap-1 font-normal ml-2">
                  <InformationCircleIcon className="w-4 h-4 -mt-px" />
                  {errorsPersonalDetails.lastName.message}
                </Typography>
              )}
            </span>
          </label>
          <input 
            type="text"
            id="lastName"
            className="mt-1 w-full input-theme sm:text-sm" 
            {...registerPersonalDetails("lastName")}
          />
        </div>
        <div>
          <label className="block text-sm font-normal leading-6 text-gray-650">
            <span className="inline-flex items-center">
              Date of Birth
              {errorsPersonalDetails?.dateOfBirth?.message && (
                <Typography variant="small" color="red" className="flex items-center gap-1 font-normal ml-2">
                  <InformationCircleIcon className="w-4 h-4 -mt-px" />
                  {errorsPersonalDetails.dateOfBirth.message}
                </Typography>
              )}
            </span>
          </label>
          <div className="flex space-x-2">
            <div>
              <input 
                className="w-14 mt-1 input-theme sm:text-sm"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="DD"
                maxLength={2}
                {...registerPersonalDetails("dateOfBirth.day")}
              />
            </div>
            <div>
              <input 
                className="w-14 mt-1 input-theme sm:text-sm"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="MM"
                maxLength={2}
                {...registerPersonalDetails("dateOfBirth.month")}
              />
            </div>
            <div>
              <input 
                className="w-16 mt-1 input-theme sm:text-sm"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="YYYY"
                maxLength={4}
                {...registerPersonalDetails("dateOfBirth.year")}
              />
            </div>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-normal leading-6 text-gray-650">
            <span className="inline-flex items-center">
              Gender
              {errorsPersonalDetails?.sex?.message && (
                <Typography variant="small" color="red" className="flex items-center gap-1 font-normal ml-2">
                  <InformationCircleIcon className="w-4 h-4 -mt-px" />
                  {errorsPersonalDetails.sex?.message}
                </Typography>
              )}
            </span>
          </label>
          <div className="flex space-x-2 mt-1">
            {genders?.map((gender, index) => (
              <div
                key={gender}
                className="w-20"
              >
                <input
                  className="peer sr-only"
                  id={gender}
                  type="radio"
                  value={gender}
                  {...registerPersonalDetails("sex")}
                />

                <label
                  htmlFor={gender}
                  className="block w-full text-center cursor-pointer rounded-lg bg-white-coffee p-2 text-gray-650 hover:outline hover:outline-melon peer-checked:outline peer-checked:outline-melon peer-checked:bg-melon"
                >
                  <span className="text-sm">{gender}</span>
                </label>
              </div>
            ))} 
          </div>
        </div>

        <div>
          <label className="block text-sm font-normal leading-6 text-gray-650" htmlFor="phoneNumber">
            <span className="inline-flex items-center">
              Phone Number
              {errorsPersonalDetails?.phoneNumber?.message && (
                <Typography variant="small" color="red" className="flex items-center gap-1 font-normal ml-2">
                  <InformationCircleIcon className="w-4 h-4 -mt-px" />
                  {errorsPersonalDetails.phoneNumber.message}
                </Typography>
              )}
            </span>
          </label>
          <input 
            type="text"
            className="mt-1 w-full max-w-[12rem] input-theme sm:text-sm" 
            id="phoneNumber"
            {...registerPersonalDetails("phoneNumber")}
          />
        </div>
        <div>
          <label className="block text-sm font-normal leading-6 text-gray-650" htmlFor="medicalConcern">
            <span className="inline-flex items-center">
              Medical Concern
              {errorsPersonalDetails?.medicalConcern?.message && (
                <Typography variant="small" color="red" className="flex items-center gap-1 font-normal ml-2">
                  <InformationCircleIcon className="w-4 h-4 -mt-px" />
                  {errorsPersonalDetails.medicalConcern.message}
                </Typography>
              )}
            </span>
          </label>

          <textarea
            className="w-full input-theme mt-1 text-sm"
            placeholder="Medical Concern"
            rows={5}
            minLength={2}
            id="medicalConcern"
            {...registerPersonalDetails("medicalConcern")}
          ></textarea>
        </div>
        <div className="w-full grid grid-cols-4">
          <Button
            className="col-span-4 md:col-start-2 md:col-span-2 rounded-full bg-pastel-pink shadow-none hover:shadow-lg hover:shadow-pastel-pink/50"
            type="submit"
          >
            <span className="button-text">Go to next step <span aria-hidden="true">→</span></span>
          </Button>
          <Button
            variant="text"
            className="col-span-4 md:col-start-2 md:col-span-2 text-gray-650 hover:bg-white-ivory"
            type="button"
            onClick={() => handleBack(getValues())}
          >
            <span className="button-text underline underline-offset-4">Back</span>
          </Button>
        </div>
      </form>
    </>
  );
}