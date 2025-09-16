"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface HeroTextContainerProps {
  title?: string
  description?: string
  emailPlaceholder?: string
  buttonText?: string
  waitlistText?: string
  onEmailSubmit?: (email: string) => void
  className?: string
}

const HeroTextContainer = React.forwardRef<HTMLDivElement, HeroTextContainerProps>(
  ({
    title = "The last time you will ever update a CRM.",
    description = "Get a perfectly accurate, up-to-the-second source of truth without the busywork. Free your team to focus on customers, not data entry",
    emailPlaceholder = "Email",
    buttonText = "Join",
    waitlistText = "Join the waitlist",
    onEmailSubmit,
    className,
    ...props
  }, ref) => {
    const [email, setEmail] = React.useState("")

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      if (email && onEmailSubmit) {
        onEmailSubmit(email)
      }
    }

    return (
      <div
        ref={ref}
        className={cn(
          "content-stretch flex flex-col gap-[24px] items-start justify-start relative w-full",
          className
        )}
        data-node-id="74:83"
        {...props}
      >
        {/* Text Container */}
        <div className="content-stretch flex flex-col gap-[36px] items-start justify-start leading-[0] relative shrink-0 w-full" data-name="Text Container" data-node-id="37:1179">
          {/* Main Heading */}
          <div className="flex flex-col font-serif h-[234px] justify-center not-italic relative shrink-0 text-[#141413] text-[72px] tracking-[-2.88px] w-full" data-node-id="37:1180">
            <p className="leading-[84px]">{title}</p>
          </div>

          {/* Description */}
          <div className="font-sans font-normal relative shrink-0 text-[#bcb9b9] text-[24px] tracking-[-0.48px] w-[613px]" data-node-id="37:1181">
            <p className="leading-[36px]">{description}</p>
          </div>
        </div>

        {/* Input Section */}
        <div className="content-stretch flex flex-col gap-[6px] items-start justify-start relative shrink-0" data-name="input" data-node-id="37:1182">
          {/* Empty label space */}
          <div className="font-medium leading-[0] not-italic relative shrink-0 text-[14px] text-nowrap text-slate-900" id="node-I37_1182-2_270">
            <p className="leading-[20px] whitespace-pre">&nbsp;</p>
          </div>

          {/* Input with Button */}
          <form onSubmit={handleSubmit} className="content-stretch flex gap-[8px] items-start justify-start relative shrink-0 w-[384px]" data-name="input/with button" id="node-I37_1182-6_262">
            {/* Input Field */}
            <div className="basis-0 content-stretch flex flex-col gap-[6px] grow items-start justify-start min-h-px min-w-px relative shrink-0" data-name="default" id="node-I37_1182-6_263">
              <div className="bg-white box-border content-stretch flex items-center justify-start pl-[12px] pr-[56px] py-[8px] relative rounded-[6px] shrink-0 w-full" data-name="field" id="node-I37_1182-6_264">
                <div aria-hidden="true" className="absolute border border-slate-300 border-solid inset-[-1px] pointer-events-none rounded-[7px]" />
                <Input
                  type="email"
                  placeholder={emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="font-sans font-normal leading-[0] relative shrink-0 text-[16px] text-nowrap text-slate-400 border-0 p-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none placeholder:text-slate-400"
                  id="node-I37_1182-6_265"
                  required
                />
              </div>
            </div>

            {/* Join Button */}
            <Button
              type="submit"
              className="bg-slate-900 box-border content-stretch flex gap-[10px] items-center justify-center px-[16px] py-[8px] relative rounded-[6px] shrink-0 hover:bg-slate-800 border-0"
              data-name="button"
              id="node-I37_1182-6_268"
              disabled={!email.trim()}
            >
              <div className="font-medium leading-[0] relative shrink-0 text-[14px] text-nowrap text-white" id="node-I37_1182-6_269">
                <p className="leading-[24px] whitespace-pre">{buttonText}</p>
              </div>
            </Button>
          </form>

          {/* Waitlist Text */}
          <div className="font-sans font-normal leading-[0] relative shrink-0 text-[14px] text-nowrap text-slate-500" id="node-I37_1182-2_273">
            <p className="leading-[20px] whitespace-pre">{waitlistText}</p>
          </div>
        </div>
      </div>
    )
  }
)

HeroTextContainer.displayName = "HeroTextContainer"

export { HeroTextContainer }
export type { HeroTextContainerProps }