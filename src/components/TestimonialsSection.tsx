"use client"

import { cn } from "@/lib/utils"
import { TestimonialCard, TestimonialAuthor } from "@/components/ui/testimonial-card"
import { useTranslations } from "next-intl"

interface TestimonialsSectionProps {
  className?: string
}

export function TestimonialsSection({ 
  className 
}: TestimonialsSectionProps) {
  const t = useTranslations("testimonials")
  
  const testimonials = [
    {
      author: {
        name: t("testimonial1.author.name"),
        handle: t("testimonial1.author.handle"),
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
      },
      text: t("testimonial1.text")
    },
    {
      author: {
        name: t("testimonial2.author.name"),
        handle: t("testimonial2.author.handle"),
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      text: t("testimonial2.text")
    },
    {
      author: {
        name: t("testimonial3.author.name"),
        handle: t("testimonial3.author.handle"),
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
      },
      text: t("testimonial3.text")
    },
    {
      author: {
        name: t("testimonial4.author.name"),
        handle: t("testimonial4.author.handle"),
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      text: t("testimonial4.text")
    },
    {
      author: {
        name: t("testimonial5.author.name"),
        handle: t("testimonial5.author.handle"),
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
      },
      text: t("testimonial5.text")
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