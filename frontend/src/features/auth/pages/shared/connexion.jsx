import { useState } from "react";
import {
  ShieldCheck,
  BriefcaseBusiness,
  Mail,
  ArrowRight,
  Check,
} from "lucide-react";
import Input from "../../../../components/input/inputText";
import PasswordInput from "../../../../components/input/inputPassword";

function Login() {
  const [role, setRole] = useState("");

  return (
    <main
      className="min-h-screen px-4 py-8 sm:px-6"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-130 items-center">
        <div className="w-full max-w-140">
          {/* HEADER */}
          <div className="mb-6 mx-auto ">
            <h1
              className="text-lg text-accent text-center font-semibold"
              style={{ color: "var(--text-h)" }}
            >
              Se connecter à ClientFlow
            </h1>
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
            <section className="p-5 sm:p-6">
              {/* CHOIX DU RÔLE */}
              <div className="mb-5">
                <h2
                  className="text-base font-semibold"
                  style={{ color: "var(--text-h)" }}
                >
                  Choisissez votre rôle
                </h2>

                <p className="mt-1 text-xs" style={{ color: "var(--text)" }}>
                  Sélectionnez l'espace auquel vous souhaitez accéder.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {/* ADMINISTRATEUR */}
                <button
                  type="button"
                  onClick={() => setRole("administrateur")}
                  className="relative rounded-lg border p-3 text-left transition"
                  style={{
                    borderColor:
                      role === "administrateur"
                        ? "var(--accent)"
                        : "var(--border)",
                    backgroundColor:
                      role === "administrateur"
                        ? "var(--accent-bg)"
                        : "var(--bg)",
                  }}
                >
                  {role === "administrateur" && (
                    <div
                      className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full text-white"
                      style={{ backgroundColor: "var(--accent)" }}
                    >
                      <Check size={12} strokeWidth={3} />
                    </div>
                  )}

                  <div
                    className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg"
                    style={{
                      backgroundColor: "var(--accent-bg)",
                      color: "var(--accent)",
                    }}
                  >
                    <ShieldCheck size={17} />
                  </div>

                  <p
                    className="text-xs font-semibold"
                    style={{ color: "var(--text-h)" }}
                  >
                    Administrateur
                  </p>

                  <p
                    className="mt-1 text-[11px] leading-4"
                    style={{ color: "var(--text)" }}
                  >
                    Gérer les projets et l'activité de l'équipe.
                  </p>
                </button>

                {/* COMMERCIAL */}
                <button
                  type="button"
                  onClick={() => setRole("commercial")}
                  className="relative rounded-lg border p-3 text-left transition"
                  style={{
                    borderColor:
                      role === "commercial" ? "var(--accent)" : "var(--border)",
                    backgroundColor:
                      role === "commercial" ? "var(--accent-bg)" : "var(--bg)",
                  }}
                >
                  {role === "commercial" && (
                    <div
                      className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full text-white"
                      style={{ backgroundColor: "var(--accent)" }}
                    >
                      <Check size={12} strokeWidth={3} />
                    </div>
                  )}

                  <div
                    className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg"
                    style={{
                      backgroundColor: "var(--accent-bg)",
                      color: "var(--accent)",
                    }}
                  >
                    <BriefcaseBusiness size={17} />
                  </div>

                  <p
                    className="text-xs font-semibold"
                    style={{ color: "var(--text-h)" }}
                  >
                    Commercial
                  </p>

                  <p
                    className="mt-1 text-[11px] leading-4"
                    style={{ color: "var(--text)" }}
                  >
                    Gérer les clients et le suivi commercial.
                  </p>
                </button>
              </div>

              {/* SÉPARATION */}
              <div
                className="my-5 h-px"
                style={{ backgroundColor: "var(--border)" }}
              />

              {/* EMAIL */}
              <div className="space-y-4">
                <Input
                  label="Email professionnel"
                  type="email"
                  placeholder="jean@entreprise.com"
                  icon={<Mail size={17} />}
                  errors={[]}
                />

                {/* MOT DE PASSE */}
                <PasswordInput
                  label="Mot de passe"
                  placeholder="Votre mot de passe"
                  errors={[]}
                />
              </div>

              {/* MOT DE PASSE OUBLIÉ */}
              <div className="mt-3 flex justify-end">
                <a
                  href="/mot-de-passe-oublie"
                  className="text-xs font-medium"
                  style={{ color: "var(--accent)" }}
                >
                  Mot de passe oublié ?
                </a>
              </div>

              {/* BOUTON */}
              <button
                type="button"
                disabled={!role}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                style={{ backgroundColor: "var(--accent)" }}
              >
                Se connecter
                <ArrowRight size={15} />
              </button>

              {/* INFORMATION */}
              <div
                className="mt-5 rounded-lg border p-3"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "var(--code-bg)",
                }}
              >
                <p
                  className="text-center text-[11px] leading-5"
                  style={{ color: "var(--text)" }}
                >
                  Sélectionnez votre rôle avant de vous connecter. Votre espace
                  sera adapté aux fonctionnalités disponibles pour votre profil.
                </p>
              </div>
            </section>
          </div>

          {/* INSCRIPTION */}
          <p
            className="mt-4 text-center text-xs"
            style={{ color: "var(--text)" }}
          >
            Vous n'avez pas encore de compte ?{" "}
            <a
              href="/inscription"
              className="font-medium"
              style={{ color: "var(--accent)" }}
            >
              Créer un compte
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}

export default Login;
