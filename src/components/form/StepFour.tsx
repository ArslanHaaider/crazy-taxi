import { Divider, SegmentedControl } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { GoogleMap, useJsApiLoader, DirectionsRenderer } from '@react-google-maps/api';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

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

const carsArray = [
  {
    id: 'mercedes-e',
    name: 'Mercedes Benz E Class',
    cost: '$200',
    image: '/mercedes.png',
  },
  {
    id: 'volkswagen',
    name: 'VolksWagen Touran',
    cost: '$140',
    image: '/VolksWagen.png',
  },
  {
    id: 'mercedes-v',
    name: 'Mercedes V Class',
    cost: '$400',
    image: '/mercedesVClass.png',
  },
];

const StepFour = ({ form }: { form: UseFormReturnType<FormValues> }) => {
  const [directionResult, setDirectionResult] = useState<google.maps.DirectionsResult | undefined>(undefined);
  const  t  = useTranslations();

  useEffect(() => {
    const fetchDirections = async () => {
      try {
        const directionsService = new google.maps.DirectionsService();
        const result = await directionsService.route({
          origin: form.values.pickUpLocation,
          destination: form.values.dropOffLocation,
          travelMode: google.maps.TravelMode.DRIVING,
        });
        setDirectionResult(result);
      } catch (error) {
        console.error('Error fetching directions:', error);
      }
    };

    if (form.values.pickUpLocation && form.values.dropOffLocation) {
      fetchDirections();
    }
  }, [form.values.pickUpLocation, form.values.dropOffLocation]);

  const selectedCar = carsArray.find(car => car.id === form.values.selectedCar);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ['places'],
  });

  const containerStyle = {
    width: '100%',
    height: '300px',
  };

  const defaultCenter = { lat: 50.110924, lng: 8.682127 };

  if (!isLoaded) return <span>Loading...</span>;

  return (
    <div className="w-full md:flex gap-5">
      <div className="w-full p-5 border border-solid border-primary bg-primary font-sans rounded-md shadow-lg">
        <h2>{t('stepFour.rideInfo.title')}</h2>
        <div className="w-full">
          <h3>{t('stepFour.rideInfo.rideType.label')}</h3>
          <p>{t('stepFour.rideInfo.rideType.value')}</p>
        </div>
        <Divider color="blue" />
        <div className="w-full">
          <h3>{t('stepFour.rideInfo.carModel.label')}</h3>
          <p>{selectedCar?.name || t('stepFour.rideInfo.carModel.placeholder')}</p>
        </div>
        <Divider color="blue" />
        <div className="w-full">
          <h3>{t('stepFour.rideInfo.from')}</h3>
          <p>{form.values.pickUpLocation}</p>
        </div>
        <Divider color="blue" />
        <div className="w-full">
          <h3>{t('stepFour.rideInfo.to')}</h3>
          <p>{form.values.dropOffLocation}</p>
        </div>
        <Divider color="blue" />
        <div className="w-full">
          <h3>{t('stepFour.rideInfo.departureDate')}</h3>
          <p>{form.values.pickupDate?.toLocaleDateString()}</p>
        </div>
        <Divider color="blue" />
        <div className="w-full">
          <h3>{t('stepFour.rideInfo.departureTime')}</h3>
          <p>{form.values.pickupTime}</p>
        </div>
        <Divider color="blue" />
        <div className="w-full">
          <h3>{t('stepFour.rideInfo.numberOfPassengers')}</h3>
          <p>{form.values.passengers}</p>
        </div>
        <Divider color="blue" />
        <div className="w-full">
          <h3>{t('stepFour.rideInfo.luggage')}</h3>
          <p>{form.values.suitcases}</p>
        </div>
      </div>

      <div className="w-full p-5 border border-solid border-primary bg-section-bg font-sans rounded-md shadow-lg mt-5 md:mt-0">
        <h2>{t('stepFour.contactBillingInfo.title')}</h2>
        <div className="w-full">
          <h3>{t('stepFour.contactBillingInfo.name')}</h3>
          <p>{`${form.values.firstName} ${form.values.lastName}`}</p>
          <Divider size="xs" color="blue" />
        </div>
        <div className="w-full">
          <h3>{t('stepFour.contactBillingInfo.email')}</h3>
          <p>{form.values.email}</p>
          <Divider size="xs" color="blue" />
        </div>
        <div className="w-full">
          <h3>{t('stepFour.contactBillingInfo.phoneNo')}</h3>
          <p>{form.values.contactNo}</p>
          <Divider size="xs" color="blue" />
        </div>
        <div className="w-full">
          <h3>{t('stepFour.contactBillingInfo.rideCharges')}</h3>
          <p>€{form.values.estimatedPrice}</p>
          <Divider size="xs" color="blue" />
        </div>
        <div className="w-full">
          <h3>{t('stepFour.contactBillingInfo.paymentMethod')}</h3>
          <SegmentedControl
            size="md"
            color="blue"
            data={["paypal","cash","card"]}
            value={form.values.paymentMethod}
            onChange={(value) => form.setFieldValue('paymentMethod', value)}
          />
        </div>
        <div className="w-full h-74">
          <GoogleMap
            mapContainerStyle={containerStyle}
            zoom={12}
            center={defaultCenter}
            onLoad={(map) => {
              console.log('Map loaded:', map);
            }}
          >
            {directionResult && <DirectionsRenderer directions={directionResult} />}
          </GoogleMap>
        </div>
      </div>
    </div>
  );
};


export default StepFour;