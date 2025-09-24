'use client'
import {
  ActionIcon, Autocomplete, Button, NativeSelect, rem,
} from "@mantine/core";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconClock, IconLocation } from "@tabler/icons-react";
import React, { useRef, useState } from "react";
import { useTranslations } from 'next-intl';
import { useAutocompleteSuggestions } from "@/hooks/useAutocompleteSuggestion";

const CalculatePrice = () => {
  const t = useTranslations("forms.rideDetails");
  const [isReturn, setIsReturn] = useState(false);

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

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="w-full md:w-1/2">
        <form>
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
              onChange={(e) => handlePassengersChange(e.target.value)}
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
            <Button type="submit" color="blue">{t("calculateFare")}</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CalculatePrice;