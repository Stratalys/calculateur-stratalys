import { useState, useMemo } from "react";
import emailjs from "@emailjs/browser";
import StepIndicator from "@/components/StepIndicator";
import SimulatorForm from "@/components/SimulatorForm";
import ResultsDisplay from "@/components/ResultsDisplay";
import ContactFormSection from "@/components/ContactFormSection";
import SuccessMessage from "@/components/SuccessMessage";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { type SimulatorInput, type ContactForm, type CalculatedResults } from "@shared/schema";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default function Home() {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [simulatorData, setSimulatorData] = useState<SimulatorInput | null>(null);
  const [results, setResults] = useState<CalculatedResults | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  /**
   * Calcule les résultats avec formules de ROI claires
   * 
   * Formules utilisées :
   * - Objectif clients = Budget / Valeur client (arrondi au supérieur)
   * - Scénario Réaliste : +10% à +30% de clients supplémentaires
   * - Scénario Optimiste : +50% à +100% de clients supplémentaires
   * - ROI = (Bénéfice / Budget) × 100
   */
  const calculateResults = (data: SimulatorInput): CalculatedResults => {
    // Objectif minimum : nombre de clients pour atteindre le seuil de rentabilité
    const objectifClients = Math.ceil(data.budget / data.valeurClient);
    
    // Scénario Réaliste : +10% à +30% de clients supplémentaires
    const realisteMin = 10;
    const realisteMax = 30;
    const realistePourcentage = Math.floor(Math.random() * (realisteMax - realisteMin + 1)) + realisteMin;
    const realisteClients = Math.round(objectifClients * (1 + realistePourcentage / 100));
    const realisteCA = realisteClients * data.valeurClient;
    const realisteBenefice = realisteCA - data.budget;
    const realisteROI = (realisteBenefice / data.budget) * 100;

    // Scénario Optimiste : +50% à +100% de clients supplémentaires
    const optimisteMin = 50;
    const optimisteMax = 100;
    const optimistePourcentage = Math.floor(Math.random() * (optimisteMax - optimisteMin + 1)) + optimisteMin;
    const optimisteClients = Math.round(objectifClients * (1 + optimistePourcentage / 100));
    const optimisteCA = optimisteClients * data.valeurClient;
    const optimisteBenefice = optimisteCA - data.budget;
    const optimisteROI = (optimisteBenefice / data.budget) * 100;

    return {
      objectifClients,
      scenarioRealiste: {
        clients: realisteClients,
        ca: realisteCA,
        benefice: realisteBenefice,
        pourcentage: realistePourcentage,
        roi: realisteROI,
      },
      scenarioOptimiste: {
        clients: optimisteClients,
        ca: optimisteCA,
        benefice: optimisteBenefice,
        pourcentage: optimistePourcentage,
        roi: optimisteROI,
      },
    };
  };

  const handleSimulatorSubmit = (data: SimulatorInput) => {
    console.log("Simulator data:", data);
    setSimulatorData(data);
    const calculatedResults = calculateResults(data);
    setResults(calculatedResults);
    setCurrentStep(2);
    setShowSuccess(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleContactSubmit = async (data: ContactForm) => {
    console.log("Contact form data:", data);
    
    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_vovu2fs";
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_hayzlz4";
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "SSsXQK_jDSH9Cuqyw";

      const templateParams = {
        nom: data.nom,
        email: data.email,
        defi: data.defi,
        timing: data.timing,
        helpLevel: data.helpLevel,
        budget: data.budget.toString(),
        valeurClient: data.valeurClient.toString(),
        secteur: data.secteur,
      };

      const result = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      console.log("Successfully sent via EmailJS:", result);
      
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'ads_conversion_submit_lead_form', {
          'event_callback': function() {
            setShowSuccess(true);
            window.scrollTo({ top: 0, behavior: "smooth" });
          },
          'event_timeout': 2000,
        });
        console.log("Google Ads conversion tracked");
      } else {
        setShowSuccess(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (error) {
      console.error("EmailJS error:", error);
      alert("Une erreur s'est produite lors de l'envoi. Veuillez réessayer.");
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
    setShowSuccess(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background gradients - optimisés pour mobile */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#4A3AFD]/20 via-background to-[#4A3AFD]/10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] bg-[#4A3AFD]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-[#4A3AFD]/8 rounded-full blur-3xl" />
      
      <div className="relative container mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12">
        {currentStep === 2 && (
          <div className="mb-4 sm:mb-6">
            <Button
              variant="ghost"
              onClick={handleBack}
              className="gap-2 text-sm sm:text-base"
              data-testid="button-retour"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour
            </Button>
          </div>
        )}

        <StepIndicator currentStep={currentStep} />

        <div className="transition-all duration-300">
          {currentStep === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <SimulatorForm onSubmit={handleSimulatorSubmit} />
            </div>
          )}

          {currentStep === 2 && results && simulatorData && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6 sm:space-y-8">
              <div className="flex items-center justify-between mb-4 sm:mb-6 px-4 sm:px-0">
                <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2 text-foreground">
                  <span className="text-primary text-2xl sm:text-3xl">📈</span>
                  Étape 2/2 : Vos résultats
                </h2>
              </div>

              {showSuccess ? (
                <SuccessMessage />
              ) : (
                <>
                  <ResultsDisplay results={results} />
                  <ContactFormSection
                    budget={simulatorData.budget}
                    valeurClient={simulatorData.valeurClient}
                    secteur={simulatorData.secteur}
                    onSubmit={handleContactSubmit}
                  />
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
