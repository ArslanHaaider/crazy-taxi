'use client'
import { Button, Group, Stepper, rem } from '@mantine/core';
import { useForm } from '@mantine/form';
import {
  IconCircleCheck,
  IconMailOpened,
  IconShieldCheck,
  IconUserCheck
} from '@tabler/icons-react';
import { useState } from 'react';
import styles from "./form.module.css";
import StepFour from './StepFour';
import StepOne from './StepOne';
import StepThree from './StepThree';
import StepTwo from './StepTwo';
interface BookingForm {
  styles:{ readonly [key: string]: string; }
}
const BookingForm = () => {
    const [active, setActive] = useState(0);
    const [highestStepVisited, setHighestStepVisited] = useState(active);
    const handleStepChange = (nextStep: number) => {
      const isOutOfBounds = nextStep > 4 || nextStep < 0;
      if (isOutOfBounds) {
        return;
      }
      setActive(nextStep);
      setHighestStepVisited((hSC) => Math.max(hSC, nextStep));
    };
  
    // Allow the user to freely go back and forth between visited steps.
    const shouldAllowSelectStep = (step: number) => highestStepVisited >= step && active !== step;

    const form = useForm({
      mode: 'uncontrolled',
      initialValues: {
        PickUpLocation: '',
        DropOffLocation:'',
      },
      validate: {
        
      },
    });

  return (
    <div className="w-full flex flex-col items-center">
    <Stepper
      active={active}
      color="orange"
      className='w-full md:w-3/4 h-1/6 text-xs mt-4'
      onStepClick={setActive}
      size='xs'
      orientation='horizontal'
      wrap={false}
      completedIcon={<IconCircleCheck style={{ width: rem(18), height: rem(18) }} />}
    >
    <Stepper.Step
        icon={<IconUserCheck style={{ width: rem(18), height: rem(18)}} />}
        label="Step 1"
        description="Enter Ride Details"
        allowStepSelect={shouldAllowSelectStep(0)}
        classNames={{step:styles.step,stepIcon:styles.stepIcon,verticalSeparator:styles.verticalSeparator}}
      >
      <div className='p-3'>
      <StepOne form={form}/>
      </div>
    </Stepper.Step>
      <Stepper.Step
        icon={<IconMailOpened style={{ width: rem(18), height: rem(18) }} />}
        label="Step 2"
        description="Choose a vehicle"
        allowStepSelect={shouldAllowSelectStep(1)}
        classNames={{step:styles.step,stepIcon:styles.stepIcon  }}
      >
        <StepTwo />
      </Stepper.Step>
      <Stepper.Step
        icon={<IconShieldCheck style={{ width: rem(18), height: rem(18) }} />}
        label="Step 3"
        description="Contact details"
        allowStepSelect={shouldAllowSelectStep(2)}
        classNames={{step:styles.step,stepIcon:styles.stepIcon  }}
        className='p-3'
      >
        <div className='p-3'> 
        <StepThree form={form}/>

        </div>
      </Stepper.Step>
      <Stepper.Step
        icon={<IconShieldCheck style={{ width: rem(18), height: rem(18) }} />}
        label="Step 4"
        description="Booking Summary"
        allowStepSelect={shouldAllowSelectStep(3)}
        classNames={{step:styles.step,stepIcon:styles.stepIcon}}
      >
        <div className='p-3'>
        <StepFour/>
        </div>
        </Stepper.Step>

    </Stepper>
    <Group justify="center" mt="xl" mb={'xl'}>
        <Button variant="default" onClick={() => handleStepChange(active - 1)}>
          Back
        </Button>
       {active !== 3 ?  <Button color='orange' onClick={() => handleStepChange(active + 1)}>Next step</Button>:<Button color='Green' onClick={() => handleStepChange(active + 1)}>Confirm Ride</Button>}
      </Group>
    </div>
  )
}

export default BookingForm



