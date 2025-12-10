import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactForm, timingOptions, helpLevelOptions } from "@shared/schema";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ContactFormSectionProps {
  budget: number;
  valeurClient: number;
  secteur: string;
  onSubmit: (data: ContactForm) => void;
}

export default function ContactFormSection({
  budget,
  valeurClient,
  secteur,
  onSubmit,
}: ContactFormSectionProps) {
  const form = useForm<ContactForm>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      nom: "",
      email: "",
      defi: "",
      timing: "Le plus vite possible",
      helpLevel: "Des conseils pour me guider",
      budget,
      valeurClient,
      secteur,
    },
  });

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 sm:mt-12 md:mt-16 px-4 sm:px-6">
      <div className="border-2 border-primary/30 rounded-2xl p-6 sm:p-8 bg-white/95 backdrop-blur-sm shadow-xl">
        <div className="text-center mb-6 sm:mb-8">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 text-foreground">
            Prêt à dépasser cet objectif ?
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground px-2">
            Pour rendre notre appel de 15 min ultra-efficace, merci de préciser :
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
              <FormField
                control={form.control}
                name="nom"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Votre nom"
                        className="h-12 sm:h-14 bg-white border-2 border-border text-foreground focus:border-primary transition-colors text-base sm:text-lg"
                        data-testid="input-nom"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage fieldState={fieldState} />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Votre email"
                        className="h-12 sm:h-14 bg-white border-2 border-border text-foreground focus:border-primary transition-colors text-base sm:text-lg"
                        data-testid="input-email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage fieldState={fieldState} />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="defi"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Votre plus grand défi pour trouver des clients ?"
                      className="min-h-32 sm:min-h-36 resize-none bg-white border-2 border-border text-foreground focus:border-primary transition-colors text-base sm:text-lg"
                      data-testid="textarea-defi"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage fieldState={fieldState} />
                </FormItem>
              )}
            />

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
              <FormField
                control={form.control}
                name="timing"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-sm sm:text-base text-foreground font-medium">
                      Vous souhaitez démarrer quand ?
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-12 sm:h-14 bg-white border-2 border-border text-foreground focus:border-primary transition-colors text-base sm:text-lg" data-testid="select-timing">
                          <SelectValue placeholder="Le plus vite possible" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {timingOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage fieldState={fieldState} />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="helpLevel"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-sm sm:text-base text-foreground font-medium">
                      Quel niveau d'aide imaginez-vous ?
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-12 sm:h-14 bg-white border-2 border-border text-foreground focus:border-primary transition-colors text-base sm:text-lg" data-testid="select-help-level">
                          <SelectValue placeholder="Des conseils pour me guider" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {helpLevelOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage fieldState={fieldState} />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 sm:h-14 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 mt-4 sm:mt-6"
              data-testid="button-submit-contact"
            >
              Je veux remplir mon agenda
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
