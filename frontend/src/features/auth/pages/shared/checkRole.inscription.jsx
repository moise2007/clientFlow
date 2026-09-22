import { useState } from "react";
import {
  BriefcaseBusiness,
  ClipboardList,
  ArrowRight,
  Check,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function RegisterCheckRole() {
  const [role, setRole] = useState(null);
  const navigate = useNavigate()

  const roles = [
    {
      id: "administrateur",
      title: "Administrateur de projet",
      icon: <ClipboardList size={21} />,
      description:
        "Organise le travail de l'équipe et suit les projets de l'entreprise.",
      responsibilities: [
        "Créer et gérer les projets",
        "Ajouter des membres aux projets",
        "Suivre l'activité de l'équipe",
        "Consulter l'historique des actions",
      ],
    },
    {
      id: "commercial",
      title: "Commercial",
      icon: <BriefcaseBusiness size={21} />,
      description:
        "Gère les clients et assure le suivi commercial au quotidien.",
      responsibilities: [
        "Gérer ses clients",
        "Planifier les appels et rendez-vous",
        "Rédiger les comptes rendus",
        "Programmer les relances par email",
      ],
    },
  ];

  function handleSubmit(){
    navigate(`/auth/${role}`)
  }

  return (
    <main
      className="min-h-screen px-4 py-8 sm:px-6"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-4xl items-center justify-center">
        <div className="w-full">
          <div className="mx-auto mb-7 max-w-xl text-center">
            <h1
              className="text-2xl font-bold tracking-tight sm:text-3xl"
              style={{ color: "var(--text-h)" }}
            >
              Créer votre compte
            </h1>

            <p
              className="mx-auto mt-2 max-w-lg text-sm leading-5"
              style={{ color: "var(--text)" }}
            >
              Choisissez votre rôle dans l'entreprise. Votre rôle détermine les
              fonctionnalités et les informations auxquelles vous aurez accès
              dans ClientFlow.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {roles.map((item) => {
              const selected = role === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setRole(item.id)}
                  className="relative rounded-xl border p-5 text-left transition hover:-translate-y-0.5"
                  style={{
                    borderColor: selected ? "var(--accent)" : "var(--border)",
                    backgroundColor: selected
                      ? "var(--accent-bg)"
                      : "var(--bg)",
                    boxShadow: selected ? "0 0 0 1px var(--accent)" : "none",
                  }}
                >
                  {selected && (
                    <div
                      className="absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full text-white"
                      style={{ backgroundColor: "var(--accent)" }}
                    >
                      <Check size={12} strokeWidth={3} />
                    </div>
                  )}

                  <div
                    className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg"
                    style={{
                      color: "var(--accent)",
                      backgroundColor: "var(--accent-bg)",
                    }}
                  >
                    {item.icon}
                  </div>

                  <h2
                    className="text-base font-semibold"
                    style={{ color: "var(--text-h)" }}
                  >
                    {item.title}
                  </h2>

                  <p
                    className="mt-1.5 text-sm leading-5"
                    style={{ color: "var(--text)" }}
                  >
                    {item.description}
                  </p>

                  <div
                    className="my-4 h-px"
                    style={{ backgroundColor: "var(--border)" }}
                  />

                  <p
                    className="mb-2 text-sm font-semibold"
                    style={{ color: "var(--text-h)" }}
                  >
                    Ce rôle permet de :
                  </p>

                  <ul className="space-y-2.5">
                    {item.responsibilities.map((responsibility) => (
                      <li
                        key={responsibility}
                        className="flex items-start gap-2.5 text-sm"
                        style={{ color: "var(--text)" }}
                      >
                        <span
                          className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                          style={{
                            backgroundColor: "var(--accent-bg)",
                            color: "var(--accent)",
                          }}
                        >
                          <Check size={10} strokeWidth={3} />
                        </span>

                        <span>{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!role}
              className="flex w-full max-w-xs items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
              style={{ backgroundColor: "var(--accent)" }}
            >
              Continuer
              <ArrowRight size={17} />
            </button>
          </div>

          <p
            className="mt-5 text-center text-sm"
            style={{ color: "var(--text)" }}
          >
            Vous avez déjà un compte ?{" "}
            <a
              href="/login"
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

export default RegisterCheckRole;
