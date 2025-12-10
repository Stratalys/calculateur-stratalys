import { CheckCircle, Rocket } from "lucide-react";

export default function SuccessMessage() {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6">
      <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-violet-600/10 border-2 border-primary/30 p-6 sm:p-8 rounded-2xl animate-in fade-in slide-in-from-bottom-4 duration-500 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary/20 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
            </div>
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-foreground text-lg sm:text-xl mb-2 flex items-center gap-2">
              Merci ! Je vous recontacte bientôt
              <Rocket className="w-5 h-5 sm:w-6 sm:h-6 text-primary inline-block" />
            </h4>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Votre demande a bien été envoyée. Je reviendrai vers vous très rapidement pour discuter de votre stratégie de croissance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
