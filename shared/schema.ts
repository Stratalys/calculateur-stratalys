import { z } from "zod";

export const secteurOptions = [
  "Services (Consultant, Coach...)",
  "E-commerce",
  "Artisan & Création",
  "Restauration & Hôtellerie",
  "Immobilier",
  "Santé & Bien-être",
  "Autre",
] as const;

export const timingOptions = [
  "Le plus vite possible",
  "D'ici 3 mois",
  "Simple curiosité pour le moment",
] as const;

export const helpLevelOptions = [
  "Des conseils pour me guider",
  "Une prise en charge complète",
  "Je ne sais pas encore",
] as const;

export const simulatorInputSchema = z.object({
  budget: z.number().min(1, "Le budget doit être supérieur à 0"),
  valeurClient: z.number().min(1, "La valeur client doit être supérieure à 0"),
  secteur: z.enum(secteurOptions),
});

export const contactFormSchema = z.object({
  nom: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Email invalide").min(1, "L'email est requis"),
  defi: z.string().min(10, "Veuillez décrire votre défi (minimum 10 caractères)"),
  timing: z.enum(timingOptions),
  helpLevel: z.enum(helpLevelOptions),
  budget: z.number(),
  valeurClient: z.number(),
  secteur: z.string(),
});

export type SimulatorInput = z.infer<typeof simulatorInputSchema>;
export type ContactForm = z.infer<typeof contactFormSchema>;

export interface CalculatedResults {
  objectifClients: number;
  scenarioRealiste: {
    clients: number;
    ca: number;
    benefice: number;
    pourcentage: number;
    roi: number; // ROI en pourcentage
  };
  scenarioOptimiste: {
    clients: number;
    ca: number;
    benefice: number;
    pourcentage: number;
    roi: number; // ROI en pourcentage
  };
}

/**
 * Formules de calcul ROI clarifiées :
 * 
 * 1. Objectif clients = Budget / Valeur client (arrondi au supérieur)
 *    → Nombre minimum de clients pour atteindre le seuil de rentabilité
 * 
 * 2. Scénario Réaliste : +10% à +30% de clients supplémentaires
 *    → Clients = Objectif × (1 + pourcentage/100)
 *    → CA = Clients × Valeur client
 *    → Bénéfice = CA - Budget
 *    → ROI = (Bénéfice / Budget) × 100
 * 
 * 3. Scénario Optimiste : +50% à +100% de clients supplémentaires
 *    → Même logique que réaliste avec pourcentages plus élevés
 */
