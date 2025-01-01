'use client'
import { ActionIcon, NativeSelect, rem, TextInput } from '@mantine/core';
import { DatePickerInput, TimeInput } from '@mantine/dates';
import { UseFormReturnType } from '@mantine/form';
import { Autocomplete, useJsApiLoader } from '@react-google-maps/api';
import { IconClock, IconLocation } from '@tabler/icons-react';
import { useRef, useState } from 'react';

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
  distance?: number;
  duration?: string;
  estimatedPrice?: number;
}

const StepOne = ({ form }: { form: UseFormReturnType<FormValues> }) => {
  const ref = useRef<HTMLInputElement>(null);
  const [originRef, setOriginRef] = useState<google.maps.places.Autocomplete | null>(null);
  const [destinationRef, setDestinationRef] = useState<google.maps.places.Autocomplete | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ['places'],
  });

  const calculatePrice = (distanceInMeters: number) => {
    const distanceInKm = distanceInMeters / 1000;
    let basePrice = 0;

    if (distanceInKm <= 50) basePrice = distanceInKm * 1.5;
    else if (distanceInKm <= 99) basePrice = distanceInKm * 1.3;
    else basePrice = distanceInKm;

    return basePrice;
  };

  const calculateRoute = async () => {
    if (!originRef || !destinationRef) return;
  
    const originPlace = originRef.getPlace();
    const destinationPlace = destinationRef.getPlace();
  
    if (!originPlace || !destinationPlace) return;
  
    const service = new google.maps.DistanceMatrixService();
    const result = await service.getDistanceMatrix({
      origins: [originPlace.formatted_address!],
      destinations: [destinationPlace.formatted_address!],
      travelMode: google.maps.TravelMode.DRIVING,
    });
  
    if (result.rows[0].elements[0].status === "OK") {
      const distance = result.rows[0].elements[0].distance.value;
      const duration = result.rows[0].elements[0].duration.text;
      const price = calculatePrice(distance);

      form.setFieldValue('distance', distance);
      form.setFieldValue('duration', duration);
      form.setFieldValue('estimatedPrice', price);
    }
  };

  const pickerControl = (
    <ActionIcon variant="subtle" color="gray" onClick={() => ref.current?.showPicker()}>
      <IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
    </ActionIcon>
  );

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full border-solid border-orange-400 bg-yellow-50">
      <Autocomplete
        onLoad={(ref) => setOriginRef(ref)}
        onPlaceChanged={() => {
          const place = originRef?.getPlace();
          if (place?.formatted_address) {
            form.setFieldValue('pickUpLocation', place.formatted_address);
            calculateRoute();
          }
        }}
      >
        <TextInput
          withAsterisk
          color="orange"
          className="p-2"
          label="Pickup Location"
          leftSection={<IconLocation style={{ width: rem(16), height: rem(16) }} />}
          placeholder="Enter Your Pickup Location"
          {...form.getInputProps('pickUpLocation')}
        />
      </Autocomplete>

      <Autocomplete
        onLoad={(ref) => setDestinationRef(ref)}
        onPlaceChanged={() => {
          const place = destinationRef?.getPlace();
          if (place?.formatted_address) {
            form.setFieldValue('dropOffLocation', place.formatted_address);
            calculateRoute();
          }
        }}
      >
        <TextInput
          withAsterisk
          className="p-2"
          label="DropOff Location"
          leftSection={<IconLocation style={{ width: rem(16), height: rem(16) }} />}
          placeholder="Enter Your DropOff Location"
          {...form.getInputProps('dropOffLocation')}
        />
      </Autocomplete>

      <div className="w-full flex justify-evenly items-center">
        <DatePickerInput
          label="Pick date"
          placeholder="Pick date"
          className="w-2/6"
          withAsterisk
          {...form.getInputProps('pickupDate')}
        />
        <TimeInput
          label="Pick Time"
          className="w-3/6"
          color="orange"
          ref={ref}
          rightSection={pickerControl}
          withAsterisk
          {...form.getInputProps('pickupTime')}
        />
      </div>
      <div className="w-full flex justify-evenly items-center m-3">
        <NativeSelect
          label="Passenger(s)"
          className="w-2/6"
          data={['1', '2', '3', '4', '5', '6', '7', '8']}
          {...form.getInputProps('passengers')}
        />
        <NativeSelect
          label="SuitCase(23kgs)"
          className="w-3/6"
          data={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '15']}
          {...form.getInputProps('suitcases')}
        />
      </div>

      {/* {form.values.distance && form.values.duration && form.values.estimatedPrice && (
        <div className="p-4 bg-white rounded-lg shadow mx-2 mt-4">
          <div className="text-lg font-bold text-center mb-2">Trip Details</div>
          <div className="space-y-2">
            <div>Distance: {(form.values.distance / 1000).toFixed(1)} km</div>
            <div>Duration: {form.values.duration}</div>
            <div className="text-xl font-bold text-orange-500">
              Estimated Price: €{form.values.estimatedPrice.toFixed(2)}
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default StepOne;