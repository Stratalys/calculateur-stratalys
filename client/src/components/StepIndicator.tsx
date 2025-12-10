interface StepIndicatorProps {
  currentStep: 1 | 2;
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="w-full max-w-md mx-auto mb-6 sm:mb-8 px-4 sm:px-0">
      <div className="flex items-center justify-between">
        {/* Step 1 */}
        <div className="flex items-center flex-1">
          <div
            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-semibold text-sm sm:text-base transition-all duration-300 ${
              currentStep >= 1
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-muted text-muted-foreground"
            }`}
          >
            1
          </div>
          <div className="flex-1 h-1 mx-2 sm:mx-3 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                currentStep >= 2 ? "bg-primary" : "bg-transparent"
              }`}
            />
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex items-center">
          <div
            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-semibold text-sm sm:text-base transition-all duration-300 ${
              currentStep >= 2
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-muted text-muted-foreground"
            }`}
          >
            2
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="flex items-center justify-between mt-2 sm:mt-3 px-1">
        <span
          className={`text-xs sm:text-sm font-medium transition-colors ${
            currentStep >= 1 ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          Informations
        </span>
        <span
          className={`text-xs sm:text-sm font-medium transition-colors ${
            currentStep >= 2 ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          Résultats
        </span>
      </div>
    </div>
  );
}
