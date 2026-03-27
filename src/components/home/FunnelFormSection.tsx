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
  Shield,
  Clock,
  Zap,
} from "lucide-react";

const projectTypes = [
  { id: "salon", label: "Salon Professionnel", icon: Building2, color: "from-amber-500 to-yellow-600" },
  { id: "montage", label: "Montage & Démontage", icon: CalendarDays, color: "from-orange-500 to-amber-600" },
  { id: "logistique", label: "Logistique & Coordination", icon: MapPin, color: "from-yellow-500 to-orange-500" },
  { id: "scenographie", label: "Scénographie", icon: Sparkles, color: "from-amber-400 to-yellow-500" },
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
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
  };

  const progressWidth = ((currentStep + 1) / steps.length) * 100;

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Rich Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/80 to-background" />
      
      {/* Decorative shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute -bottom-60 -right-40 w-[600px] h-[600px] rounded-full bg-primary/8 blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-primary/3 blur-[200px]" />
      </div>

      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "radial-gradient(hsl(var(--primary)) 1px, transparent 1px)",
        backgroundSize: "30px 30px",
      }} />

      <div className="relative z-10 container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-semibold mb-6 tracking-wider uppercase"
          >
            <Zap className="w-4 h-4" />
            Devis Express
          </motion.span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-card-foreground mb-5">
            Obtenez votre{" "}
            <span className="text-gradient-gold relative">
              devis gratuit
              <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 12" fill="none" aria-hidden="true">
                <path d="M2 10C50 2 150 2 198 10" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
              </svg>
            </span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto">
            Réponse personnalisée sous 24h — seulement 3 étapes
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="relative rounded-3xl border border-primary/20 bg-card/90 backdrop-blur-xl shadow-2xl overflow-hidden"
          style={{ boxShadow: "0 25px 80px -20px rgba(255,215,0,0.12), 0 0 0 1px rgba(255,215,0,0.05)" }}
        >
          {/* Decorative top glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

          {/* Progress Bar */}
          <div className="h-1.5 bg-muted/50">
            <motion.div
              className="h-full rounded-r-full"
              style={{ background: "linear-gradient(90deg, hsl(var(--primary)), hsl(40 100% 60%), hsl(var(--primary)))" }}
              animate={{ width: `${progressWidth}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>

          {/* Step Indicators */}
          <div className="flex items-center justify-between px-6 md:px-10 pt-8 pb-4">
            {steps.map((step, i) => {
              const StepIcon = step.icon;
              const isActive = i === currentStep;
              const isDone = i < currentStep || isSubmitted;
              return (
                <div key={i} className="flex items-center gap-3">
                  <motion.div
                    animate={{
                      scale: isActive ? 1.15 : 1,
                      boxShadow: isActive ? "0 0 25px rgba(255,215,0,0.35)" : isDone ? "0 0 15px rgba(255,215,0,0.15)" : "none",
                    }}
                    transition={{ duration: 0.3 }}
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      isDone
                        ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground"
                        : isActive
                        ? "bg-primary/20 text-primary border-2 border-primary"
                        : "bg-muted/80 text-muted-foreground border border-border"
                    }`}
                  >
                    {isDone ? <CheckCircle2 className="w-5 h-5" /> : <StepIcon className="w-5 h-5" />}
                  </motion.div>
                  <span
                    className={`hidden sm:block text-sm font-semibold transition-colors ${
                      isActive ? "text-primary" : isDone ? "text-card-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {step.label}
                  </span>
                  {i < steps.length - 1 && (
                    <div className="hidden sm:block w-12 lg:w-20 h-0.5 mx-3 rounded-full overflow-hidden bg-border/50">
                      <motion.div
                        className="h-full bg-primary"
                        animate={{ width: i < currentStep ? "100%" : "0%" }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Form Content */}
          <div className="px-6 md:px-10 pb-8 pt-4 min-h-[360px] flex flex-col">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="flex-1 flex flex-col items-center justify-center text-center py-12 gap-5"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center mb-2 shadow-gold"
                  >
                    <CheckCircle2 className="w-10 h-10 text-primary" />
                  </motion.div>
                  <h3 className="text-3xl font-display font-bold text-card-foreground">
                    Demande envoyée ! 🎉
                  </h3>
                  <p className="text-muted-foreground max-w-md text-lg">
                    Notre équipe vous recontactera sous <span className="text-primary font-semibold">24h</span> avec un devis personnalisé.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4 rounded-xl border-primary/30 hover:bg-primary/10"
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
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="flex-1 flex flex-col"
                >
                  {/* Step 1: Project Type */}
                  {currentStep === 0 && (
                    <div className="flex-1 flex flex-col gap-6">
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-card-foreground mb-1">
                          Quel type de prestation recherchez-vous ?
                        </h3>
                        <p className="text-muted-foreground text-sm">Sélectionnez la catégorie qui correspond à votre besoin</p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {projectTypes.map((type) => {
                          const Icon = type.icon;
                          const selected = formData.projectType === type.id;
                          return (
                            <motion.button
                              key={type.id}
                              type="button"
                              onClick={() => handleChange("projectType", type.id)}
                              whileHover={{ scale: 1.03, y: -2 }}
                              whileTap={{ scale: 0.97 }}
                              className={`relative flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-300 text-left overflow-hidden ${
                                selected
                                  ? "border-primary bg-primary/10"
                                  : "border-border/60 bg-muted/30 hover:border-primary/40 hover:bg-muted/60"
                              }`}
                              style={selected ? { boxShadow: "0 0 30px rgba(255,215,0,0.15), inset 0 0 30px rgba(255,215,0,0.05)" } : {}}
                            >
                              {/* Selected indicator */}
                              {selected && (
                                <motion.div 
                                  layoutId="selectedType"
                                  className="absolute inset-0 border-2 border-primary rounded-2xl"
                                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                />
                              )}
                              <div className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                                selected 
                                  ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-gold" 
                                  : "bg-muted text-muted-foreground"
                              }`}>
                                <Icon className="w-6 h-6" />
                              </div>
                              <div className="relative">
                                <span className={`font-semibold text-base block ${selected ? "text-primary" : "text-card-foreground"}`}>
                                  {type.label}
                                </span>
                                {selected && (
                                  <motion.span 
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-xs text-primary/70"
                                  >
                                    Sélectionné ✓
                                  </motion.span>
                                )}
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Step 2: Details */}
                  {currentStep === 1 && (
                    <div className="flex-1 flex flex-col gap-6">
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-card-foreground mb-1">
                          Précisez votre événement
                        </h3>
                        <p className="text-muted-foreground text-sm">Ces informations nous aident à préparer votre devis</p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-card-foreground flex items-center gap-2">
                            <div className="w-6 h-6 rounded-lg bg-primary/15 flex items-center justify-center">
                              <MapPin className="w-3.5 h-3.5 text-primary" />
                            </div>
                            Ville / Lieu
                          </label>
                          <Input
                            placeholder="Ex: Paris, Lyon, Villepinte..."
                            value={formData.ville}
                            onChange={(e) => handleChange("ville", e.target.value)}
                            className="h-12 rounded-xl bg-muted/50 border-border/60 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-card-foreground flex items-center gap-2">
                            <div className="w-6 h-6 rounded-lg bg-primary/15 flex items-center justify-center">
                              <CalendarDays className="w-3.5 h-3.5 text-primary" />
                            </div>
                            Date prévue
                          </label>
                          <Input
                            type="date"
                            value={formData.date}
                            onChange={(e) => handleChange("date", e.target.value)}
                            className="h-12 rounded-xl bg-muted/50 border-border/60 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-card-foreground">
                          Détails supplémentaires <span className="text-muted-foreground font-normal">(optionnel)</span>
                        </label>
                        <Textarea
                          placeholder="Surface du stand, nombre de jours, besoins spécifiques..."
                          value={formData.message}
                          onChange={(e) => handleChange("message", e.target.value)}
                          rows={3}
                          className="rounded-xl bg-muted/50 border-border/60 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none placeholder:text-muted-foreground/50"
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 3: Contact */}
                  {currentStep === 2 && (
                    <div className="flex-1 flex flex-col gap-6">
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-card-foreground mb-1">
                          Vos coordonnées
                        </h3>
                        <p className="text-muted-foreground text-sm">Pour vous envoyer votre devis personnalisé</p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-card-foreground flex items-center gap-2">
                            <div className="w-6 h-6 rounded-lg bg-primary/15 flex items-center justify-center">
                              <User className="w-3.5 h-3.5 text-primary" />
                            </div>
                            Nom complet <span className="text-destructive">*</span>
                          </label>
                          <Input
                            placeholder="Jean Dupont"
                            value={formData.nom}
                            onChange={(e) => handleChange("nom", e.target.value)}
                            className="h-12 rounded-xl bg-muted/50 border-border/60 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-card-foreground flex items-center gap-2">
                            <div className="w-6 h-6 rounded-lg bg-primary/15 flex items-center justify-center">
                              <Building2 className="w-3.5 h-3.5 text-primary" />
                            </div>
                            Entreprise
                          </label>
                          <Input
                            placeholder="Nom de l'entreprise"
                            value={formData.entreprise}
                            onChange={(e) => handleChange("entreprise", e.target.value)}
                            className="h-12 rounded-xl bg-muted/50 border-border/60 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/50"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-card-foreground flex items-center gap-2">
                            <div className="w-6 h-6 rounded-lg bg-primary/15 flex items-center justify-center">
                              <Mail className="w-3.5 h-3.5 text-primary" />
                            </div>
                            Email <span className="text-destructive">*</span>
                          </label>
                          <Input
                            type="email"
                            placeholder="jean@entreprise.fr"
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            className="h-12 rounded-xl bg-muted/50 border-border/60 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-card-foreground flex items-center gap-2">
                            <div className="w-6 h-6 rounded-lg bg-primary/15 flex items-center justify-center">
                              <Phone className="w-3.5 h-3.5 text-primary" />
                            </div>
                            Téléphone <span className="text-destructive">*</span>
                          </label>
                          <Input
                            type="tel"
                            placeholder="06 12 34 56 78"
                            value={formData.telephone}
                            onChange={(e) => handleChange("telephone", e.target.value)}
                            className="h-12 rounded-xl bg-muted/50 border-border/60 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/50"
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
              <div className="flex items-center justify-between pt-8 mt-auto">
                <Button
                  variant="ghost"
                  onClick={() => setCurrentStep((s) => s - 1)}
                  disabled={currentStep === 0}
                  className="gap-2 rounded-xl text-muted-foreground hover:text-card-foreground"
                >
                  <ArrowLeft className="w-4 h-4" /> Retour
                </Button>

                {currentStep < steps.length - 1 ? (
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      variant="gold"
                      onClick={() => setCurrentStep((s) => s + 1)}
                      disabled={!canProceed()}
                      className="gap-2 rounded-xl px-8 h-12 text-base font-semibold shadow-gold"
                    >
                      Continuer <ArrowRight className="w-5 h-5" />
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      variant="gold"
                      onClick={handleSubmit}
                      disabled={!canProceed()}
                      className="gap-2 rounded-xl px-8 h-12 text-base font-semibold shadow-gold"
                    >
                      <Send className="w-5 h-5" /> Envoyer ma demande
                    </Button>
                  </motion.div>
                )}
              </div>
            )}
          </div>

          {/* Trust badges */}
          <div className="px-6 md:px-10 pb-6 pt-2">
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 py-4 px-6 rounded-2xl bg-muted/30 border border-border/30">
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                </div>
                <span className="font-medium">Devis gratuit</span>
              </span>
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-primary" />
                </div>
                <span className="font-medium">Réponse sous 24h</span>
              </span>
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-primary" />
                </div>
                <span className="font-medium">Données sécurisées</span>
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
