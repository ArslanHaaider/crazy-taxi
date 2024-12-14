import { rem, Textarea, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { IconMail, IconPhone, IconUser } from '@tabler/icons-react';
interface FormValue {
  PickUpLocation: string;
  DropOffLocation: string;
}
const StepThree = (form:{form:UseFormReturnType<FormValue>}) =>{



  const formProp = form.form
    return (
      <>
        <div className="w-full h-82 border-solid border-orange-400 bg-yellow-50 p-2">
        <form onSubmit={formProp.onSubmit((values) => console.log(values))}>
        <div className='flex'>
        <TextInput
        withAsterisk
        color='orange'
        className='p-2'
        label="First Name"
        leftSection={<IconUser style={{ width: rem(16), height: rem(16) }} />}
        placeholder="Your First Name"
        key={formProp.key('PickUpLocation')}
        {...formProp.getInputProps('PickUpLocation')}
      />      <TextInput
      color='orange'
      className='p-2'
      label="Last Name"
      leftSection={<IconUser style={{ width: rem(16), height: rem(16) }} />}
      placeholder="Your Last Name"
      key={formProp.key('PickUpLocation')}
      {...formProp.getInputProps('PickUpLocation')}
    />
        </div>
      <TextInput
        withAsterisk
        color='orange'
        className='p-2'
        label="Email"
        leftSection={<IconMail style={{ width: rem(16), height: rem(16) }} />}
        placeholder="Enter Your Email"
        key={formProp.key('PickUpLocation')}
        {...formProp.getInputProps('PickUpLocation')}
      />
      <TextInput
        withAsterisk
        className='p-2'
        label="Contact No "
        leftSection={<IconPhone style={{ width: rem(16), height: rem(16) }} />}
        placeholder="Enter Your Contact No"
        key={formProp.key('DropOffLocation')}
        {...formProp.getInputProps('DropOffLocation')}
      />
       <Textarea
      label="Remarks"
      className='p-2'
      placeholder="Any remarks"
    />
    </form>
        </div>
      </>
    )
  }

  export default StepThree