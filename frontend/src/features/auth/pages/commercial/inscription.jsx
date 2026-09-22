import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  ArrowLeft,
  ArrowRight,
  Check,
  BriefcaseBusiness,
  Search,
  Clock3,
  X,
} from "lucide-react";
import Input from "../../../../components/input/inputText";
import PasswordInput from "../../../../components/input/inputPassword";

function RegisterCommercial() {
  const [step, setStep] = useState(1);

  const [projectId, setProjectId] = useState("");
  const [projectLoading, setProjectLoading] = useState(false);
  const [project, setProject] = useState(null);

  const [integrationStatus, setIntegrationStatus] = useState("");
  const [approvalVisible, setApprovalVisible] = useState(false);

  const progress = (step / 4) * 100;

  const nextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const previousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSearchProject = () => {
    if (!projectId.trim()) return;

    setProjectLoading(true);
    setProject(null);
    setIntegrationStatus("");
    setApprovalVisible(false);

    setTimeout(() => {
      setProjectLoading(false);

      setProject({
        nom: "Développement de ClientFlow",
        createur: "Jean Dupont",
      });
    }, 1500);
  };

  const handleIntegrationRequest = () => {
    setIntegrationStatus("pending");
  };

  /*
   * Cette fonction simule la réponse du backend.
   *
   * Plus tard :
   *
   * "acceptee"  -> setIntegrationStatus("approved")
   * "refusee"   -> setIntegrationStatus("rejected")
   */
  const handleIntegrationStatus = (status) => {
    if (status === "approved") {
      setIntegrationStatus("approved");

      setTimeout(() => {
        setApprovalVisible(true);
      }, 5000);

      return;
    }

    if (status === "rejected") {
      setIntegrationStatus("rejected");
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
            <h1
              className="text-base font-semibold"
              style={{ color: "var(--text-h)" }}
            >
              Créer votre compte commercial
            </h1>
          </div>

          {/* PROGRESSION */}
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

          <div className="mb-4 flex items-center justify-between">
            <span
              className="text-[11px]"
              style={{ color: "var(--text)" }}
            >
              Étape {step} sur 4
            </span>

            <span
              className="text-[11px]"
              style={{ color: "var(--text)" }}
            >
              {step === 1 && "Informations"}
              {step === 2 && "Sécurité"}
              {step === 3 && "Vérification email"}
              {step === 4 && "Intégration au projet"}
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
                    Renseignez les informations utilisées pour votre compte
                    commercial.
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

                <button
                  type="button"
                  onClick={nextStep}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold text-white transition hover:opacity-90"
                  style={{ backgroundColor: "var(--accent)" }}
                >
                  Continuer
                  <ArrowRight size={15} />
                </button>
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
                    Sécurisez votre compte
                  </h2>

                  <p
                    className="mt-1 text-xs"
                    style={{ color: "var(--text)" }}
                  >
                    Choisissez un mot de passe sécurisé pour votre compte.
                  </p>
                </div>

                <div className="grid gap-4">
                  <PasswordInput
                    label="Mot de passe"
                    placeholder="Votre mot de passe"
                    errors={[]}
                  />

                  <PasswordInput
                    label="Confirmer le mot de passe"
                    placeholder="Confirmez votre mot de passe"
                    errors={[]}
                  />
                </div>

                <label className="mt-5 flex cursor-pointer items-start gap-2">
                  <input
                    type="checkbox"
                    className="mt-0.5"
                  />

                  <span
                    className="text-[11px] leading-4"
                    style={{ color: "var(--text)" }}
                  >
                    J'accepte les conditions d'utilisation et la politique de
                    confidentialité de ClientFlow.
                  </span>
                </label>

                <label className="mt-3 flex cursor-pointer items-start gap-2">
                  <input
                    type="checkbox"
                    className="mt-0.5"
                  />

                  <span
                    className="text-[11px] leading-4"
                    style={{ color: "var(--text)" }}
                  >
                    Je souhaite recevoir les informations concernant les
                    nouvelles fonctionnalités de ClientFlow.
                  </span>
                </label>

                <div className="mt-5 flex gap-3">
                  <button
                    type="button"
                    onClick={previousStep}
                    className="flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-xs font-semibold"
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
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold text-white"
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
                <div className="mb-5">
                  <h2
                    className="text-base font-semibold"
                    style={{ color: "var(--text-h)" }}
                  >
                    Vérifiez votre email
                  </h2>

                  <p
                    className="mt-1 text-xs leading-5"
                    style={{ color: "var(--text)" }}
                  >
                    Un code de vérification à 6 chiffres sera envoyé à votre
                    adresse email professionnelle.
                  </p>
                </div>

                <div>
                  <label
                    className="text-sm font-medium"
                    style={{ color: "var(--text-h)" }}
                  >
                    Code de vérification
                  </label>

                  <div className="relative mt-2">
                    <Mail
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2"
                      style={{ color: "var(--text)" }}
                    />

                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      placeholder="000000"
                      className="w-full rounded-lg bg-white py-3 pl-10 pr-3 text-center text-lg tracking-[0.35em] outline-none"
                      style={{
                        color: "var(--text-h)",
                        border: "1px solid var(--border)",
                      }}
                    />
                  </div>
                </div>

                <div
                  className="mt-4 rounded-lg border p-3"
                  style={{
                    borderColor: "var(--border)",
                    backgroundColor: "var(--code-bg)",
                  }}
                >
                  <p
                    className="text-[11px] leading-5"
                    style={{ color: "var(--text)" }}
                  >
                    Le code est temporaire. Vérifiez votre boîte de réception
                    ainsi que vos courriers indésirables.
                  </p>
                </div>

                <button
                  type="button"
                  className="mt-3 text-[11px] font-medium"
                  style={{ color: "var(--accent)" }}
                >
                  Renvoyer le code
                </button>

                <div className="mt-5 flex gap-3">
                  <button
                    type="button"
                    onClick={previousStep}
                    className="flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-xs font-semibold"
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
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold text-white"
                    style={{ backgroundColor: "var(--accent)" }}
                  >
                    Vérifier l'email
                    <Check size={15} />
                  </button>
                </div>
              </section>
            )}

            {/* ÉTAPE 4 */}
            {step === 4 && (
              <section className="p-5 sm:p-6">
                <div className="mb-5">
                  <h2
                    className="text-base font-semibold"
                    style={{ color: "var(--text-h)" }}
                  >
                    Rejoindre un projet
                  </h2>

                  <p
                    className="mt-1 text-xs leading-5"
                    style={{ color: "var(--text)" }}
                  >
                    Saisissez l'identifiant du projet auquel vous souhaitez
                    être intégré.
                  </p>
                </div>

                {/* RECHERCHE PROJET */}
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <BriefcaseBusiness
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2"
                      style={{ color: "var(--text)" }}
                    />

                    <input
                      type="text"
                      value={projectId}
                      onChange={(e) => setProjectId(e.target.value)}
                      placeholder="ID du projet"
                      className="w-full rounded-lg bg-white py-3 pl-10 pr-3 text-sm outline-none"
                      style={{
                        color: "var(--text-h)",
                        border: "1px solid var(--border)",
                      }}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleSearchProject}
                    disabled={!projectId.trim() || projectLoading}
                    className="flex items-center justify-center rounded-lg px-4 text-white transition disabled:cursor-not-allowed disabled:opacity-40"
                    style={{ backgroundColor: "var(--accent)" }}
                  >
                    {projectLoading ? (
                      <div
                        className="h-4 w-4 animate-spin rounded-full border-2"
                        style={{
                          borderColor: "white",
                          borderTopColor: "transparent",
                        }}
                      />
                    ) : (
                      <Search size={17} />
                    )}
                  </button>
                </div>

                {/* CHARGEMENT */}
                {projectLoading && (
                  <div
                    className="mt-4 flex items-center gap-3 rounded-lg border p-4"
                    style={{
                      borderColor: "var(--border)",
                      backgroundColor: "var(--code-bg)",
                    }}
                  >
                    <div
                      className="h-5 w-5 animate-spin rounded-full border-2"
                      style={{
                        borderColor: "var(--accent)",
                        borderTopColor: "transparent",
                      }}
                    />

                    <div>
                      <p
                        className="text-xs font-medium"
                        style={{ color: "var(--text-h)" }}
                      >
                        Recherche du projet...
                      </p>

                      <p
                        className="mt-0.5 text-[11px]"
                        style={{ color: "var(--text)" }}
                      >
                        Vérification de l'identifiant en cours.
                      </p>
                    </div>
                  </div>
                )}

                {/* PROJET TROUVÉ */}
                {project && !projectLoading && (
                  <div
                    className="mt-4 rounded-lg border p-4"
                    style={{
                      borderColor: "var(--border)",
                      backgroundColor: "var(--bg)",
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                        style={{
                          backgroundColor: "var(--accent-bg)",
                          color: "var(--accent)",
                        }}
                      >
                        <BriefcaseBusiness size={18} />
                      </div>

                      <div className="min-w-0">
                        <p
                          className="text-xs font-semibold"
                          style={{ color: "var(--text-h)" }}
                        >
                          {project.nom}
                        </p>

                        <p
                          className="mt-1 text-[11px]"
                          style={{ color: "var(--text)" }}
                        >
                          Créé par : {project.createur}
                        </p>
                      </div>
                    </div>

                    {/* DEMANDE */}
                    {integrationStatus === "" && (
                      <button
                        type="button"
                        onClick={handleIntegrationRequest}
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold text-white"
                        style={{ backgroundColor: "var(--accent)" }}
                      >
                        Demander à rejoindre le projet
                        <ArrowRight size={15} />
                      </button>
                    )}

                    {/* EN ATTENTE */}
                    {integrationStatus === "pending" && (
                      <div
                        className="mt-4 rounded-lg border p-3"
                        style={{
                          borderColor: "var(--accent-border)",
                          backgroundColor: "var(--accent-bg)",
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <Clock3
                            size={18}
                            className="mt-0.5 shrink-0"
                            style={{ color: "var(--accent)" }}
                          />

                          <div>
                            <p
                              className="text-xs font-semibold"
                              style={{ color: "var(--text-h)" }}
                            >
                              En attente de confirmation
                            </p>

                            <p
                              className="mt-1 text-[11px] leading-5"
                              style={{ color: "var(--text)" }}
                            >
                              Votre demande d'intégration a été envoyée au
                              créateur du projet.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* APPROBATION EN COURS */}
                    {integrationStatus === "approved" &&
                      !approvalVisible && (
                        <div
                          className="mt-4 rounded-lg border p-4"
                          style={{
                            borderColor: "var(--accent-border)",
                            backgroundColor: "var(--accent-bg)",
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="h-5 w-5 animate-spin rounded-full border-2"
                              style={{
                                borderColor: "var(--accent)",
                                borderTopColor: "transparent",
                              }}
                            />

                            <div>
                              <p
                                className="text-xs font-semibold"
                                style={{ color: "var(--text-h)" }}
                              >
                                Intégration confirmée
                              </p>

                              <p
                                className="mt-1 text-[11px]"
                                style={{ color: "var(--text)" }}
                              >
                                Préparation de votre espace...
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                    {/* APPROUVÉ */}
                    {approvalVisible && (
                      <div
                        className="mt-4 rounded-lg border p-4"
                        style={{
                          borderColor: "var(--accent-border)",
                          backgroundColor: "var(--accent-bg)",
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white"
                            style={{
                              backgroundColor: "var(--accent)",
                            }}
                          >
                            <Check size={18} />
                          </div>

                          <div>
                            <p
                              className="text-xs font-semibold"
                              style={{ color: "var(--text-h)" }}
                            >
                              Vous avez été approuvé
                            </p>

                            <p
                              className="mt-1 text-[11px] leading-5"
                              style={{ color: "var(--text)" }}
                            >
                              Votre demande d'intégration a été acceptée.
                              Vous pouvez maintenant accéder au projet.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* REFUS */}
                    {integrationStatus === "rejected" && (
                      <div
                        className="mt-4 rounded-lg border p-4"
                        style={{
                          borderColor: "#fca5a5",
                          backgroundColor: "#fef2f2",
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                            style={{
                              backgroundColor: "#fee2e2",
                              color: "#dc2626",
                            }}
                          >
                            <X size={17} />
                          </div>

                          <div>
                            <p
                              className="text-xs font-semibold"
                              style={{ color: "var(--text-h)" }}
                            >
                              Demande refusée
                            </p>

                            <p
                              className="mt-1 text-[11px] leading-5"
                              style={{ color: "var(--text)" }}
                            >
                              Le créateur du projet n'a pas approuvé votre
                              demande d'intégration.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* BOUTONS */}
                <div className="mt-5 flex gap-3">
                  <button
                    type="button"
                    onClick={previousStep}
                    disabled={
                      integrationStatus === "approved" &&
                      approvalVisible
                    }
                    className="flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-40"
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
                    disabled={!approvalVisible}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-40"
                    style={{ backgroundColor: "var(--accent)" }}
                  >
                    Accéder à ClientFlow
                    <ArrowRight size={15} />
                  </button>
                </div>

                {/* TEST TEMPORAIRE */}
                {project && integrationStatus === "pending" && (
                  <div className="mt-4 flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleIntegrationStatus("approved")}
                      className="text-[10px]"
                      style={{ color: "var(--accent)" }}
                    >
                      [Test : approuver]
                    </button>

                    <button
                      type="button"
                      onClick={() => handleIntegrationStatus("rejected")}
                      className="text-[10px] text-red-500"
                    >
                      [Test : refuser]
                    </button>
                  </div>
                )}
              </section>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default RegisterCommercial;