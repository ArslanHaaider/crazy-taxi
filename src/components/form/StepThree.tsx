// StepThree.tsx
import { rem, Textarea, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { IconMail, IconPhone, IconUser } from '@tabler/icons-react';

interface FormValues {
  pickUpLocation: string;
  dropOffLocation: string;
  pickupDate: Date | null;
  pickupTime: string;
  passengers: string;
  suitcases: string;
  selectedCar: string;
  firstName: string;
  lastName: string;
  email: string;
  contactNo: string;
  remarks: string;
  paymentMethod: string;
}

const StepThree = ({ form }: { form: UseFormReturnType<FormValues> }) => {
  return (
    <div className="w-full h-82 border-solid border-orange-400 bg-yellow-50 p-2">
      <div className="flex">
        <TextInput
          withAsterisk
          color="orange"
          className="p-2"
          label="First Name"
          leftSection={<IconUser style={{ width: rem(16), height: rem(16) }} />}
          placeholder="Your First Name"
          {...form.getInputProps('firstName')}
        />
        <TextInput
          color="orange"
          className="p-2"
          label="Last Name"
          leftSection={<IconUser style={{ width: rem(16), height: rem(16) }} />}
          placeholder="Your Last Name"
          {...form.getInputProps('lastName')}
        />
      </div>
      <TextInput
        withAsterisk
        color="orange"
        className="p-2"
        label="Email"
        leftSection={<IconMail style={{ width: rem(16), height: rem(16) }} />}
        placeholder="Enter Your Email"
        {...form.getInputProps('email')}
      />
      <TextInput
        withAsterisk
        className="p-2"
        label="Contact No"
        leftSection={<IconPhone style={{ width: rem(16), height: rem(16) }} />}
        placeholder="Enter Your Contact No"
        {...form.getInputProps('contactNo')}
      />
      <Textarea
        label="Remarks"
        className="p-2"
        placeholder="Any remarks"
        {...form.getInputProps('remarks')}
      />
    </div>
  );
};

export default StepThree;