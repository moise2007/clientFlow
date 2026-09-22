import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Building2,
  ArrowLeft,
  ArrowRight,
  Check,
  ShieldCheck,
} from "lucide-react";
import Input from "../../../../components/input/inputText";
import PasswordInput from "../../../../components/input/inputPassword";

function RegisterAdmin() {
  const [step, setStep] = useState(1);
  const [verificationCode, setVerificationCode] = useState("");

  const progress = (step / 3) * 100;

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const previousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <main
      className="min-h-screen px-4 py-8 sm:px-6"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-130 items-center">
        <div className="w-full max-w-140">

          {/* HEADER */}
          <div className="mb-6">
            <div className="flex items-center gap-3">
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                style={{
                  backgroundColor: "var(--accent-bg)",
                  color: "var(--accent)",
                }}
              >
                <Building2 size={19} />
              </div>

              <div>
                <h1
                  className="text-xl font-bold tracking-tight sm:text-2xl"
                  style={{ color: "var(--text-h)" }}
                >
                  Créer votre espace administrateur
                </h1>

                <p
                  className="mt-0.5 text-xs"
                  style={{ color: "var(--text)" }}
                >
                  Configurez votre compte ClientFlow.
                </p>
              </div>
            </div>
          </div>

          {/* BARRE DE PROGRESSION */}
          <div className="mb-3">
            <div
              className="h-1.5 w-full overflow-hidden rounded-full"
              style={{ backgroundColor: "var(--border)" }}
            >
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${progress}%`,
                  backgroundColor: "var(--accent)",
                }}
              />
            </div>
          </div>

          {/* INDICATION ÉTAPE */}
          <div className="mb-4 flex items-center justify-between">
            <span
              className="text-xs font-medium"
              style={{ color: "var(--text)" }}
            >
              Étape {step} sur 3
            </span>

            <span
              className="text-xs font-medium"
              style={{ color: "var(--accent)" }}
            >
              {step === 1 && "Informations personnelles"}
              {step === 2 && "Sécurité du compte"}
              {step === 3 && "Vérification"}
            </span>
          </div>

          {/* FORMULAIRE */}
          <div
            className="overflow-hidden rounded-xl border"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "var(--bg)",
              boxShadow: "var(--shadow)",
            }}
          >

            {/* ÉTAPE 1 */}
            {step === 1 && (
              <section className="p-5 sm:p-6">
                <div className="mb-5">
                  <h2
                    className="text-base font-semibold"
                    style={{ color: "var(--text-h)" }}
                  >
                    Informations personnelles
                  </h2>

                  <p
                    className="mt-1 text-xs"
                    style={{ color: "var(--text)" }}
                  >
                    Renseignez les informations utilisées pour votre compte.
                  </p>
                </div>

                <div className="grid gap-4">
                  <Input
                    label="Prénom"
                    type="text"
                    placeholder="Jean"
                    icon={<User size={17} />}
                    errors={[]}
                  />

                  <Input
                    label="Nom"
                    type="text"
                    placeholder="Dupont"
                    icon={<User size={17} />}
                    errors={[]}
                  />

                  <Input
                    label="Email professionnel"
                    type="email"
                    placeholder="jean@entreprise.com"
                    icon={<Mail size={17} />}
                    errors={[]}
                  />

                  <Input
                    label="Téléphone"
                    type="tel"
                    placeholder="+237 6XX XXX XXX"
                    icon={<Phone size={17} />}
                    errors={[]}
                  />
                </div>

                <div
                  className="mt-5 rounded-lg border p-3"
                  style={{
                    borderColor: "var(--border)",
                    backgroundColor: "var(--code-bg)",
                  }}
                >
                  <div className="flex gap-2.5">
                    <Building2
                      size={17}
                      className="mt-0.5 shrink-0"
                      style={{ color: "var(--accent)" }}
                    />

                    <div>
                      <p
                        className="text-xs font-semibold"
                        style={{ color: "var(--text-h)" }}
                      >
                        Compte administrateur
                      </p>

                      <p
                        className="mt-0.5 text-xs leading-5"
                        style={{ color: "var(--text)" }}
                      >
                        Vous pourrez créer des projets, ajouter des membres
                        et suivre l'activité de votre équipe.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold text-white transition hover:opacity-90"
                    style={{ backgroundColor: "var(--accent)" }}
                  >
                    Continuer
                    <ArrowRight size={15} />
                  </button>
                </div>
              </section>
            )}

            {/* ÉTAPE 2 */}
            {step === 2 && (
              <section className="p-5 sm:p-6">
                <div className="mb-5">
                  <h2
                    className="text-base font-semibold"
                    style={{ color: "var(--text-h)" }}
                  >
                    Sécurité du compte
                  </h2>

                  <p
                    className="mt-1 text-xs"
                    style={{ color: "var(--text)" }}
                  >
                    Définissez votre mot de passe et vos préférences.
                  </p>
                </div>

                <div className="grid gap-4">
                  <PasswordInput
                    label="Mot de passe"
                    placeholder="Créer un mot de passe"
                    errors={[]}
                  />

                  <PasswordInput
                    label="Confirmer le mot de passe"
                    placeholder="Confirmer le mot de passe"
                    errors={[]}
                  />
                </div>

                <div
                  className="my-5 h-px"
                  style={{ backgroundColor: "var(--border)" }}
                />

                <div className="space-y-3">
                  <label className="flex cursor-pointer items-start gap-2.5">
                    <input
                      type="checkbox"
                      className="mt-0.5 h-4 w-4 shrink-0 rounded"
                      style={{ accentColor: "var(--accent)" }}
                    />

                    <span
                      className="text-xs leading-5"
                      style={{ color: "var(--text)" }}
                    >
                      J'accepte les{" "}
                      <a
                        href="/conditions-utilisation"
                        className="font-medium underline"
                        style={{ color: "var(--accent)" }}
                      >
                        conditions d'utilisation
                      </a>{" "}
                      et la{" "}
                      <a
                        href="/politique-confidentialite"
                        className="font-medium underline"
                        style={{ color: "var(--accent)" }}
                      >
                        politique de confidentialité
                      </a>
                      .
                    </span>
                  </label>

                  <label className="flex cursor-pointer items-start gap-2.5">
                    <input
                      type="checkbox"
                      className="mt-0.5 h-4 w-4 shrink-0 rounded"
                      style={{ accentColor: "var(--accent)" }}
                    />

                    <span
                      className="text-xs leading-5"
                      style={{ color: "var(--text)" }}
                    >
                      Je souhaite recevoir des emails concernant les
                      nouvelles fonctionnalités et améliorations de
                      ClientFlow.
                    </span>
                  </label>
                </div>

                <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
                  <button
                    type="button"
                    onClick={previousStep}
                    className="flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-xs font-medium transition hover:bg-[var(--accent-bg)]"
                    style={{
                      borderColor: "var(--border)",
                      color: "var(--text-h)",
                    }}
                  >
                    <ArrowLeft size={15} />
                    Retour
                  </button>

                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold text-white transition hover:opacity-90"
                    style={{ backgroundColor: "var(--accent)" }}
                  >
                    Continuer
                    <ArrowRight size={15} />
                  </button>
                </div>
              </section>
            )}

            {/* ÉTAPE 3 */}
            {step === 3 && (
              <section className="p-5 sm:p-6">
                <div className="mx-auto max-w-md text-center">
                  <div
                    className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-lg"
                    style={{
                      backgroundColor: "var(--accent-bg)",
                      color: "var(--accent)",
                    }}
                  >
                    <ShieldCheck size={20} />
                  </div>

                  <h2
                    className="text-base font-semibold"
                    style={{ color: "var(--text-h)" }}
                  >
                    Vérifiez votre identité
                  </h2>

                  <p
                    className="mt-1.5 text-xs leading-5"
                    style={{ color: "var(--text)" }}
                  >
                    Un code de vérification à 6 chiffres vous sera envoyé
                    à votre adresse email.
                  </p>

                  <div className="mt-5">
                    <label
                      htmlFor="verification-code"
                      className="mb-1.5 block text-left text-xs font-medium"
                      style={{ color: "var(--text-h)" }}
                    >
                      Code de vérification
                    </label>

                    <input
                      id="verification-code"
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      value={verificationCode}
                      onChange={(e) =>
                        setVerificationCode(
                          e.target.value.replace(/\D/g, "")
                        )
                      }
                      placeholder="000000"
                      className="w-full rounded-lg border bg-white px-3 py-2.5 text-center text-lg font-semibold tracking-[0.4em] outline-none transition"
                      style={{
                        color: "var(--text-h)",
                        borderColor: "var(--border)",
                      }}
                    />
                  </div>

                  <p
                    className="mt-3 text-[11px] leading-5"
                    style={{ color: "var(--text)" }}
                  >
                    Le code est valable pendant une durée limitée.
                    Vérifiez également vos courriers indésirables.
                  </p>

                  <button
                    type="button"
                    className="mt-2 text-xs font-medium"
                    style={{ color: "var(--accent)" }}
                  >
                    Renvoyer le code
                  </button>

                  <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
                    <button
                      type="button"
                      onClick={previousStep}
                      className="flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-xs font-medium transition hover:bg-[var(--accent-bg)]"
                      style={{
                        borderColor: "var(--border)",
                        color: "var(--text-h)",
                      }}
                    >
                      <ArrowLeft size={15} />
                      Retour
                    </button>

                    <button
                      type="button"
                      className="flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold text-white transition hover:opacity-90"
                      style={{ backgroundColor: "var(--accent)" }}
                    >
                      <Check size={15} />
                      Vérifier mon compte
                    </button>
                  </div>
                </div>
              </section>
            )}
          </div>

          <p
            className="mt-4 text-center text-xs"
            style={{ color: "var(--text)" }}
          >
            Vous avez déjà un compte ?{" "}
            <a
              href="/auth/connexion"
              className="font-medium"
              style={{ color: "var(--accent)" }}
            >
              Se connecter
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}

export default RegisterAdmin;