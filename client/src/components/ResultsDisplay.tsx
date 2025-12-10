import { type CalculatedResults } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { Info } from "lucide-react";

interface ResultsDisplayProps {
  results: CalculatedResults;
}

export default function ResultsDisplay({ results }: ResultsDisplayProps) {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("fr-FR").format(Math.round(num));
  };

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.round(num));
  };

  const formatPercentage = (num: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "percent",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num / 100);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 sm:space-y-8 px-4 sm:px-6">
      {/* Objectif principal */}
      <div className="bg-gradient-to-br from-primary via-primary to-violet-600 p-6 sm:p-8 md:p-10 rounded-2xl border-2 border-primary/50 shadow-2xl">
        <div className="text-center text-primary-foreground">
          <p className="text-base sm:text-lg md:text-xl mb-3 sm:mb-4 opacity-95 font-medium">
            Pour être rentable, votre objectif est de trouver
          </p>
          <div className="text-5xl sm:text-6xl md:text-7xl font-bold mb-3 sm:mb-4 drop-shadow-lg" data-testid="text-objectif-clients">
            {formatNumber(results.objectifClients)}
          </div>
          <p className="text-base sm:text-lg md:text-xl opacity-95 font-medium">
            nouveaux clients / mois
          </p>
          <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-primary-foreground/20">
            <p className="text-xs sm:text-sm opacity-80">
              Formule : Budget ÷ Valeur client = {formatNumber(results.objectifClients)} clients minimum
            </p>
          </div>
        </div>
      </div>

      {/* Scénarios */}
      <div>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4 sm:mb-6 text-foreground">
          Votre potentiel de croissance
        </h3>
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Scénario Réaliste */}
          <Card className="p-5 sm:p-6 bg-white/95 backdrop-blur-sm border-2 border-cyan-500/50 shadow-lg hover:shadow-xl transition-all duration-300" data-testid="card-scenario-realiste">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h4 className="text-lg sm:text-xl font-semibold flex items-center gap-2 text-foreground">
                <span className="text-xl sm:text-2xl">🚀</span>
                Scénario Réaliste
              </h4>
              <div className="px-2 sm:px-3 py-1 bg-cyan-500/10 rounded-full">
                <span className="text-xs sm:text-sm font-semibold text-cyan-700">
                  +{results.scenarioRealiste.pourcentage}%
                </span>
              </div>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <div className="pb-3 sm:pb-4 border-b border-border">
                <p className="text-sm sm:text-base text-muted-foreground mb-1">Clients acquis</p>
                <p className="text-2xl sm:text-3xl font-bold text-foreground" data-testid="text-realiste-clients">
                  {formatNumber(results.scenarioRealiste.clients)}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Objectif × {1 + results.scenarioRealiste.pourcentage / 100}
                </p>
              </div>
              <div className="pb-3 sm:pb-4 border-b border-border">
                <p className="text-sm sm:text-base text-muted-foreground mb-1">Chiffre d'affaires</p>
                <p className="text-2xl sm:text-3xl font-bold text-foreground" data-testid="text-realiste-ca">
                  {formatCurrency(results.scenarioRealiste.ca)}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Clients × Valeur client
                </p>
              </div>
              <div className="pb-3 sm:pb-4 border-b border-border">
                <p className="text-sm sm:text-base text-muted-foreground mb-1">Bénéfice net</p>
                <p className="text-2xl sm:text-3xl font-bold text-primary" data-testid="text-realiste-benefice">
                  {formatCurrency(results.scenarioRealiste.benefice)}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  CA - Budget
                </p>
              </div>
              <div className="pt-2 sm:pt-3 bg-primary/5 rounded-lg p-3 sm:p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Info className="w-4 h-4 text-primary" />
                  <p className="text-xs sm:text-sm font-semibold text-foreground">ROI</p>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-primary">
                  {formatPercentage(results.scenarioRealiste.roi)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  (Bénéfice ÷ Budget) × 100
                </p>
              </div>
            </div>
          </Card>

          {/* Scénario Optimiste */}
          <Card className="p-5 sm:p-6 bg-white/95 backdrop-blur-sm border-2 border-violet-500/50 shadow-lg hover:shadow-xl transition-all duration-300" data-testid="card-scenario-optimiste">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h4 className="text-lg sm:text-xl font-semibold flex items-center gap-2 text-foreground">
                <span className="text-xl sm:text-2xl">✨</span>
                Scénario Optimiste
              </h4>
              <div className="px-2 sm:px-3 py-1 bg-violet-500/10 rounded-full">
                <span className="text-xs sm:text-sm font-semibold text-violet-700">
                  +{results.scenarioOptimiste.pourcentage}%
                </span>
              </div>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <div className="pb-3 sm:pb-4 border-b border-border">
                <p className="text-sm sm:text-base text-muted-foreground mb-1">Clients acquis</p>
                <p className="text-2xl sm:text-3xl font-bold text-foreground" data-testid="text-optimiste-clients">
                  {formatNumber(results.scenarioOptimiste.clients)}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Objectif × {1 + results.scenarioOptimiste.pourcentage / 100}
                </p>
              </div>
              <div className="pb-3 sm:pb-4 border-b border-border">
                <p className="text-sm sm:text-base text-muted-foreground mb-1">Chiffre d'affaires</p>
                <p className="text-2xl sm:text-3xl font-bold text-foreground" data-testid="text-optimiste-ca">
                  {formatCurrency(results.scenarioOptimiste.ca)}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Clients × Valeur client
                </p>
              </div>
              <div className="pb-3 sm:pb-4 border-b border-border">
                <p className="text-sm sm:text-base text-muted-foreground mb-1">Bénéfice net</p>
                <p className="text-2xl sm:text-3xl font-bold text-primary" data-testid="text-optimiste-benefice">
                  {formatCurrency(results.scenarioOptimiste.benefice)}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  CA - Budget
                </p>
              </div>
              <div className="pt-2 sm:pt-3 bg-primary/5 rounded-lg p-3 sm:p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Info className="w-4 h-4 text-primary" />
                  <p className="text-xs sm:text-sm font-semibold text-foreground">ROI</p>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-primary">
                  {formatPercentage(results.scenarioOptimiste.roi)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  (Bénéfice ÷ Budget) × 100
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
