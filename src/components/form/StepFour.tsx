import { Divider, SegmentedControl } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { GoogleMap, useJsApiLoader, DirectionsRenderer } from '@react-google-maps/api';
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
  const [paypalLoaded, setPaypalLoaded] = useState(false);

  useEffect(() => {
    const fetchDirections = async () => {
      try {
        const directionsService = new google.maps.DirectionsService();
        const result = await directionsService.route({
          origin: form.values.pickUpLocation,
          destination: form.values.dropOffLocation,
          travelMode: google.maps.TravelMode.DRIVING,
        });
        setDirectionResult(result); // Store the result in state
      } catch (error) {
        console.error('Error fetching directions:', error);
      }
    };

    if (form.values.pickUpLocation && form.values.dropOffLocation) {
      fetchDirections();
    }
  }, [form.values.pickUpLocation, form.values.dropOffLocation]);

  useEffect(() => {
    // Load PayPal SDK dynamically
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=USD`;
    script.addEventListener('load', () => setPaypalLoaded(true));
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const selectedCar = carsArray.find(car => car.id === form.values.selectedCar);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ['places'],
  });

  const containerStyle = {
    width: '100%',
    height: '300px',
  };

  const defaultCenter = { lat: 50.110924, lng: 8.682127 }; // Default center if no location is provided


  if (!isLoaded) return <span>Loading...</span>;

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
        <div className="w-full">
          <h3>Payment Method</h3>
          <SegmentedControl
            size="md"
            color="orange"
            data={['Paypal', 'Cash']}
            value={form.values.paymentMethod}
            onChange={(value) => form.setFieldValue('paymentMethod', value)}
          />
        </div>
        {(form.values.paymentMethod === 'Paypal' || form.values.paymentMethod === 'Card') && paypalLoaded && (
          <div className="w-full mt-5">
            <h3>Pay with {form.values.paymentMethod === 'Paypal' ? 'PayPal' : 'Card'}</h3>
            <div id="paypal-button-container"></div>
            <script>
              {`
                paypal.Buttons({
                  createOrder: (data: any, actions: any) => {
                    return actions.order.create({
                      purchase_units: [{
                        amount: {
                          value: '${form.values.estimatedPrice}',
                        },
                      }],
                    });
                  },
                  onApprove: (data: any, actions: any) => {
                    return actions.order.capture().then((details: any) => {
                      handlePaymentSuccess(details);
                    });
                  },
                }).render('#paypal-button-container');
              `}
            </script>
          </div>
        )}
        {form.values.paymentMethod === 'Cash' && (
          <div className="w-full mt-5">
            <h3>Pay with Cash</h3>
            <p>Please pay the driver in cash upon arrival.</p>
          </div>
        )}
        <div className='w-full h-74'>
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