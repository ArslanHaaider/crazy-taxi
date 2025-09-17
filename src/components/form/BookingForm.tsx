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
// Removed StepFour to convert to a 3-step flow
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
  
  // Step Four Values (kept in type for compatibility)
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
      // paymentMethod validation removed from active flow
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
      default:
        return true;
    }
  };

  const handleStepChange = (nextStep: number) => {
    const isOutOfBounds = nextStep > 3 || nextStep < 0;
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
    if (validateStep(2)) {
      // Handle form submission
      try{
        handleStepChange(active + 1)
        const submit = await fetch("/api/mail",{
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

  // Summary UI component (inline) showing live price/ETA
  const SummaryAside = () => (
    <aside className="sticky top-24 bg-card/70 backdrop-blur rounded-lg border border-border p-4 shadow-lg text-sm">
      <h3 className="text-base font-semibold mb-3">Trip summary</h3>
      <div className="space-y-2">
        <div>
          <p className="text-muted-foreground">From</p>
          <p className="font-medium">{form.values.pickUpLocation || '—'}</p>
        </div>
        <div>
          <p className="text-muted-foreground">To</p>
          <p className="font-medium">{form.values.dropOffLocation || '—'}</p>
        </div>
        <div className="grid grid-cols-3 gap-2 pt-2">
          <div>
            <p className="text-muted-foreground">Distance</p>
            <p className="font-medium">{form.values.distance ? `${(form.values.distance/1000).toFixed(1)} km` : '—'}</p>
          </div>
          <div>
            <p className="text-muted-foreground">ETA</p>
            <p className="font-medium">{form.values.duration || '—'}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Passengers</p>
            <p className="font-medium">{form.values.passengers}</p>
          </div>
        </div>
        <div className="border-t border-border pt-3 mt-2">
          <p className="text-muted-foreground">Estimated price</p>
          <p className="text-2xl font-bold">{form.values.estimatedPrice ? `€${form.values.estimatedPrice}` : '—'}</p>
        </div>
      </div>
    </aside>
  );

  return (
    <div className="w-full flex flex-col md:flex-row gap-6 px-2 md:px-6 font-serif">
      <div className="flex-1">
        <Stepper
          active={active}
          color="blue"
          className="w-full md:w-full text-xs mt-4 mb-6"
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

          <Stepper.Completed>
            <div className="flex items-center justify-center w-full border border-red- bg-orange-200 p-5 rounded-md">
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
          {active < 2 ? (
            <Button color="blue" onClick={() => handleStepChange(active + 1)}>
              {t('buttons.nextStep')}
            </Button>
          ) : active < 3 ? (
            <Button color="green" onClick={handleSubmit}>
              {t('buttons.confirmRide')}
            </Button>
          ) : (
            <></>
          )}
        </Group>
      </div>

      <div className="w-full md:max-w-sm md:w-80 lg:w-96 md:block">
        <SummaryAside />
      </div>
    </div>
  );
};

export default BookingForm;