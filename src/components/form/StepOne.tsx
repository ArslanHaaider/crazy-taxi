import { ActionIcon, NativeSelect, rem, TextInput } from '@mantine/core';
import { DatePickerInput, TimeInput } from '@mantine/dates';
import { UseFormReturnType } from '@mantine/form';
import { IconClock, IconLocation } from '@tabler/icons-react';
import { useRef, useState } from 'react';
interface FormValue {
  PickUpLocation: string;
  DropOffLocation: string;
}
const StepOne = (form:{form:UseFormReturnType<FormValue>}) =>{
  const [passenger, setPassenger] = useState('');
  
  const ref = useRef<HTMLInputElement>(null);

  const pickerControl = (
    <ActionIcon variant="subtle" color="gray" onClick={() => ref.current?.showPicker()}> <IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
    </ActionIcon>
  );
  const formProp = form.form
    return (
      <>
      {}
        <div className="w-full h-72 border-solid border-orange-400 bg-yellow-50">
        <form onSubmit={formProp.onSubmit((values) => console.log(values))}>
      <TextInput
        withAsterisk
        color='orange'
        className='p-2'
        label="PickUp Location "
        leftSection={<IconLocation style={{ width: rem(16), height: rem(16) }} />}
        placeholder="Enter Your Pickup Location"
        key={formProp.key('PickUpLocation')}
        {...formProp.getInputProps('PickUpLocation')}
      />
      <TextInput
        withAsterisk
        className='p-2'
        label="DropOff Location "
        leftSection={<IconLocation style={{ width: rem(16), height: rem(16) }} />}
        placeholder="Enter Your DropOff Location"
        key={formProp.key('DropOffLocation')}
        {...formProp.getInputProps('DropOffLocation')}
      />
       <div className='w-full flex justify-evenly items-center'>
       <DatePickerInput  label="Pick date" placeholder="Pick date"       className='w-2/6'/>
        <TimeInput label="Pick Time"       className='w-3/6' color='orange' ref={ref} rightSection={pickerControl} /></div>
        <div className='w-full flex justify-evenly items-center'>
        <NativeSelect
      value={passenger}
      label="Pasenger(s)"
      className='w-2/6'
      onChange={(event) => setPassenger(event.currentTarget.value)}
      data={['1','2','3','4','5','6','7','8']}
    />
           <NativeSelect
      value={passenger}
      label="SuitCase(23kgs)"
      className='w-3/6'
      onChange={(event) => setPassenger(event.currentTarget.value)}
      data={['1','2','3','4','5','6','7','8','9','10','11','12','13','15']}
    />
        </div>
    </form>

        </div>
  
      </>
    )
  }

  export default StepOne