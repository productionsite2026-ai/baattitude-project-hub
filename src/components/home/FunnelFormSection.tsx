import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  CalendarDays,
  MapPin,
  User,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Send,
  Phone,
  Mail,
  Building2,
} from "lucide-react";

const projectTypes = [
  { id: "salon", label: "Salon Professionnel", icon: Building2 },
  { id: "montage", label: "Montage & Démontage", icon: CalendarDays },
  { id: "logistique", label: "Logistique & Coordination", icon: MapPin },
  { id: "scenographie", label: "Scénographie", icon: Sparkles },
];

const steps = [
  { label: "Votre Projet", icon: Sparkles },
  { label: "Détails", icon: CalendarDays },
  { label: "Vos Coordonnées", icon: User },
];

export const FunnelFormSection = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    projectType: "",
    ville: "",
    date: "",
    message: "",
    nom: "",
    email: "",
    telephone: "",
    entreprise: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    if (currentStep === 0) return formData.projectType !== "";
    if (currentStep === 1) return formData.ville !== "" && formData.date !== "";
    if (currentStep === 2) return formData.nom !== "" && formData.email !== "" && formData.telephone !== "";
    return false;
  };

  const handleSubmit = () => {
    // Will connect to Formspree later
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
  };

  const progressWidth = ((currentStep + 1) / steps.length) * 100;

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "radial-gradient(hsl(var(--primary)) 1px, transparent 1px)",
        backgroundSize: "30px 30px",
      }} />

      <div className="relative z-10 container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 text-primary text-sm font-medium mb-4 tracking-wider uppercase">
            Devis Express
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-card-foreground mb-4">
            Obtenez votre <span className="text-gradient-gold">devis gratuit</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Réponse personnalisée sous 24h — 3 étapes simples
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="relative rounded-2xl border border-border bg-card/80 backdrop-blur-sm shadow-2xl overflow-hidden"
        >
          {/* Progress Bar */}
          <div className="h-1 bg-muted">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-primary/70"
              animate={{ width: `${progressWidth}%` }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          </div>

          {/* Step Indicators */}
          <div className="flex items-center justify-between px-6 pt-6 pb-2">
            {steps.map((step, i) => {
              const StepIcon = step.icon;
              const isActive = i === currentStep;
              const isDone = i < currentStep || isSubmitted;
              return (
                <div key={i} className="flex items-center gap-2">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      isDone
                        ? "bg-primary text-primary-foreground"
                        : isActive
                        ? "bg-primary/20 text-primary border-2 border-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {isDone ? <CheckCircle2 className="w-4 h-4" /> : <StepIcon className="w-4 h-4" />}
                  </div>
                  <span
                    className={`hidden sm:block text-sm font-medium transition-colors ${
                      isActive || isDone ? "text-card-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {step.label}
                  </span>
                  {i < steps.length - 1 && (
                    <div className={`hidden sm:block w-12 h-px mx-2 ${i < currentStep ? "bg-primary" : "bg-border"}`} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Form Content */}
          <div className="px-6 pb-6 pt-4 min-h-[320px] flex flex-col">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex-1 flex flex-col items-center justify-center text-center py-10 gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                    <CheckCircle2 className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-card-foreground">
                    Demande envoyée !
                  </h3>
                  <p className="text-muted-foreground max-w-sm">
                    Notre équipe vous recontactera sous 24h avec un devis personnalisé.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setIsSubmitted(false);
                      setCurrentStep(0);
                      setFormData({ projectType: "", ville: "", date: "", message: "", nom: "", email: "", telephone: "", entreprise: "" });
                    }}
                  >
                    Nouvelle demande
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 flex flex-col"
                >
                  {/* Step 1: Project Type */}
                  {currentStep === 0 && (
                    <div className="flex-1 flex flex-col gap-5">
                      <h3 className="text-lg font-semibold text-card-foreground">
                        Quel type de prestation recherchez-vous ?
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {projectTypes.map((type) => {
                          const Icon = type.icon;
                          const selected = formData.projectType === type.id;
                          return (
                            <button
                              key={type.id}
                              type="button"
                              onClick={() => handleChange("projectType", type.id)}
                              className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                                selected
                                  ? "border-primary bg-primary/10 shadow-[0_0_20px_rgba(255,215,0,0.1)]"
                                  : "border-border bg-muted/50 hover:border-primary/40 hover:bg-muted"
                              }`}
                            >
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                selected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                              }`}>
                                <Icon className="w-5 h-5" />
                              </div>
                              <span className={`font-medium text-sm ${selected ? "text-primary" : "text-card-foreground"}`}>
                                {type.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Step 2: Details */}
                  {currentStep === 1 && (
                    <div className="flex-1 flex flex-col gap-5">
                      <h3 className="text-lg font-semibold text-card-foreground">
                        Précisez votre événement
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-card-foreground flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-primary" /> Ville / Lieu
                          </label>
                          <Input
                            placeholder="Ex: Paris, Lyon, Villepinte..."
                            value={formData.ville}
                            onChange={(e) => handleChange("ville", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-card-foreground flex items-center gap-2">
                            <CalendarDays className="w-4 h-4 text-primary" /> Date prévue
                          </label>
                          <Input
                            type="date"
                            value={formData.date}
                            onChange={(e) => handleChange("date", e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-card-foreground">
                          Détails supplémentaires (optionnel)
                        </label>
                        <Textarea
                          placeholder="Surface du stand, nombre de jours, besoins spécifiques..."
                          value={formData.message}
                          onChange={(e) => handleChange("message", e.target.value)}
                          rows={3}
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 3: Contact */}
                  {currentStep === 2 && (
                    <div className="flex-1 flex flex-col gap-5">
                      <h3 className="text-lg font-semibold text-card-foreground">
                        Vos coordonnées
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-card-foreground flex items-center gap-2">
                            <User className="w-4 h-4 text-primary" /> Nom complet
                          </label>
                          <Input
                            placeholder="Jean Dupont"
                            value={formData.nom}
                            onChange={(e) => handleChange("nom", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-card-foreground flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-primary" /> Entreprise
                          </label>
                          <Input
                            placeholder="Nom de l'entreprise (optionnel)"
                            value={formData.entreprise}
                            onChange={(e) => handleChange("entreprise", e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-card-foreground flex items-center gap-2">
                            <Mail className="w-4 h-4 text-primary" /> Email
                          </label>
                          <Input
                            type="email"
                            placeholder="jean@entreprise.fr"
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-card-foreground flex items-center gap-2">
                            <Phone className="w-4 h-4 text-primary" /> Téléphone
                          </label>
                          <Input
                            type="tel"
                            placeholder="06 12 34 56 78"
                            value={formData.telephone}
                            onChange={(e) => handleChange("telephone", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            {!isSubmitted && (
              <div className="flex items-center justify-between pt-6 mt-auto border-t border-border">
                <Button
                  variant="ghost"
                  onClick={() => setCurrentStep((s) => s - 1)}
                  disabled={currentStep === 0}
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Retour
                </Button>

                {currentStep < steps.length - 1 ? (
                  <Button
                    variant="gold"
                    onClick={() => setCurrentStep((s) => s + 1)}
                    disabled={!canProceed()}
                    className="gap-2"
                  >
                    Continuer <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    variant="gold"
                    onClick={handleSubmit}
                    disabled={!canProceed()}
                    className="gap-2"
                  >
                    <Send className="w-4 h-4" /> Envoyer ma demande
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Trust badges */}
          <div className="px-6 pb-5 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Devis gratuit
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Réponse sous 24h
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Données sécurisées
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
