'use client'
import {
  ActionIcon, Button, NativeSelect, rem, TextInput, Text,
} from "@mantine/core";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconClock, IconLocation } from "@tabler/icons-react";
import React, { useRef, useState } from "react";
import { useTranslations } from 'next-intl';
import { Autocomplete, useJsApiLoader } from '@react-google-maps/api';

const CalculatePrice = () => {
  const t = useTranslations();
  const [passenger, setPassenger] = useState("");
  const [isReturn, setIsReturn] = useState(false);
  const [originRef, setOriginRef] = useState<google.maps.places.Autocomplete | null>(null);
  const [destinationRef, setDestinationRef] = useState<google.maps.places.Autocomplete | null>(null);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState(0);
  
  const ref = useRef<HTMLInputElement | null>(null);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ['places'],
    region: 'DE',
    language: 'de',
  });

  const form = useForm({
    initialValues: {
      PickUpLocation: "",
      DropOffLocation: "",
    },
  });

  const calculatePrice = (distanceInMeters:number) => {
    const distanceInKm = distanceInMeters / 1000;
    let basePrice = 0;

    if (distanceInKm <= 50) basePrice = distanceInKm * 1.5;
    else if (distanceInKm <= 99) basePrice = distanceInKm * 1.3;
    else basePrice = distanceInKm;

    return isReturn ? basePrice * 2 : basePrice;
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
      setDistance(result.rows[0].elements[0].distance.value);
      setDuration(result.rows[0].elements[0].duration.text);
      setPrice(calculatePrice(result.rows[0].elements[0].distance.value));
    }
  };

  if (loadError) return <span>Error loading Google Maps. Please check your API key and try again.</span>;
  if (!isLoaded) return <span>Loading Google Maps...</span>;

  return (
    <div className="w-full border-solid border-blue-800 bg-yellow-50">
      <form onSubmit={(e) => {
        e.preventDefault();
        calculateRoute();
      }}>
        <div className="flex justify-center gap-3 mt-3">
          <Button
            color="blue"
            onClick={() => setIsReturn(false)}
            className={`${!isReturn ? "bg-blue-400 text-white" : "bg-white text-blue-400"} border-blue-500`}
          >
            {t("calculate_price_oneway")}
          </Button>
          <Button
            className={`${isReturn ? "bg-blue-400 text-white" : "bg-white text-blue-400 border-blue-400"}`}
            onClick={() => setIsReturn(true)}
          >
            {t("calculate_price_return")}
          </Button>
        </div>

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
            const place = originRef!.getPlace();
            form.setFieldValue("PickUpLocation", place.formatted_address!);
          }}
        >
          <TextInput
            withAsterisk
            className="p-2"
            label={t("calculate_price_pickup_location_label")}
            leftSection={<IconLocation style={{ width: rem(16), height: rem(16) }} />}
            placeholder={t("calculate_price_pickup_location_placeholder")}
            {...form.getInputProps("PickUpLocation")}
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
            const place = destinationRef!.getPlace();
            form.setFieldValue("DropOffLocation", place.formatted_address!);
          }}
        >
          <TextInput
            withAsterisk
            className="p-2"
            label={t("calculate_price_dropoff_location_label")}
            leftSection={<IconLocation style={{ width: rem(16), height: rem(16) }} />}
            placeholder={t("calculate_price_dropoff_location_placeholder")}
            {...form.getInputProps("DropOffLocation")}
          />
        </Autocomplete>

        <div className="w-full flex justify-evenly items-center">
          <DatePickerInput
            label={t("calculate_price_pickup_date_label")}
            placeholder={t("calculate_price_pickup_date_placeholder")}
            className="w-2/6"
          />
          <TimeInput
            label={t("calculate_price_pick_time_label")}
            className="w-3/6"
            color="blue"
            ref={ref}
            rightSection={
              <ActionIcon variant="subtle" color="gray" onClick={() => ref.current?.showPicker?.()}>
                <IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
              </ActionIcon>
            }
          />
        </div>

        {isReturn && (
          <div className="w-full flex justify-evenly items-center">
            <DatePickerInput
              label={t("calculate_price_return_date_label")}
              placeholder={t("calculate_price_return_date_placeholder")}
              className="w-2/6"
            />
            <TimeInput
              label={t("calculate_price_return_time_label")}
              className="w-3/6"
              color="blue"
              ref={ref}
              rightSection={
                <ActionIcon variant="subtle" color="gray" onClick={() => ref.current?.showPicker()}>
                  <IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                </ActionIcon>
              }
            />
          </div>
        )}

        <div className="w-full flex justify-evenly items-center">
          <NativeSelect
            value={passenger}
            label={t("calculate_price_passenger_label")}
            className="w-2/6"
            onChange={(event) => setPassenger(event.currentTarget.value)}
            data={["1", "2", "3", "4", "5", "6", "7", "8"]}
          />
          <NativeSelect
            value={passenger}
            label={t("calculate_price_suitcase_label")}
            className="w-3/6"
            onChange={(event) => setPassenger(event.currentTarget.value)}
            data={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "15"]}
          />
        </div>

        <div className="flex justify-center items-center mt-7 mb-5">
          <Button type="submit" color="blue">{t("calculate_price_calculate_fare_button")}</Button>
        </div>

        {distance >= 0 && (
          <div className="p-4 bg-white rounded-lg shadow mx-2">
            <Text size="lg" className="font-bold text-center mb-2">Trip Details</Text>
            <div className="space-y-2">
              <Text>Distance: {(distance / 1000).toFixed(1)} km</Text>
              <Text>Duration: {duration}</Text>
              <Text className="text-xl font-bold text-blue-500">
                Price: €{price.toFixed(2)}
              </Text>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default CalculatePrice;