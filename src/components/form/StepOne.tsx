"use client";
import {
  ActionIcon,
  Autocomplete,
  NumberInput,
  SegmentedControl,
  rem,
} from "@mantine/core";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { UseFormReturnType } from "@mantine/form";
import { IconClock, IconLocation } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { useAutocompleteSuggestions } from "@/hooks/useAutocompleteSuggestion";

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

const StepOne = ({ form }: { form: UseFormReturnType<FormValues> }) => {
  // local queries for autocomplete
  const [pickupQuery, setPickupQuery] = useState("");
  const [dropoffQuery, setDropoffQuery] = useState("");
  const [selected, setSelected] = useState<any>(null);
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

  const t = useTranslations("forms.rideDetails");
  const ref = useRef<HTMLInputElement>(null);
  const [timeMode, setTimeMode] = useState<"ASAP" | "SCHEDULE">("ASAP");

  // Prefill date/time for ASAP and keep valid
  useEffect(() => {
    if (timeMode === "ASAP") {
      const now = new Date();
      form.setFieldValue("pickupDate", now);
      const hh = String(now.getHours()).padStart(2, "0");
      const mm = String(now.getMinutes()).padStart(2, "0");
      form.setFieldValue("pickupTime", `${hh}:${mm}`);
    }
  }, [timeMode]);
  const pickerControl = (
    <ActionIcon
      variant="subtle"
      color="gray"
      onClick={() => ref.current?.showPicker()}
    >
      <IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
    </ActionIcon>
  );

  return (
    <div className="w-full rounded-xl border border-border bg-card/60 p-3 md:p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Pickup with suggestions */}
        <div className="relative">
          <Autocomplete
            withAsterisk
            className="p-2"
            label={t("pickupLocation.label")}
            leftSection={
              <IconLocation style={{ width: rem(16), height: rem(16) }} />
            }
            placeholder={t("pickupLocation.placeholder")}
            data={pickupSuggestions.map(({ placePrediction }) => ({
              value: placePrediction?.text?.text || "",
              label: placePrediction?.text?.text || "",
            }))}
            value={form.values.pickUpLocation}
            onChange={(value) => {
              form.setFieldValue("pickUpLocation", value);
              setPickupQuery(value);
            }}
            onFocus={() => {
              // prime suggestions when focusing existing value
              setPickupQuery(form.values.pickUpLocation || "");
            }}
            onOptionSubmit={(value) => {
              form.setFieldValue("pickUpLocation", value);
              // Find the selected suggestion for additional data if needed
              const selectedSuggestion = pickupSuggestions.find(
                ({ placePrediction }) => placePrediction?.text?.text === value
              );
              if (selectedSuggestion) {
                console.log(selectedSuggestion.placePrediction);
              }
            }}
            error={form.errors.pickUpLocation}

            limit={10}
          />
          </div>

          {/* Dropoff with suggestions */}
          <div className="relative">
            <Autocomplete
              withAsterisk
              className="p-2"
              label={t("dropoffLocation.label")}
              leftSection={
                <IconLocation style={{ width: rem(16), height: rem(16) }} />
              }
              placeholder={t("dropoffLocation.placeholder")}
              data={dropoffSuggestions.map(({ placePrediction }) => ({
                value: placePrediction?.text?.text || "",
                label: placePrediction?.text?.text || "",
              }))}
              value={form.values.dropOffLocation}
              onChange={(value) => {
                form.setFieldValue("dropOffLocation", value);
                setDropoffQuery(value);
              }}
              onFocus={() => {
                setDropoffQuery(form.values.dropOffLocation || "");
              }}
              onOptionSubmit={(value) => {
                form.setFieldValue("dropOffLocation", value);
                // Find the selected suggestion for additional data if needed
                const selectedSuggestion = dropoffSuggestions.find(
                  ({ placePrediction }) => placePrediction?.text?.text === value
                );
                if (selectedSuggestion) {
                  console.log(selectedSuggestion.placePrediction);
                }
              }}
              error={form.errors.dropOffLocation}
          
              limit={10}
            />
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row gap-3 items-start md:items-center mt-3">
          <div className="md:w-1/3">
            <label className="block text-sm mb-1">Time</label>
            <SegmentedControl
              fullWidth
              value={timeMode}
              onChange={(v) => setTimeMode(v as "ASAP" | "SCHEDULE")}
              data={[
                { value: "ASAP", label: t("asap") },
                { value: "SCHEDULE", label: t("schedule") },
              ]}
            />
          </div>
          <DatePickerInput
            label={t("pickupDate.label")}
            placeholder={t("pickupDate.placeholder")}
            className="md:w-1/3 w-full"
            withAsterisk
            disabled={timeMode === "ASAP"}
            {...form.getInputProps("pickupDate")}
          />
          <TimeInput
            label={t("pickupTime.label")}
            className="md:w-1/3 w-full"
            color="orange"
            ref={ref}
            rightSection={pickerControl}
            withAsterisk
            disabled={timeMode === "ASAP"}
            {...form.getInputProps("pickupTime")}
          />
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
          <NumberInput
            label={t("passengers.label")}
            className="w-full"
            min={1}
            max={8}
            step={1}
            value={parseInt(form.values.passengers || "1")}
            onChange={(v) => form.setFieldValue("passengers", String(v || 1))}
          />
          <NumberInput
            label={t("suitcases.label")}
            className="w-full"
            min={0}
            max={12}
            step={1}
            value={parseInt(form.values.suitcases || "1")}
            onChange={(v) => form.setFieldValue("suitcases", String(v || 0))}
          />
        </div>
      </div>
  );
};

export default StepOne;
