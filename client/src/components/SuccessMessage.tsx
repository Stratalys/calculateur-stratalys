import { CheckCircle, Rocket } from "lucide-react";

export default function SuccessMessage() {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6">
      <div className="bg-white border-2 border-primary/40 p-8 sm:p-10 rounded-2xl shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col items-center text-center gap-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary flex items-center justify-center shadow-lg">
            <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
          </div>
          <div className="space-y-3">
            <h4 className="font-bold text-foreground text-2xl sm:text-3xl flex items-center justify-center gap-3">
              <span>Merci !</span>
              <Rocket className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
            </h4>
            <p className="text-foreground text-lg sm:text-xl font-medium">
              Je vous recontacte bientôt
            </p>
            <div className="pt-4 border-t border-gray-200">
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-md mx-auto">
                Votre demande a bien été envoyée. Je reviendrai vers vous très rapidement pour discuter de votre stratégie de croissance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
