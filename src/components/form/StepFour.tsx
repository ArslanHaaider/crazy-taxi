// StepFour.tsx
import { Divider, SegmentedControl } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';


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

const StepFour = ({ form }: { form: UseFormReturnType<FormValues> }) => {
  const selectedCar = carsArray.find(car => car.id === form.values.selectedCar);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ['places'],
  });
  const containerStyle = {
    width: '100%',
    height: '300px',
  };
  const defaultCenter = form.values.pickUpLocation ? form.values.pickUpLocation : { lat: 50.110924, lng: 8.682127};
//   const defaultCenter = {
//     lat: 37.7749, // Default latitude (example: San Francisco)
//     lng: -122.4194, // Default longitude
//   };
  if (!isLoaded) return <span>Loading...</span>;

  // Calculate total
//   const rideCharges = selectedCar ? parseInt(selectedCar.cost.replace('$', '')) : 0;
//   const bookingFee = 3;
//   const tax = Math.round(rideCharges * 0.1);
//   const total = rideCharges + bookingFee + tax;

  return (
    <div className="w-full md:flex gap-5">
      <div className="w-full p-5 border border-solid border-orange-500 bg-yellow-50 font-sans rounded-md shadow-lg">
        <h2>Ride info</h2>
        <div className="w-full">
          <h3>Ride Type</h3>
          <p>One Way</p>
        </div>
        <Divider color="orange" />
        <div className="w-full">
          <h3>Car Model</h3>
          <p>{selectedCar?.name || 'Not selected'}</p>
        </div>
        <Divider color="orange" />
        <div className="w-full">
          <h3>From</h3>
          <p>{form.values.pickUpLocation}</p>
        </div>
        <Divider color="orange" />
        <div className="w-full">
          <h3>To</h3>
          <p>{form.values.dropOffLocation}</p>
        </div>
        <Divider color="orange" />
        <div className="w-full">
          <h3>Departure Date</h3>
          <p>{form.values.pickupDate?.toLocaleDateString()}</p>
        </div>
        <Divider color="orange" />
        <div className="w-full">
          <h3>Departure Time</h3>
          <p>{form.values.pickupTime}</p>
        </div>
        <Divider color="orange" />
        <div className="w-full">
          <h3>Number of Passengers</h3>
          <p>{form.values.passengers}</p>
        </div>
        <Divider color="orange" />
        <div className="w-full">
          <h3>Luggage</h3>
          <p>{form.values.suitcases}</p>
        </div>
      </div>

      <div className="w-full p-5 border border-solid border-orange-500 bg-yellow-50 font-sans rounded-md shadow-lg mt-5 md:mt-0">
        <h2>Contact and Billing Info</h2>
        <div className="w-full">
          <h3>Name</h3>
          <p>{`${form.values.firstName} ${form.values.lastName}`}</p>
          <Divider size="xs" color="orange" />
        </div>
        <div className="w-full">
          <h3>Email</h3>
          <p>{form.values.email}</p>
          <Divider size="xs" color="orange" />
        </div>
        <div className="w-full">
          <h3>Phone No</h3>
          <p>{form.values.contactNo}</p>
          <Divider size="xs" color="orange" />
        </div>
        <div className="w-full">
          <h3>Ride Charges</h3>
          <p>${form.values.estimatedPrice}</p>
          <Divider size="xs" color="orange" />
        </div>
        {/* <div className="w-full">
          <h3>Booking Fee</h3>
          <p>${bookingFee}</p>
          <Divider size="xs" color="orange" />
        </div>
        <div className="w-full">
          <h3>Tax</h3>
          <p>${tax}</p>
          <Divider size="xs" color="orange" />
        </div>
        <div className="w-full">
          <h3>Total</h3>
          <p>${total}</p>
          <Divider size="xs" color="orange" />
        </div> */}
        <div className="w-full">
          <h3>Payment Method</h3>
          <SegmentedControl
            size="md"
            color="orange"
            data={['Paypal', 'Card', 'Cash']}
            value={form.values.paymentMethod}
            onChange={(value) => form.setFieldValue('paymentMethod', value)}
          />
        </div>
            <div className='w-full h-74'>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={defaultCenter}
              zoom={12}
              onLoad={(map) => {
                console.log('Map loaded:', map);
              }}
            />
            </div>
      </div>
    </div>
  );
};

export default StepFour;