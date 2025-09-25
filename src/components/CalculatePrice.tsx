'use client'
import {
  ActionIcon, Autocomplete, Button, NativeSelect, rem,
} from "@mantine/core";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconClock, IconLocation } from "@tabler/icons-react";
import React, { useRef, useState, useEffect } from "react";
import { useTranslations } from 'next-intl';
import { useAutocompleteSuggestions } from "@/hooks/useAutocompleteSuggestion";

// Generic kilometer-based pricing formula
const calculatePrice = (distanceInKm: number, passengers: number = 1, isReturn: boolean = false): number => {
  const baseRate = 2.5 // €2.50 per km base rate
  const passengerMultiplier = passengers > 4 ? 1.3 : 1.0 // 30% extra for larger vehicles
  const returnMultiplier = isReturn ? 1.8 : 1.0 // 80% extra for return trips (not double to account for efficiency)
  const minimumFare = 15 // Minimum fare of €15
  
  const calculatedPrice = distanceInKm * baseRate * passengerMultiplier * returnMultiplier
  return Math.max(calculatedPrice, minimumFare)
}

interface TripDetails {
  distance: number
  duration: string
  estimatedPrice: number
}

const CalculatePrice = () => {
  const t = useTranslations("forms.rideDetails");
  const [isReturn, setIsReturn] = useState(false);
  const [tripDetails, setTripDetails] = useState<TripDetails | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // local queries for autocomplete
  const [pickupQuery, setPickupQuery] = useState("");
  const [dropoffQuery, setDropoffQuery] = useState("");
  
  // hooks for both inputs
  const {
    suggestions: pickupSuggestions,
    isLoading: isLoadingPickup,
    resetSession: resetPickupSession,
  } = useAutocompleteSuggestions(pickupQuery);
  const {
    suggestions: dropoffSuggestions,
    isLoading: isLoadingDropoff,
    resetSession: resetDropoffSession,
  } = useAutocompleteSuggestions(dropoffQuery);

  const pickerControl = useRef<HTMLInputElement>(null);

  const form = useForm({
    initialValues: {
      PickUpLocation: "",
      DropOffLocation: "",
      date: new Date(),
      time: new Date(),
      passengers: 1,
      suitcases: 0,
    },
  });

  const handleTimeChange = (value: Date) => {
    form.setFieldValue('time', value);
  };

  const handleDateChange = (value: Date) => {
    form.setFieldValue('date', value);
  };

  const handlePassengersChange = (value: number | string) => {
    form.setFieldValue('passengers', Number(value));
  };

  const handleSuitcasesChange = (value: number | string) => {
    form.setFieldValue('suitcases', Number(value));
  };

  const calculateFare = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.values.PickUpLocation || !form.values.DropOffLocation) {
      alert('Please enter both pickup and dropoff locations');
      return;
    }

    if (!window.google) {
      alert('Google Maps API is not loaded');
      return;
    }

    setIsCalculating(true);
    
    try {
      const directionsService = new google.maps.DirectionsService();
      const result = await directionsService.route({
        origin: form.values.PickUpLocation,
        destination: form.values.DropOffLocation,
        travelMode: google.maps.TravelMode.DRIVING,
      });
      
      if (result.routes[0]) {
        const distance = result.routes[0].legs[0].distance?.value || 0; // in meters
        const duration = result.routes[0].legs[0].duration?.text || '';
        const distanceInKm = distance / 1000;
        
        const estimatedPrice = calculatePrice(
          distanceInKm, 
          form.values.passengers,
          isReturn
        );
        
        setTripDetails({
          distance,
          duration,
          estimatedPrice: Math.round(estimatedPrice)
        });
      }
    } catch (error) {
      console.error('Error calculating distance:', error);
      alert('Error calculating fare. Please try again.');
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="w-full md:w-1/2">
        <form onSubmit={calculateFare}>
          <div className="flex justify-center gap-3 mt-3">
            <Button
              type="button"
              color="blue"
              variant={!isReturn ? 'filled' : 'outline'}
              onClick={() => setIsReturn(false)}
            >
              {t("tripType.oneWay")}
            </Button>
            <Button
              type="button"
              color="blue"
              variant={isReturn ? 'filled' : 'outline'}
              onClick={() => setIsReturn(true)}
            >
              {t("tripType.return")}
            </Button>
          </div>

          <Autocomplete
            withAsterisk
            className="p-2"
            label={t("pickupLocation.label")}
            leftSection={<IconLocation style={{ width: rem(16), height: rem(16) }} />}
            placeholder={t("pickupLocation.placeholder")}
            data={pickupSuggestions.map(({ placePrediction }) => ({
              value: placePrediction?.text?.text || "",
              label: placePrediction?.text?.text || "",
            }))}
            value={form.values.PickUpLocation}
            onChange={(value) => {
              form.setFieldValue('PickUpLocation', value);
              setPickupQuery(value);
              setTripDetails(null); // Reset trip details when location changes
            }}
            id="PickUpLocation"
          />

          <Autocomplete
            withAsterisk
            className="p-2"
            label={t("dropoffLocation.label")}
            leftSection={<IconLocation style={{ width: rem(16), height: rem(16) }} />}
            placeholder={t("dropoffLocation.placeholder")}
            data={dropoffSuggestions.map(({ placePrediction }) => ({
              value: placePrediction?.text?.text || "",
              label: placePrediction?.text?.text || "",
            }))}
            value={form.values.DropOffLocation}
            onChange={(value) => {
              form.setFieldValue('DropOffLocation', value);
              setDropoffQuery(value);
              setTripDetails(null); // Reset trip details when location changes
            }}
            id="DropOffLocation"
          />

          <div className="w-full flex justify-evenly items-center">
            <DatePickerInput
              label={t("pickupDate.label")}
              placeholder={t("pickupDate.placeholder")}
              className="w-2/6"
              value={form.values.date}
              onChange={(value) => handleDateChange(value || new Date())}
            />
            <TimeInput
              label={t("pickupTime.label")}
              className="w-3/6"
              color="blue"
              ref={pickerControl}
              rightSection={
                <ActionIcon onClick={() => pickerControl.current?.showPicker()} variant="subtle" color="gray">
                  <IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                </ActionIcon>
              }
              value={form.values.time.toLocaleTimeString()}
              onChange={(e) => handleTimeChange(new Date(`1970-01-01T${e.target.value}`))}
            />
          </div>

          {isReturn && (
            <div className="w-full flex justify-evenly items-center">
              <DatePickerInput
                label={t("returnDate.label")}
                placeholder={t("returnDate.placeholder")}
                className="w-2/6"
              />
              <TimeInput
                label={t("returnTime.label")}
                className="w-3/6"
                color="blue"
                ref={pickerControl}
                rightSection={
                  <ActionIcon onClick={() => pickerControl.current?.showPicker()} variant="subtle" color="gray">
                    <IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                  </ActionIcon>
                }
              />
            </div>
          )}

          <div className="w-full flex justify-evenly items-center">
            <NativeSelect
              value={form.values.passengers.toString()}
              label={t("passengers.label")}
              className="w-2/6"
              onChange={(e) => {
                handlePassengersChange(e.target.value);
                setTripDetails(null); // Reset trip details when passengers change
              }}
              data={["1", "2", "3", "4", "5", "6", "7", "8"]}
            />
            <NativeSelect
              value={form.values.suitcases.toString()}
              label={t("suitcases.label")}
              className="w-3/6"
              onChange={(e) => handleSuitcasesChange(e.target.value)}
              data={["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "15"]}
            />
          </div>

          <div className="flex justify-center items-center mt-7 mb-5">
            <Button 
              type="submit" 
              color="blue" 
              loading={isCalculating}
              disabled={!form.values.PickUpLocation || !form.values.DropOffLocation}
            >
              {t("calculateFare")}
            </Button>
          </div>
        </form>
      </div>

      {/* Trip Details Display */}
      <div className="w-full md:w-1/2">
        {tripDetails && (
          <div className="bg-card/70 backdrop-blur rounded-lg border border-border p-6 shadow-lg mt-8 md:mt-0">
            <h3 className="text-lg font-semibold mb-4">Trip Details</h3>
            
            <div className="space-y-3">
              <div>
                <p className="text-muted-foreground text-sm">From</p>
                <p className="font-medium">{form.values.PickUpLocation}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">To</p>
                <p className="font-medium">{form.values.DropOffLocation}</p>
              </div>
              
              <div className="grid grid-cols-3 gap-2 pt-2">
                <div>
                  <p className="text-muted-foreground text-sm">Distance</p>
                  <p className="font-medium">{(tripDetails.distance/1000).toFixed(1)} km</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Duration</p>
                  <p className="font-medium">{tripDetails.duration}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Passengers</p>
                  <p className="font-medium">{form.values.passengers}</p>
                </div>
              </div>
              
              {isReturn && (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                  <p className="text-blue-700 dark:text-blue-300 text-sm font-medium">Return Trip</p>
                  <p className="text-blue-600 dark:text-blue-400 text-xs">Price includes return journey</p>
                </div>
              )}
              
              <div className="border-t border-border pt-3 mt-4">
                <p className="text-muted-foreground text-sm">Estimated Price</p>
                <p className="text-3xl font-bold text-primary">€{tripDetails.estimatedPrice}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Base rate: €2.50/km {form.values.passengers > 4 && '• Large vehicle: +30%'} {isReturn && '• Return trip: +80%'}
                </p>
              </div>
            </div>
          </div>
        )}
        
        {!tripDetails && (
          <div className="bg-muted/30 rounded-lg border border-dashed border-border p-6 shadow-sm mt-8 md:mt-0 text-center">
            <p className="text-muted-foreground">Enter trip details and click "Calculate Fare" to see pricing</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalculatePrice;