import {
  ActionIcon,
  Button,
  NativeSelect,
  rem,
  TextInput,
} from "@mantine/core";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconClock, IconLocation } from "@tabler/icons-react";
import React, { useRef, useState } from "react";
import {useTranslations} from 'next-intl';

const CalculatePrice = () => {
  const t  = useTranslations();
  const [passenger, setPassenger] = useState("");
  const [isReturn, setIsReturn] = useState<boolean>(false);
  const ref = useRef<HTMLInputElement>(null);
  const pickerControl = (
    <ActionIcon
      variant="subtle"
      color="gray"
      onClick={() => ref.current?.showPicker()}
    >
      {" "}
      <IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
    </ActionIcon>
  );
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      PickUpLocation: "",
      DropOffLocation: "",
    },
    validate: {},
  });
  const formProp = form;

  return (
    <div className="w-full border-solid border-orange-400 bg-yellow-50">
      <form onSubmit={formProp.onSubmit((values) => console.log(values))}>
        <div className="flex justify-center gap-3 mt-3">
          <Button
            color="orange"
            onClick={() => setIsReturn(false)}
            className={`${
              !isReturn
                ? "bg-orange-400 text-white"
                : "bg-white text-orange-400"
            } border-orange-500`}
          >
            {t("calculate_price_oneway")}
          </Button>
          <Button
            className={`${
              isReturn
                ? "bg-orange-400 text-white"
                : "bg-white text-orange-400 border-orange-400"
            }`}
            onClick={() => setIsReturn(true)}
          >
            {t("calculate_price_return")}
          </Button>
        </div>
        <TextInput
          withAsterisk
          className="p-2"
          label={t("calculate_price_pickup_location_label")}
          leftSection={
            <IconLocation style={{ width: rem(16), height: rem(16) }} />
          }
          placeholder={t("calculate_price_pickup_location_placeholder")}
          key={formProp.key("PickUpLocation")}
          {...formProp.getInputProps("PickUpLocation")}
        />
        <TextInput
          withAsterisk
          className="p-2"
          label={t("calculate_price_dropoff_location_label")}
          leftSection={
            <IconLocation style={{ width: rem(16), height: rem(16) }} />
          }
          placeholder={t("calculate_price_dropoff_location_placeholder")}
          key={formProp.key("DropOffLocation")}
          {...formProp.getInputProps("DropOffLocation")}
        />
        <div className="w-full flex justify-evenly items-center">
          <DatePickerInput
            label={t("calculate_price_pickup_date_label")}
            placeholder={t("calculate_price_pickup_date_placeholder")}
            className="w-2/6"
          />
          <TimeInput
            label={t("calculate_price_pick_time_label")}
            className="w-3/6"
            color="orange"
            ref={ref}
            rightSection={pickerControl}
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
              color="orange"
              ref={ref}
              rightSection={pickerControl}
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
            data={[
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "10",
              "11",
              "12",
              "13",
              "15",
            ]}
          />
        </div>
        <div className="flex justify-center items-center mt-7 mb-5">
          <Button color="orange">{t("calculate_price_calculate_fare_button")}</Button>
        </div>
      </form>
    </div>
  );
};

export default CalculatePrice;
