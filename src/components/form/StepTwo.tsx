// StepTwo.tsx
import { Button } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import Image from 'next/image';

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

const carsArray = [
  {
    id: 'mercedes-e',
    name: 'Mercedies Benz E Class',
    cost: '$200',
    image: '/mercedies.png',
  },
  {
    id: 'volkswagen',
    name: 'VolksWagen Touran',
    cost: '$140',
    image: '/VolksWagen.Png',
  },
  {
    id: 'mercedes-v',
    name: 'Mercedies V Class',
    cost: '$400',
    image: '/mercediesVClass.Png',
  },
];

interface CarCardProps {
  name: string;
  cost: string;
  image: string;
  id: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const CarCard = ({ name, image, id, isSelected, onSelect }: CarCardProps) => {
  return (
    <div className="border border-solid border-orange-400 w-10/12 h-[500px] md:h-52 flex items-center justify-evenly rounded-md mt-2 flex-col md:flex-row bg-orange-100">
      <Image src={image} width={200} height={100} alt="" className="w-52 h-36 md:w-72" />
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-400">Model</h1>
        <h1 className="text-xl font-bold text-wrap w-30">{name}</h1>
      </div>
      <Button
        variant={isSelected ? "filled" : "outline"}
        color="orange"
        onClick={() => onSelect(id)}
      >
        {isSelected ? 'Selected' : 'Choose'}
      </Button>
    </div>
  );
};

const StepTwo = ({ form }: { form: UseFormReturnType<FormValues> }) => {
  const handleSelectCar = (carId: string) => {
    form.setFieldValue('selectedCar', carId);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {carsArray.map((car) => (
        <CarCard
          key={car.id}
          id={car.id}
          name={car.name}
          cost={car.cost}
          image={car.image}
          isSelected={form.values.selectedCar === car.id}
          onSelect={handleSelectCar}
        />
      ))}
      {form.errors.selectedCar && (
        <div className="text-red-500 mt-2">{form.errors.selectedCar}</div>
      )}
    </div>
  );
};

export default StepTwo;