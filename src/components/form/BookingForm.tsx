'use client'
import { Button, Group, Stepper, rem } from '@mantine/core';
import { useForm } from '@mantine/form';
import {
  IconCircleCheck,
  IconMailOpened,
  IconShieldCheck,
  IconUserCheck,
  IconCircleCheckFilled
} from '@tabler/icons-react';
import { useState } from 'react';
import styles from "./form.module.css";
import StepFour from './StepFour';
import StepOne from './StepOne';
import StepThree from './StepThree';
import StepTwo from './StepTwo';
import { useTranslations } from 'next-intl';

interface FormValues {
  // Step One Values
  pickUpLocation: string;
  dropOffLocation: string;
  pickupDate: Date | null;
  pickupTime: string;
  passengers: string;
  suitcases: string;
  
  // Step Two Values
  selectedCar: string;
  
  // Step Three Values
  firstName: string;
  lastName: string;
  email: string;
  contactNo: string;
  remarks: string;
  distance?: number;
  duration?: string;
  estimatedPrice?: number;
  
  // Step Four Values
  paymentMethod: string;
}

const BookingForm = () => {
  const [active, setActive] = useState(0);
  const [highestStepVisited, setHighestStepVisited] = useState(active);
  
  const form = useForm<FormValues>({
    initialValues: {
      pickUpLocation: '',
      dropOffLocation: '',
      pickupDate: null,
      pickupTime: '',
      passengers: '1',
      suitcases: '1',
      selectedCar: '',
      firstName: '',
      lastName: '',
      email: '',
      contactNo: '',
      remarks: '',
      paymentMethod: 'Card',
      distance: 0,
      duration: '',
      estimatedPrice: 0,
    },
    
    validate: {
      pickUpLocation: (value) => (!value ? 'Pickup location is required' : null),
      dropOffLocation: (value) => (!value ? 'Drop-off location is required' : null),
      pickupDate: (value) => (!value ? 'Pickup date is required' : null),
      pickupTime: (value) => (!value ? 'Pickup time is required' : null),
      selectedCar: (value) => (!value ? 'Please select a car' : null),
      firstName: (value) => (!value ? 'First name is required' : null),
      lastName: (value) => (!value ? 'Last name is required' : null),
      email: (value) => {
        if (!value) return 'Email is required';
        if (!/^\S+@\S+$/.test(value)) return 'Invalid email';
        return null;
      },
      contactNo: (value) => {
        if (!value) return 'Contact number is required';
        if (!/^\d{10,}$/.test(value)) return 'Invalid contact number';
        return null;
      },
      paymentMethod: (value) => (!value ? 'Please select a payment method' : null),
    }
  });

  const validateStep = (step: number) => {
    switch (step) {
      case 0:
        return !form.validateField('pickUpLocation').hasError &&
               !form.validateField('dropOffLocation').hasError &&
               !form.validateField('pickupDate').hasError &&
               !form.validateField('pickupTime').hasError;
      case 1:
        return !form.validateField('selectedCar').hasError;
      case 2:
        return !form.validateField('firstName').hasError &&
               !form.validateField('lastName').hasError &&
               !form.validateField('email').hasError &&
               !form.validateField('contactNo').hasError;
      case 3:
        return !form.validateField('paymentMethod').hasError;
      default:
        return true;
    }
  };

  const handleStepChange = (nextStep: number) => {
    const isOutOfBounds = nextStep > 4 || nextStep < 0;
    if (isOutOfBounds) {
      return;
    }

    if (nextStep > active && !validateStep(active)) {
      // Show validation errors
      form.validate();
      return;
    }

    setActive(nextStep);
    setHighestStepVisited((hSC) => Math.max(hSC, nextStep));
  };

  const shouldAllowSelectStep = (step: number) => highestStepVisited >= step && active !== step;

  const handleSubmit = async () => {
    if (validateStep(3)) {
      // Handle form submission
      try{
        handleStepChange(active + 1)
        const submit = await fetch("http://localhost:3000/api/mail",{
          method:"POST",
          body:JSON.stringify(form.values)
        })
        console.log(submit)
        console.log("Its working")
        console.log('Form submitted:', form.values);
      }catch(e){
        console.log(e)
      }
      }
  };
  const t = useTranslations();
  return (
    <div className="w-full flex flex-col items-center font-serif">
      <Stepper
        active={active}
        color="blue"
        className="w-full md:w-3/4 h-1/6 text-xs mt-4"
        onStepClick={setActive}
        size="xs"
        orientation="horizontal"
        wrap={false}
        completedIcon={<IconCircleCheck style={{ width: rem(18), height: rem(18) }} />}
      >
        <Stepper.Step
          icon={<IconUserCheck style={{ width: rem(18), height: rem(18) }} />}
          label={t('step1.label')}
          description={t('step1.description')}
          allowStepSelect={shouldAllowSelectStep(0)}
          classNames={{ step: styles.step, stepIcon: styles.stepIcon, verticalSeparator: styles.verticalSeparator }}
        >
          <div className="p-3">
            <StepOne form={form} />
          </div>
        </Stepper.Step>

        <Stepper.Step
          icon={<IconMailOpened style={{ width: rem(18), height: rem(18) }} />}
          label={t('step2.label')}
          description={t('step2.description')}
          allowStepSelect={shouldAllowSelectStep(1)}
          classNames={{ step: styles.step, stepIcon: styles.stepIcon }}
        >
          <StepTwo form={form} />
        </Stepper.Step>

        <Stepper.Step
          icon={<IconShieldCheck style={{ width: rem(18), height: rem(18) }} />}
          label={t('step3.label')}
          description={t('step3.description')}
          allowStepSelect={shouldAllowSelectStep(2)}
          classNames={{ step: styles.step, stepIcon: styles.stepIcon }}
        >
          <div className="p-3">
            <StepThree form={form} />
          </div>
        </Stepper.Step>

        <Stepper.Step
          icon={<IconShieldCheck style={{ width: rem(18), height: rem(18) }} />}
          label={t('step4.label')}
          description={t('step4.description')}
          allowStepSelect={shouldAllowSelectStep(3)}
          classNames={{ step: styles.step, stepIcon: styles.stepIcon }}
        >
          <div className="p-3">
            <StepFour form={form} />
          </div>
        </Stepper.Step>

        <Stepper.Completed>
          <div className="flex items-center justify-center w-full border border-red- bg-orange-200 p-5">
            <p className="text-lg text-center md:text-md sm:text-sm">
              {t('completed.message')} <IconCircleCheckFilled className="w-[20rem] text-green-500" />
            </p>
          </div>
        </Stepper.Completed>
      </Stepper>

      <Group justify="center" mt="xl" mb="xl">
        <Button variant="default" onClick={() => handleStepChange(active - 1)}>
          {t('buttons.back')}
        </Button>
        {active < 3 ? (
          <Button color="blue" onClick={() => handleStepChange(active + 1)}>
            {t('buttons.nextStep')}
          </Button>
        ) : active < 4 ? (
          <Button color="green" onClick={handleSubmit}>
            {t('buttons.confirmRide')}
          </Button>
        ) : (
          <></>
        )}
      </Group>
    </div>
  );
};
export default BookingForm;