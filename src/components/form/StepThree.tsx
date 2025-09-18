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

  const t = useTranslations("forms.contactDetails");
  return(
    <div className="w-full h-82 border-solid border-primary p-2">
      <div className="flex">
        <TextInput
          withAsterisk
          color="orange"
          className="p-2"
          label={t('firstName.label')}
          leftSection={<IconUser style={{ width: rem(16), height: rem(16) }} />}
          placeholder={t('firstName.placeholder')}
          {...form.getInputProps('firstName')}
        />
        <TextInput
          color="orange"
          className="p-2"
          label={t('lastName.label')}
          leftSection={<IconUser style={{ width: rem(16), height: rem(16) }} />}
          placeholder={t('lastName.placeholder')}
          {...form.getInputProps('lastName')}
        />
      </div>
      <TextInput
        withAsterisk
        color="orange"
        className="p-2"
        label={t('email.label')}
        leftSection={<IconMail style={{ width: rem(16), height: rem(16) }} />}
        placeholder={t('email.placeholder')}
        {...form.getInputProps('email')}
      />
      <TextInput
        withAsterisk
        className="p-2"
        label={t('contactNumber.label')}
        leftSection={<IconPhone style={{ width: rem(16), height: rem(16) }} />}
        placeholder={t('contactNumber.placeholder')}
        {...form.getInputProps('contactNo')}
      />
      <Textarea
        label={t('remarks.label')}
        className="p-2"
        placeholder={t('remarks.placeholder')}
        {...form.getInputProps('remarks')}
      />
    </div>
  );
};

export default StepThree;