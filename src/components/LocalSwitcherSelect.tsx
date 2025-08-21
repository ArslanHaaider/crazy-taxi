"use client";

// import {CheckIcon, LanguageIcon} from '@heroicons/react/24/solid';
import * as Select from "@radix-ui/react-select";
import clsx from "clsx";
import { useState, useTransition } from "react";
import { Locale } from "@/i18n/config";
import { setUserLocale } from "@/services/locale";
import { IconCheck, IconLanguage } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

type Props = {
  defaultValue: string;
  items: Array<{ value: string; label: string }>;
  label: string;
};

export default function LocaleSwitcherSelect({ defaultValue, items, label }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState<string>(defaultValue);

  async function onChange(nextValue: string) {
    const locale = nextValue as Locale;
    setValue(nextValue); // update UI immediately
    startTransition(async () => {
      try {
        await setUserLocale(locale);
        router.refresh();
      } catch (e) {
        // revert on error
        setValue(defaultValue);
        console.error("Failed to set locale", e);
      }
    });
  }

  return (
    <div className="relative">
      <Select.Root value={value} onValueChange={onChange}>
        <Select.Trigger
          aria-label={label}
          className={clsx(
            "rounded-sm p-2 transition-colors hover:bg-slate-200",
            isPending && "pointer-events-none opacity-60"
          )}
        >
          <Select.Icon>
            <IconLanguage className="h-6 w-6 text-slate-600 transition-colors group-hover:text-slate-900" />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            align="end"
            className="min-w-[8rem] overflow-hidden rounded-sm bg-white py-1 shadow-md"
            position="popper"
          >
            <Select.Viewport>
              {items.map((item) => (
                <Select.Item
                  key={item.value}
                  className="flex cursor-default items-center px-3 py-2 text-base data-[highlighted]:bg-slate-100"
                  value={item.value}
                >
                  <div className="mr-2 w-[1rem]">
                    {item.value === value && (
                      <IconCheck className="h-5 w-5 text-slate-600" />
                    )}
                  </div>
                  <span className="text-slate-900">{item.label}</span>
                </Select.Item>
              ))}
            </Select.Viewport>
            <Select.Arrow className="fill-white text-white" />
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}