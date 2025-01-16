// StepThree.tsx
import { rem, Textarea, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { IconMail, IconPhone, IconUser } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

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

  const t = useTranslations();
  return(
    <div className="w-full h-82 border-solid border-orange-400 bg-yellow-50 p-2">
      <div className="flex">
        <TextInput
          withAsterisk
          color="orange"
          className="p-2"
          label={t('stepThree.firstName.label')}
          leftSection={<IconUser style={{ width: rem(16), height: rem(16) }} />}
          placeholder={t('stepThree.firstName.placeholder')}
          {...form.getInputProps('firstName')}
        />
        <TextInput
          color="orange"
          className="p-2"
          label={t('stepThree.lastName.label')}
          leftSection={<IconUser style={{ width: rem(16), height: rem(16) }} />}
          placeholder={t('stepThree.lastName.placeholder')}
          {...form.getInputProps('lastName')}
        />
      </div>
      <TextInput
        withAsterisk
        color="orange"
        className="p-2"
        label={t('stepThree.email.label')}
        leftSection={<IconMail style={{ width: rem(16), height: rem(16) }} />}
        placeholder={t('stepThree.email.placeholder')}
        {...form.getInputProps('email')}
      />
      <TextInput
        withAsterisk
        className="p-2"
        label={t('stepThree.contactNo.label')}
        leftSection={<IconPhone style={{ width: rem(16), height: rem(16) }} />}
        placeholder={t('stepThree.contactNo.placeholder')}
        {...form.getInputProps('contactNo')}
      />
      <Textarea
        label={t('stepThree.remarks.label')}
        className="p-2"
        placeholder={t('stepThree.remarks.placeholder')}
        {...form.getInputProps('remarks')}
      />
    </div>
  );
};

export default StepThree;