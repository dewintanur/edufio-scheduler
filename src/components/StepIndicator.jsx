const steps = [
  "Pendaftaran",
  "Pilih tanggal",
  "Detail sesi",
  "Ringkasan",
]

function StepIndicator({ currentStep }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1
          const isActive = stepNumber === currentStep
          const isCompleted = stepNumber < currentStep

          return (
            <div
              key={step}
              className="flex flex-1 items-center"
            >
              <div className="flex flex-col items-center">
                <div
                  className={`
                    flex h-8 w-8 items-center justify-center rounded-full
                    text-sm font-semibold
                    ${
                      isActive || isCompleted
                        ? "bg-[#026C7A] text-white"
                        : "bg-[#E3E3E4] text-[#242829]/50"
                    }
                  `}
                >
                  {stepNumber}
                </div>

                <span
                  className={`
                    mt-2 text-center text-[10px]
                    ${
                      isActive
                        ? "font-semibold text-[#026C7A]"
                        : "text-[#242829]/50"
                    }
                  `}
                >
                  {step}
                </span>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={`
                    mx-2 mb-6 h-px flex-1
                    ${
                      stepNumber < currentStep
                        ? "bg-[#026C7A]"
                        : "bg-[#E3E3E4]"
                    }
                  `}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default StepIndicator