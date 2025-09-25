"use client"

import { cn } from "@/lib/utils"
import { TestimonialCard } from "@/components/ui/testimonial-card"
import { useTranslations } from "next-intl"
import { useState, useEffect } from "react"
import { useForm } from "@mantine/form"
import { Autocomplete, NumberInput, rem } from "@mantine/core"
import { DatePickerInput, TimeInput } from "@mantine/dates"
import { SegmentedControl } from "@mantine/core"
import { IconLocation } from "@tabler/icons-react"
import { useAutocompleteSuggestions } from "@/hooks/useAutocompleteSuggestion"

interface TestimonialsSectionProps {
  className?: string
}

interface TripFormValues {
  pickUpLocation: string
  dropOffLocation: string
  pickupDate: Date | null
  pickupTime: string
  passengers: string
  suitcases: string
  distance?: number
  duration?: string
  estimatedPrice?: number
}

// Generic kilometer-based pricing formula
const calculatePrice = (distanceInKm: number, passengers: number = 1, selectedCar: string = "5 seater"): number => {
  const baseRate = 2.5 // €2.50 per km base rate
  const passengerMultiplier = passengers > 4 ? 1.3 : 1.0 // 30% extra for larger vehicles
  const carMultiplier = selectedCar === "7 seater" ? 1.5 : 1.0 // 50% extra for 7-seater
  const minimumFare = 15 // Minimum fare of €15
  
  const calculatedPrice = distanceInKm * baseRate * passengerMultiplier * carMultiplier
  return Math.max(calculatedPrice, minimumFare)
}

