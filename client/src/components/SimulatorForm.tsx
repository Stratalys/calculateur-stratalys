import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { simulatorInputSchema, type SimulatorInput, secteurOptions } from "@shared/schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SimulatorFormProps {
  onSubmit: (data: SimulatorInput) => void;
}

export default function SimulatorForm({ onSubmit }: SimulatorFormProps) {
  const form = useForm<SimulatorInput>({
    resolver: zodResolver(simulatorInputSchema),
    defaultValues: {
      budget: undefined,
      valeurClient: undefined,
      secteur: undefined,
    },
  });

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
          Découvrez votre{" "}
          <span className="text-primary bg-gradient-to-r from-primary to-violet-600 bg-clip-text text-transparent">
            Potentiel de Croissance
          </span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed text-muted-foreground px-4">
          Utilisez ce simulateur simple pour comprendre combien de clients vous devez acquérir pour rentabiliser votre marketing et commencer à générer des bénéfices.
        </p>
      </div>

      <div className="border-2 border-primary/30 rounded-2xl p-6 sm:p-8 bg-white/95 backdrop-blur-sm shadow-xl">
        <div className="mb-6">
          <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2 text-foreground">
            <span className="text-primary text-xl sm:text-2xl">📋</span>
            Étape 1/2 : Vos informations
          </h2>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base font-medium text-foreground">
                    Mon budget marketing mensuel
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="number"
                        placeholder="500"
                        className="h-12 sm:h-14 text-base sm:text-lg pr-12 bg-white border-2 border-border text-foreground focus:border-primary transition-colors"
                        data-testid="input-budget"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                        value={field.value ?? ""}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                        €
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="valeurClient"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base font-medium text-foreground">
                    Ce que me rapporte un client (en moyenne)
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="number"
                        placeholder="250"
                        className="h-12 sm:h-14 text-base sm:text-lg pr-12 bg-white border-2 border-border text-foreground focus:border-primary transition-colors"
                        data-testid="input-valeur-client"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                        value={field.value ?? ""}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                        €
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="secteur"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base font-medium text-foreground">
                    Mon secteur d'activité
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-12 sm:h-14 text-base sm:text-lg bg-white border-2 border-border text-foreground focus:border-primary transition-colors" data-testid="select-secteur">
                        <SelectValue placeholder="Services (Consultant, Coach...)" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {secteurOptions.map((secteur) => (
                        <SelectItem key={secteur} value={secteur}>
                          {secteur}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full h-12 sm:h-14 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 mt-6 sm:mt-8"
              data-testid="button-voir-resultats"
            >
              Voir mes résultats
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
