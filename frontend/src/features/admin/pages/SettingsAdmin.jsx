import { useState } from "react";
import {
  User,
  Shield,
  PhoneCall,
  Users,
  UserPlus,
  FileText,
  CalendarDays,
  Eye,
  Check,
  Building2,
  Mail,
  Phone,
  Lock,
  Clock,
} from "lucide-react";

function SettingsAdmin() {
  const [autoCall, setAutoCall] = useState(false);
  const [daysAfterLastCall, setDaysAfterLastCall] = useState(7);

  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [reminderMinutes, setReminderMinutes] = useState(30);

  const [selectedCommercial, setSelectedCommercial] = useState("1");

  const [personalInfo, setPersonalInfo] = useState({
    prenom: "Jean",
    nom: "Dupont",
    email: "jean@entreprise.com",
    telephone: "690000000",
    entreprise: "Mon Entreprise",
  });

  const [passwords, setPasswords] = useState({
    actuel: "",
    nouveau: "",
    confirmation: "",
  });

  const [permissions, setPermissions] = useState({
    creerClient: true,
    rapportAppel: true,
    programmerAppel: false,
    voirTousClients: false,
  });

  const commercials = [
    {
      id: "1",
      nom: "Jean Dupont",
      email: "jean@entreprise.com",
    },
    {
      id: "2",
      nom: "Paul Martin",
      email: "paul@entreprise.com",
    },
    {
      id: "3",
      nom: "Marie Bernard",
      email: "marie@entreprise.com",
    },
  ];

  const permissionItems = [
    {
      key: "creerClient",
      title: "Créer un client",
      description:
        "Permet au commercial d'ajouter de nouveaux clients.",
      icon: UserPlus,
    },
    {
      key: "rapportAppel",
      title: "Ajouter un rapport d'appel",
      description:
        "Permet au commercial d'enregistrer le compte rendu d'un appel.",
      icon: FileText,
    },
    {
      key: "programmerAppel",
      title: "Programmer un appel",
      description:
        "Permet au commercial de programmer un appel avec un client.",
      icon: CalendarDays,
    },
    {
      key: "voirTousClients",
      title: "Voir les données de tous les clients",
      description:
        "Permet au commercial d'accéder aux clients de toute l'entreprise.",
      icon: Eye,
    },
  ];

  const updatePersonalInfo = (field, value) => {
    setPersonalInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updatePassword = (field, value) => {
    setPasswords((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const togglePermission = (key) => {
    setPermissions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <section >
      <div className="mb-6 max-w-250">
        <h1
          className="text-base font-semibold"
          style={{ color: "var(--text-h)" }}
        >
          Paramètres
        </h1>

        <p
          className="mt-1 text-xs"
          style={{ color: "var(--text)" }}
        >
          Gérez vos informations, la sécurité et les règles de votre
          espace ClientFlow.
        </p>
      </div>

      <div className="space-y-5 max-w-250">

        {/* INFORMATIONS PERSONNELLES */}
        <section
          className="rounded-lg border bg-white p-4 sm:p-5"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex flex-row items-start gap-3">
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
              style={{
                backgroundColor: "#fff7ed",
                color: "#f97316",
              }}
            >
              <User size={18} />
            </div>

            <div className="min-w-0 flex-1">
              <h2
                className="text-sm font-semibold"
                style={{ color: "var(--text-h)" }}
              >
                Informations personnelles
              </h2>

              <p
                className="mt-1 text-xs"
                style={{ color: "var(--text)" }}
              >
                Modifiez vos informations personnelles et celles de votre
                entreprise.
              </p>

              <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-medium">
                    Prénom
                  </label>

                  <div className="relative">
                    <User
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2"
                      style={{ color: "var(--text)" }}
                    />

                    <input
                      value={personalInfo.prenom}
                      onChange={(e) =>
                        updatePersonalInfo(
                          "prenom",
                          e.target.value
                        )
                      }
                      className="w-full rounded-lg border bg-white py-2.5 pl-9 pr-3 text-sm outline-none"
                      style={{
                        borderColor: "var(--border)",
                        color: "var(--text-h)",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium">
                    Nom
                  </label>

                  <input
                    value={personalInfo.nom}
                    onChange={(e) =>
                      updatePersonalInfo("nom", e.target.value)
                    }
                    className="w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none"
                    style={{
                      borderColor: "var(--border)",
                      color: "var(--text-h)",
                    }}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium">
                    Email professionnel
                  </label>

                  <div className="relative">
                    <Mail
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2"
                      style={{ color: "var(--text)" }}
                    />

                    <input
                      type="email"
                      value={personalInfo.email}
                      onChange={(e) =>
                        updatePersonalInfo(
                          "email",
                          e.target.value
                        )
                      }
                      className="w-full rounded-lg border bg-white py-2.5 pl-9 pr-3 text-sm outline-none"
                      style={{
                        borderColor: "var(--border)",
                        color: "var(--text-h)",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium">
                    Téléphone
                  </label>

                  <div className="relative">
                    <Phone
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2"
                      style={{ color: "var(--text)" }}
                    />

                    <input
                      type="tel"
                      value={personalInfo.telephone}
                      onChange={(e) =>
                        updatePersonalInfo(
                          "telephone",
                          e.target.value
                        )
                      }
                      className="w-full rounded-lg border bg-white py-2.5 pl-9 pr-3 text-sm outline-none"
                      style={{
                        borderColor: "var(--border)",
                        color: "var(--text-h)",
                      }}
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-xs font-medium">
                    Nom de l'entreprise
                  </label>

                  <div className="relative">
                    <Building2
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2"
                      style={{ color: "var(--text)" }}
                    />

                    <input
                      value={personalInfo.entreprise}
                      onChange={(e) =>
                        updatePersonalInfo(
                          "entreprise",
                          e.target.value
                        )
                      }
                      className="w-full rounded-lg border bg-white py-2.5 pl-9 pr-3 text-sm outline-none"
                      style={{
                        borderColor: "var(--border)",
                        color: "var(--text-h)",
                      }}
                    />
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="mt-5 rounded-lg px-4 py-2.5 text-xs font-medium text-white"
                style={{
                  backgroundColor: "var(--accent)",
                }}
              >
                Enregistrer les informations
              </button>
            </div>
          </div>
        </section>

        {/* SÉCURITÉ */}
        <section
          className="rounded-lg border bg-white p-4 sm:p-5"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex flex-row items-start gap-3">
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
              style={{
                backgroundColor: "#f5f3ff",
                color: "#7c3aed",
              }}
            >
              <Shield size={18} />
            </div>

            <div className="min-w-0 flex-1">
              <h2
                className="text-sm font-semibold"
                style={{ color: "var(--text-h)" }}
              >
                Sécurité
              </h2>

              <p
                className="mt-1 text-xs"
                style={{ color: "var(--text)" }}
              >
                Modifiez le mot de passe de votre compte administrateur.
              </p>

              <div className="mt-5 space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium">
                    Mot de passe actuel
                  </label>

                  <div className="relative">
                    <Lock
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2"
                      style={{ color: "var(--text)" }}
                    />

                    <input
                      type="password"
                      value={passwords.actuel}
                      onChange={(e) =>
                        updatePassword("actuel", e.target.value)
                      }
                      className="w-full rounded-lg border py-2.5 pl-9 pr-3 text-sm outline-none"
                      style={{
                        borderColor: "var(--border)",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium">
                    Nouveau mot de passe
                  </label>

                  <input
                    type="password"
                    value={passwords.nouveau}
                    onChange={(e) =>
                      updatePassword("nouveau", e.target.value)
                    }
                    className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none"
                    style={{
                      borderColor: "var(--border)",
                    }}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium">
                    Confirmer le nouveau mot de passe
                  </label>

                  <input
                    type="password"
                    value={passwords.confirmation}
                    onChange={(e) =>
                      updatePassword(
                        "confirmation",
                        e.target.value
                      )
                    }
                    className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none"
                    style={{
                      borderColor: "var(--border)",
                    }}
                  />
                </div>
              </div>

              <button
                type="button"
                className="mt-5 rounded-lg px-4 py-2.5 text-xs font-medium text-white"
                style={{
                  backgroundColor: "var(--accent)",
                }}
              >
                Modifier le mot de passe
              </button>
            </div>
          </div>
        </section>

        {/* RAPPELS D'APPELS */}
        <section
          className="rounded-lg border bg-white p-4 sm:p-5"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex flex-row items-start gap-3">
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
              style={{
                backgroundColor: "#eff6ff",
                color: "#2563eb",
              }}
            >
              <Clock size={18} />
            </div>

            <div className="min-w-0 flex-1">
              

              <div className="flex flex-row items-center justify-between gap-3">
                <div>
                    <h2
                        className="text-sm font-semibold"
                        style={{ color: "var(--text-h)" }}
                    >
                        Rappels d'appels
                    </h2>

                    <p
                        className="mt-1 text-xs"
                        style={{ color: "var(--text)" }}
                    >
                        Recevez un rappel par email avant le début d'un appel
                        programmé.
                    </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setReminderEnabled(!reminderEnabled)
                  }
                  className="relative h-6 w-11 shrink-0 rounded-full"
                  style={{
                    backgroundColor: reminderEnabled
                      ? "var(--accent)"
                      : "var(--border)",
                  }}
                >
                  <span
                    className="absolute top-1 h-4 w-4 rounded-full bg-white transition"
                    style={{
                      left: reminderEnabled
                        ? "1.5rem"
                        : "0.25rem",
                    }}
                  />
                </button>
                
              </div>

              {reminderEnabled && (
                <div className="mt-5">
                  <label className="mb-2 block text-xs font-medium">
                    Envoyer le rappel combien de minutes avant ?
                  </label>

                  <select
                    value={reminderMinutes}
                    onChange={(e) =>
                      setReminderMinutes(Number(e.target.value))
                    }
                    className="w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none sm:max-w-xs"
                    style={{
                      borderColor: "var(--border)",
                      color: "var(--text-h)",
                    }}
                  >
                    <option value={5}>5 minutes avant</option>
                    <option value={10}>10 minutes avant</option>
                    <option value={15}>15 minutes avant</option>
                    <option value={30}>30 minutes avant</option>
                    <option value={45}>45 minutes avant</option>
                    <option value={60}>1 heure avant</option>
                    <option value={120}>2 heures avant</option>
                    <option value={1440}>1 jour avant</option>
                  </select>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* AUTOMATISATION */}
        <section
          className="rounded-lg border bg-white p-4 sm:p-5"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex flex-row items-start gap-3">
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
              style={{
                backgroundColor: "#ecfdf5",
                color: "#059669",
              }}
            >
              <PhoneCall size={18} />
            </div>

            <div className="min-w-0 flex-1">
              

              <div className="flex flex-row items-center justify-between gap-3">
                <div>
                  <h2
                    className="text-sm font-semibold"
                    style={{ color: "var(--text-h)" }}
                >
                    Programmation automatique
                </h2>

                <p
                    className="mt-1 text-xs"
                    style={{ color: "var(--text)" }}
                >
                    Programmez automatiquement un nouvel appel après le
                    dernier appel avec un client.
                </p>
              </div>

                <button
                  type="button"
                  onClick={() => setAutoCall(!autoCall)}
                  className="relative h-6 w-11 shrink-0 rounded-full"
                  style={{
                    backgroundColor: autoCall
                      ? "var(--accent)"
                      : "var(--border)",
                  }}
                >
                  <span
                    className="absolute top-1 h-4 w-4 rounded-full bg-white transition"
                    style={{
                      left: autoCall
                        ? "1.5rem"
                        : "0.25rem",
                    }}
                  />
                </button>
              </div>

              {autoCall && (
                <div className="mt-5">
                  <label className="mb-2 block text-xs font-medium">
                    Programmer le prochain appel après
                  </label>

                  <div className="flex flex-row items-center gap-3">
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={daysAfterLastCall}
                      onChange={(e) =>
                        setDaysAfterLastCall(
                          Math.min(
                            30,
                            Math.max(1, Number(e.target.value))
                          )
                        )
                      }
                      className="w-24 rounded-lg border px-3 py-2.5 text-sm outline-none"
                      style={{
                        borderColor: "var(--border)",
                      }}
                    />

                    <span className="text-xs">
                      jour{daysAfterLastCall > 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* PERMISSIONS */}
        <section
          className="rounded-lg border bg-white p-4 sm:p-5"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex flex-row items-start gap-3">
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
              style={{
                backgroundColor: "#fef2f2",
                color: "#dc2626",
              }}
            >
              <Users size={18} />
            </div>

            <div className="min-w-0 flex-1">
              <h2
                className="text-sm font-semibold"
                style={{ color: "var(--text-h)" }}
              >
                Permissions des commerciaux
              </h2>

              <p
                className="mt-1 text-xs"
                style={{ color: "var(--text)" }}
              >
                Définissez les actions que chaque commercial peut
                effectuer.
              </p>

              <div className="mt-5">
                <label className="mb-2 block text-xs font-medium">
                  Commercial
                </label>

                <select
                  value={selectedCommercial}
                  onChange={(e) =>
                    setSelectedCommercial(e.target.value)
                  }
                  className="w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none"
                  style={{
                    borderColor: "var(--border)",
                  }}
                >
                  {commercials.map((commercial) => (
                    <option
                      key={commercial.id}
                      value={commercial.id}
                    >
                      {commercial.nom} — {commercial.email}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-5 space-y-2">
                {permissionItems.map((permission) => {
                  const Icon = permission.icon;
                  const enabled = permissions[permission.key];

                  return (
                    <button
                      key={permission.key}
                      type="button"
                      onClick={() =>
                        togglePermission(permission.key)
                      }
                      className="flex w-full flex-row items-center gap-3 rounded-lg border p-3 text-left"
                      style={{
                        borderColor: enabled
                          ? "var(--accent-border)"
                          : "var(--border)",
                        backgroundColor: enabled
                          ? "var(--accent-bg)"
                          : "white",
                      }}
                    >
                      <Icon
                        size={17}
                        className="shrink-0"
                        style={{
                          color: enabled
                            ? "var(--accent)"
                            : "var(--text)",
                        }}
                      />

                      <div className="min-w-0 flex-1">
                        <p
                          className="text-sm font-medium"
                          style={{ color: "var(--text-h)" }}
                        >
                          {permission.title}
                        </p>

                        <p
                          className="mt-0.5 text-xs leading-5"
                          style={{ color: "var(--text)" }}
                        >
                          {permission.description}
                        </p>
                      </div>

                      <div
                        className="flex h-5 w-5 shrink-0 items-center justify-center rounded border"
                        style={{
                          borderColor: enabled
                            ? "var(--accent)"
                            : "var(--border)",
                          backgroundColor: enabled
                            ? "var(--accent)"
                            : "white",
                        }}
                      >
                        {enabled && (
                          <Check
                            size={13}
                            color="white"
                            strokeWidth={3}
                          />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                className="mt-5 rounded-lg px-4 py-2.5 text-xs font-medium text-white"
                style={{
                  backgroundColor: "var(--accent)",
                }}
              >
                Enregistrer les permissions
              </button>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

export default SettingsAdmin;