export function TestimonialsSection({ 
  className 
}: TestimonialsSectionProps) {
  const t = useTranslations("testimonials")
  
  // Trip summary form state
  const [timeMode, setTimeMode] = useState<"ASAP" | "SCHEDULE">("ASAP")
  const [pickupQuery, setPickupQuery] = useState("")
  const [dropoffQuery, setDropoffQuery] = useState("")
  
  // Autocomplete hooks
  const {
    suggestions: pickupSuggestions,
  } = useAutocompleteSuggestions(pickupQuery)
  
  const {
    suggestions: dropoffSuggestions,
  } = useAutocompleteSuggestions(dropoffQuery)

  const tripForm = useForm<TripFormValues>({
    initialValues: {
      pickUpLocation: '',
      dropOffLocation: '',
      pickupDate: null,
      pickupTime: '',
      passengers: '1',
      suitcases: '1',
      distance: 0,
      duration: '',
      estimatedPrice: 0,
    }
  })

  // Calculate distance and price when locations change
  useEffect(() => {
    const calculateDistanceAndPrice = async () => {
      if (tripForm.values.pickUpLocation && tripForm.values.dropOffLocation && window.google) {
        try {
          const directionsService = new google.maps.DirectionsService()
          const result = await directionsService.route({
            origin: tripForm.values.pickUpLocation,
            destination: tripForm.values.dropOffLocation,
            travelMode: google.maps.TravelMode.DRIVING,
          })
          
          if (result.routes[0]) {
            const distance = result.routes[0].legs[0].distance?.value || 0 // in meters
            const duration = result.routes[0].legs[0].duration?.text || ''
            const distanceInKm = distance / 1000
            
            const estimatedPrice = calculatePrice(
              distanceInKm, 
              parseInt(tripForm.values.passengers), 
              parseInt(tripForm.values.passengers) > 4 ? "7 seater" : "5 seater"
            )
            
            tripForm.setValues({
              ...tripForm.values,
              distance,
              duration,
              estimatedPrice: Math.round(estimatedPrice)
            })
          }
        } catch (error) {
          console.error('Error calculating distance:', error)
        }
      }
    }

    calculateDistanceAndPrice()
  }, [tripForm.values.pickUpLocation, tripForm.values.dropOffLocation, tripForm.values.passengers, tripForm])

  // Trip Summary Component
  const TripSummary = () => (
    <div className="bg-card/70 backdrop-blur rounded-lg border border-border p-6 shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Trip Summary</h3>
      
      {/* Location Inputs */}
      <div className="space-y-4 mb-4">
        <Autocomplete
          label="Pickup Location"
          placeholder="Enter pickup location"
          leftSection={<IconLocation style={{ width: rem(16), height: rem(16) }} />}
          data={pickupSuggestions.map(({ placePrediction }) => ({
            value: placePrediction?.text?.text || "",
            label: placePrediction?.text?.text || "",
          }))}
          value={tripForm.values.pickUpLocation}
          onChange={(value) => {
            tripForm.setFieldValue('pickUpLocation', value)
            setPickupQuery(value)
          }}
        />
        
        <Autocomplete
          label="Dropoff Location"
          placeholder="Enter dropoff location"
          leftSection={<IconLocation style={{ width: rem(16), height: rem(16) }} />}
          data={dropoffSuggestions.map(({ placePrediction }) => ({
            value: placePrediction?.text?.text || "",
            label: placePrediction?.text?.text || "",
          }))}
          value={tripForm.values.dropOffLocation}
          onChange={(value) => {
            tripForm.setFieldValue('dropOffLocation', value)
            setDropoffQuery(value)
          }}
        />
      </div>

      {/* Time Selection */}
      <div className="mb-4">
        <label className="block text-sm mb-2">Time</label>
        <SegmentedControl
          fullWidth
          value={timeMode}
          onChange={(v) => setTimeMode(v as "ASAP" | "SCHEDULE")}
          data={[
            { value: "ASAP", label: "ASAP" },
            { value: "SCHEDULE", label: "Schedule" },
          ]}
        />
      </div>

      {/* Date and Time Inputs */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <DatePickerInput
          label="Pickup Date"
          placeholder="Select date"
          disabled={timeMode === "ASAP"}
          {...tripForm.getInputProps("pickupDate")}
        />
        <TimeInput
          label="Pickup Time"
          disabled={timeMode === "ASAP"}
          {...tripForm.getInputProps("pickupTime")}
        />
      </div>

      {/* Passengers and Suitcases */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <NumberInput
          label="Passengers"
          min={1}
          max={8}
          step={1}
          value={parseInt(tripForm.values.passengers || "1")}
          onChange={(v) => tripForm.setFieldValue("passengers", String(v || 1))}
        />
        <NumberInput
          label="Suitcases"
          min={0}
          max={12}
          step={1}
          value={parseInt(tripForm.values.suitcases || "1")}
          onChange={(v) => tripForm.setFieldValue("suitcases", String(v || 0))}
        />
      </div>

      {/* Trip Details Display */}
      <div className="space-y-2 border-t border-border pt-4">
        <div>
          <p className="text-muted-foreground text-sm">From</p>
          <p className="font-medium">{tripForm.values.pickUpLocation || '—'}</p>
        </div>
        <div>
          <p className="text-muted-foreground text-sm">To</p>
          <p className="font-medium">{tripForm.values.dropOffLocation || '—'}</p>
        </div>
        <div className="grid grid-cols-3 gap-2 pt-2">
          <div>
            <p className="text-muted-foreground text-sm">Distance</p>
            <p className="font-medium">{tripForm.values.distance ? `${(tripForm.values.distance/1000).toFixed(1)} km` : '—'}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">ETA</p>
            <p className="font-medium">{tripForm.values.duration || '—'}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Passengers</p>
            <p className="font-medium">{tripForm.values.passengers}</p>
          </div>
        </div>
        <div className="border-t border-border pt-3 mt-2">
          <p className="text-muted-foreground text-sm">Estimated price</p>
          <p className="text-2xl font-bold">{tripForm.values.estimatedPrice ? `€${tripForm.values.estimatedPrice}` : '—'}</p>
        </div>
      </div>
    </div>
  )
  
  const testimonials = [
    {
      author: {
        name: t("reviews.emma.author.name"),
        handle: t("reviews.emma.author.handle"),
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
      },
      text: t("reviews.emma.text")
    },
    {
      author: {
        name: t("reviews.michael.author.name"),
        handle: t("reviews.michael.author.handle"),
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      text: t("reviews.michael.text")
    },
    {
      author: {
        name: t("reviews.sarah.author.name"),
        handle: t("reviews.sarah.author.handle"),
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
      },
      text: t("reviews.sarah.text")
    },
    {
      author: {
        name: t("reviews.david.author.name"),
        handle: t("reviews.david.author.handle"),
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      text: t("reviews.david.text")
    },
    {
      author: {
        name: t("reviews.lisa.author.name"),
        handle: t("reviews.lisa.author.handle"),
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
      },
      text: t("reviews.lisa.text")
    }
  ]

  return (
    <section 
      id="testimonials"
      className={cn(
        "bg-background text-foreground",
        "py-12 sm:py-24 md:py-32 px-0",
        className
      )}
    >
      <div className="mx-auto flex max-w-container flex-col items-center gap-4 text-center sm:gap-16">
        <div className="flex flex-col items-center gap-4 px-4 sm:gap-8">
          <h2 className="max-w-[720px] text-display-md font-semibold leading-tight">
          {t("title")}
        </h2>
        <p className="text-body-lg max-w-[600px] font-medium text-muted-foreground">
            {t("description")}
          </p>
        </div>

        {/* Trip Summary Section */}
        <div className="w-full max-w-md px-4 mb-8">
          <TripSummary />
        </div>

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <div className="group flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)] flex-row [--duration:40s]">
            <div className="flex shrink-0 [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]">
              {/* First set of testimonials */}
              {testimonials.map((testimonial, i) => (
                <TestimonialCard 
                  key={`set1-${i}`}
                  {...testimonial}
                />
              ))}
              {/* Duplicate set for seamless loop */}
              {testimonials.map((testimonial, i) => (
                <TestimonialCard 
                  key={`set2-${i}`}
                  {...testimonial}
                />
              ))}
            </div>
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/3 bg-gradient-to-r from-background sm:block" />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-l from-background sm:block" />
        </div>
      </div>
    </section>
  )
}