'use client'
import { ActionIcon, NumberInput, SegmentedControl, rem, TextInput } from '@mantine/core';
import { DatePickerInput, TimeInput } from '@mantine/dates';
import { UseFormReturnType } from '@mantine/form';
import { Autocomplete, useJsApiLoader } from '@react-google-maps/api';
import { IconClock, IconLocation } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

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
  const t = useTranslations();
  const ref = useRef<HTMLInputElement>(null);
  const [originRef, setOriginRef] = useState<google.maps.places.Autocomplete | null>(null);
  const [destinationRef, setDestinationRef] = useState<google.maps.places.Autocomplete | null>(null);
  const [timeMode, setTimeMode] = useState<'ASAP' | 'SCHEDULE'>('ASAP');

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ['places'],
    region: 'DE',
    language: 'de',
  });

  const FIXED_ROUTES = new Map([
    ['Raunheim', 21],
    ['Rüsselsheim a. M.', 25],
    ['Rüsselsheim/Königstädten', 27],
    ['Bauschheim', 30],
    ['Bischofsheim', 30],
    ['Trebur', 30],
    ['Astheim', 30],
    ['Nauheim', 30],
    ['Groß Gerau', 35],
    ['Hochheim', 33],
    ['Flörsheim a. M.', 25],
    ['Flörsheim/Wicker', 28],
    ['Flörsheim/Weilbach', 38],
    ['Massenheim', 33],
    ['Wallerstädten', 35],
    ['Geinsheim', 40],
    ['Hessenau', 40],
    ['Gustavsburg', 33],
    ['Ginsheim', 35]
  ]);
  
  // Helper function to extract city name from full address
  const extractCity = (address: string): string | null => {
    // Common German address patterns
    const patterns = [
      /(?:,\s*)?(\w+(?:\/\w+)?(?:\s+a\.\s*M\.)?)\s*(?:,|$)/,  // Matches city names with possible variations
      /(?:,\s*)?(\d{4,5})\s+(\w+(?:\/\w+)?(?:\s+a\.\s*M\.)?)/  // Matches postal code + city
    ];
  
    for (const pattern of patterns) {
      const match = address.match(pattern);
      if (match) {
        // If we matched a postal code pattern, return the city part
        return (match as string[])[2] || (match as string[])[1];
      }
    }
    return null;
  };
  
  const calculatePrice = (originAddress: string, destinationAddress: string, distanceInMeters: number): number => {
    // Try to find fixed price based on destination city
    const destinationCity = extractCity(destinationAddress);
    
    if (destinationCity && FIXED_ROUTES.has(destinationCity)) {
      return FIXED_ROUTES.get(destinationCity)!;
    }
  
    // Fallback to distance-based calculation for unknown routes
    const distanceInKm = distanceInMeters / 1000;
    let basePrice = 0;
  
    if (distanceInKm <= 50) {
      basePrice = Math.max(21, distanceInKm * 1.5); // Minimum 21€
    } else if (distanceInKm <= 99) {
      basePrice = distanceInKm * 1.3;
    } else {
      basePrice = distanceInKm;
    }

    return Math.ceil(basePrice); // Round up to nearest euro
  };
  
  // Updated route calculation function
  const calculateRoute = async () => {
    if (!originRef || !destinationRef) {
      console.error('References not initialized');
      return;
    }
  
    const originPlace = originRef.getPlace();
    const destinationPlace = destinationRef.getPlace();
  
    if (!originPlace?.formatted_address || !destinationPlace?.formatted_address) {
      console.error('Invalid addresses');
      return;
    }
    
    // Only calculate if both locations are set
    if (!form.values.pickUpLocation || !form.values.dropOffLocation) {
      return;
    }
    
    try {
      const service = new google.maps.DistanceMatrixService();
      const result = await service.getDistanceMatrix({
        origins: [originPlace.formatted_address],
        destinations: [destinationPlace.formatted_address],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false,
      });
  
      if (result.rows[0].elements[0].status === "OK") {
        const distance = result.rows[0].elements[0].distance.value;
        const duration = result.rows[0].elements[0].duration.text;
        const price = calculatePrice(
          originPlace.formatted_address,
          destinationPlace.formatted_address,
          distance
        );
        console.log('Route calculated:', { distance, duration, price });
        form.setFieldValue('distance', distance);
        form.setFieldValue('duration', duration);
        form.setFieldValue('estimatedPrice', price);
      } else {
        console.error('Route calculation failed:', result.rows[0].elements[0].status);
        // Reset values if calculation fails
        form.setFieldValue('distance', undefined);
        form.setFieldValue('duration', undefined);
        form.setFieldValue('estimatedPrice', undefined);
      }
    } catch (error) {
      console.error('Error calculating route:', error);
      // Reset values if calculation fails
      form.setFieldValue('distance', undefined);
      form.setFieldValue('duration', undefined);
      form.setFieldValue('estimatedPrice', undefined);
    }
  };

  const pickerControl = (
    <ActionIcon variant="subtle" color="gray" onClick={() => ref.current?.showPicker()}>
      <IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
    </ActionIcon>
  );

  // Prefill date/time for ASAP and keep valid
  useEffect(() => {
    if (timeMode === 'ASAP') {
      const now = new Date();
      form.setFieldValue('pickupDate', now);
      // format HH:mm for TimeInput text value
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      form.setFieldValue('pickupTime', `${hh}:${mm}`);
    }
  }, [timeMode, form]);

  if (loadError) {
    return <div>Error loading Google Maps. Please check your API key and try again.</div>;
  }

  if (!isLoaded) {
    return <div>Loading Google Maps...</div>;
  }
  return (
    <div className="w-full rounded-xl border border-border bg-card/60 p-3 md:p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Autocomplete
          onLoad={(ref) => {
            setOriginRef(ref);
            // Restrict to Germany
            if (ref) {
              ref.setComponentRestrictions({ country: 'de' });
              ref.setFields(['formatted_address', 'geometry', 'place_id']);
            }
          }}
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
            label={t('pickupLocation.label')}
            leftSection={<IconLocation style={{ width: rem(16), height: rem(16) }} />}
            placeholder={t('pickupLocation.placeholder')}
            {...form.getInputProps('pickUpLocation')}
          />
        </Autocomplete>

        <Autocomplete
          onLoad={(ref) => {
            setDestinationRef(ref);
            // Restrict to Germany
            if (ref) {
              ref.setComponentRestrictions({ country: 'de' });
              ref.setFields(['formatted_address', 'geometry', 'place_id']);
            }
          }}
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
            label={t('dropOffLocation.label')}
            leftSection={<IconLocation style={{ width: rem(16), height: rem(16) }} />}
            placeholder={t('dropOffLocation.placeholder')}
            {...form.getInputProps('dropOffLocation')}
          />
        </Autocomplete>
      </div>

      <div className="w-full flex flex-col md:flex-row gap-3 items-start md:items-center mt-3">
        <div className="md:w-1/3">
          <label className="block text-sm mb-1">Time</label>
          <SegmentedControl
            fullWidth
            value={timeMode}
            onChange={(v) => setTimeMode(v as 'ASAP' | 'SCHEDULE')}
            data={[{ label: 'ASAP', value: 'ASAP' }, { label: 'Schedule', value: 'SCHEDULE' }]}
          />
        </div>
        <DatePickerInput
          label={t('pickupDate.label')}
          placeholder={t('pickupDate.placeholder')}
          className="md:w-1/3 w-full"
          withAsterisk
          disabled={timeMode === 'ASAP'}
          {...form.getInputProps('pickupDate')}
        />
        <TimeInput
          label={t('pickupTime.label')}
          className="md:w-1/3 w-full"
          color="orange"
          ref={ref}
          rightSection={pickerControl}
          withAsterisk
          disabled={timeMode === 'ASAP'}
          {...form.getInputProps('pickupTime')}
        />
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
        <NumberInput
          label={t('passengers.label')}
          className="w-full"
          min={1}
          max={8}
          step={1}
          value={parseInt(form.values.passengers || '1')}
          onChange={(v) => form.setFieldValue('passengers', String(v || 1))}
        />
        <NumberInput
          label={t('suitcases.label')}
          className="w-full"
          min={0}
          max={12}
          step={1}
          value={parseInt(form.values.suitcases || '1')}
          onChange={(v) => form.setFieldValue('suitcases', String(v || 0))}
        />
      </div>
    </div>
  );
};

export default StepOne;