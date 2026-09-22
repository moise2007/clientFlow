import { useMemo, useState } from "react";
import {
  CheckCircle2,
  MoreHorizontal,
  PhoneCall,
  Plus,
  Trash2,
  UserPlus,
  UserRound,
} from "lucide-react";

import AppDialog from "../dialog/AppDialog";
import ConfirmDialog from "../dialog/ConfirmDialog";
import SelectCommercialDialog from "../dialog/SelectCommercialDialog";

function ProjectCommercials({
  commercials = [],
  calls = [],
  onAdd,
  onRemove,
}) {
  const [addDialog, setAddDialog] = useState(false);

  const [selectedCommercial, setSelectedCommercial] =
    useState(null);

  const [menuOpen, setMenuOpen] = useState(null);

  const [removeDialog, setRemoveDialog] = useState(false);

  const [reassignDialog, setReassignDialog] =
    useState(false);

  const [commercialToRemove, setCommercialToRemove] =
    useState(null);

  const [reassignCommercial, setReassignCommercial] =
    useState("");

  const [permissionsDialog, setPermissionsDialog] =
    useState(false);

  const [permissions, setPermissions] = useState({
    creerClient: true,
    rapportAppel: true,
    programmerAppel: false,
    voirTousClients: false,
  });

  const availableCommercials = useMemo(() => {
    const currentIds = commercials.map(
      (commercial) => commercial.id
    );

    const allCommercials = [
      {
        id: "commercial_4",
        prenom: "Sarah",
        nom: "Atangana",
        email: "sarah.atangana@entreprise.com",
        telephone: "+237 691 000 004",
        actif: true,
      },
      {
        id: "commercial_5",
        prenom: "Eric",
        nom: "Mballa",
        email: "eric.mballa@entreprise.com",
        telephone: "+237 691 000 005",
        actif: true,
      },
    ];

    return allCommercials.filter(
      (commercial) =>
        !currentIds.includes(commercial.id)
    );
  }, [commercials]);

  function getCommercialCalls(commercialId) {
    return calls.filter(
      (call) => call.commercialId === commercialId
    );
  }

  function openRemoveDialog(commercial) {
    setCommercialToRemove(commercial);
    setRemoveDialog(true);
    setMenuOpen(null);
  }

  function handleRemove() {
    if (!commercialToRemove) return;

    const assignedCalls = getCommercialCalls(
      commercialToRemove.id
    );

    if (assignedCalls.length > 0) {
      setRemoveDialog(false);
      setReassignDialog(true);
      return;
    }

    onRemove(commercialToRemove.id);

    setCommercialToRemove(null);
    setRemoveDialog(false);
  }

  function handleReassign() {
    if (!commercialToRemove || !reassignCommercial) {
      return;
    }

    console.log(
      "Réassignation des appels",
      commercialToRemove.id,
      reassignCommercial
    );

    onRemove(commercialToRemove.id);

    setCommercialToRemove(null);
    setReassignCommercial("");
    setReassignDialog(false);
  }

  function openPermissions(commercial) {
    setSelectedCommercial(commercial);
    setPermissionsDialog(true);
    setMenuOpen(null);
  }

  function togglePermission(permission) {
    setPermissions((current) => ({
      ...current,
      [permission]: !current[permission],
    }));
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p
            className="text-[14px] font-semibold"
            style={{ color: "var(--text-h)" }}
          >
            Équipe du projet
          </p>

          <p
            className="mt-1 text-[12px]"
            style={{ color: "var(--text)" }}
          >
            {commercials.length} commercial
            {commercials.length > 1 ? "s" : ""} affecté
            {commercials.length > 1 ? "s" : ""}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setAddDialog(true)}
          className="flex shrink-0 items-center gap-2 rounded-lg px-3 py-2.5 text-[12px] font-medium text-white transition hover:opacity-90"
          style={{
            backgroundColor: "var(--accent)",
          }}
        >
          <Plus size={15} />
          <span>Ajouter</span>
        </button>
      </div>

      {/* Liste */}
      {commercials.length > 0 ? (
        <div
          className="overflow-hidden rounded-xl border"
          style={{
            borderColor: "var(--border)",
          }}
        >
          {commercials.map((commercial, index) => {
            const commercialCalls =
              getCommercialCalls(commercial.id);

            const completedCalls =
              commercialCalls.filter(
                (call) => call.statut === "termine"
              ).length;

            const scheduledCalls =
              commercialCalls.filter(
                (call) => call.statut === "programme"
              ).length;

            return (
              <CommercialListItem
                key={commercial.id}
                commercial={commercial}
                callsCount={commercialCalls.length}
                completedCalls={completedCalls}
                scheduledCalls={scheduledCalls}
                menuOpen={menuOpen === commercial.id}
                onMenu={() =>
                  setMenuOpen(
                    menuOpen === commercial.id
                      ? null
                      : commercial.id
                  )
                }
                onPermissions={() =>
                  openPermissions(commercial)
                }
                onRemove={() =>
                  openRemoveDialog(commercial)
                }
                isLast={index === commercials.length - 1}
              />
            );
          })}
        </div>
      ) : (
        <div
          className="rounded-xl border py-12 text-center"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "#f5f9ff",
          }}
        >
          <div
            className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl"
            style={{
              color: "var(--primary)",
              backgroundColor: "var(--primary-light)",
            }}
          >
            <UserPlus size={21} />
          </div>

          <p
            className="mt-3 text-[14px] font-semibold"
            style={{ color: "var(--text-h)" }}
          >
            Aucun commercial
          </p>

          <p
            className="mt-1 text-[12px]"
            style={{ color: "var(--text)" }}
          >
            Aucun commercial n'est encore affecté à ce projet.
          </p>
        </div>
      )}

      {/* Ajouter commercial */}
      <SelectCommercialDialog
        open={addDialog}
        onClose={() => setAddDialog(false)}
        commercials={availableCommercials}
        selectedIds={[]}
        onSelect={(commercialId) => {
          const commercial =
            availableCommercials.find(
              (item) => item.id === commercialId
            );

          if (commercial) {
            onAdd(commercial);
            setAddDialog(false);
          }
        }}
        onConfirm={() => {}}
      />

      {/* Confirmation retrait */}
      <ConfirmDialog
        open={removeDialog}
        onClose={() => {
          setRemoveDialog(false);
          setCommercialToRemove(null);
        }}
        onConfirm={handleRemove}
        title="Retirer le commercial"
        description={
          commercialToRemove
            ? `Voulez-vous retirer ${commercialToRemove.prenom} ${commercialToRemove.nom} de ce projet ?`
            : ""
        }
        confirmText="Retirer"
      />

      {/* Réassignation */}
      <AppDialog
        open={reassignDialog}
        onClose={() => setReassignDialog(false)}
        title="Réassigner les appels"
        description={
          commercialToRemove
            ? `${commercialToRemove.prenom} ${commercialToRemove.nom} possède encore des appels attribués.`
            : ""
        }
        size="sm"
      >
        <p
          className="text-[13px] leading-5"
          style={{ color: "var(--text)" }}
        >
          Avant de retirer ce commercial, choisissez la
          personne qui récupérera ses appels.
        </p>

        <div className="mt-4 space-y-2">
          {commercials
            .filter(
              (commercial) =>
                commercial.id !==
                commercialToRemove?.id
            )
            .map((commercial) => {
              const selected =
                reassignCommercial === commercial.id;

              return (
                <button
                  key={commercial.id}
                  type="button"
                  onClick={() =>
                    setReassignCommercial(
                      commercial.id
                    )
                  }
                  className="flex w-full items-center gap-3 rounded-lg border p-3 text-left transition"
                  style={{
                    borderColor: selected
                      ? "var(--primary)"
                      : "var(--border)",
                    backgroundColor: selected
                      ? "var(--primary-light)"
                      : "#fff",
                  }}
                >
                  <UserRound
                    size={17}
                    style={{
                      color: "var(--primary)",
                    }}
                  />

                  <div className="min-w-0">
                    <p
                      className="text-[13px] font-medium"
                      style={{
                        color: "var(--text-h)",
                      }}
                    >
                      {commercial.prenom}{" "}
                      {commercial.nom}
                    </p>

                    <p
                      className="truncate text-[11px]"
                      style={{
                        color: "var(--text)",
                      }}
                    >
                      {commercial.email}
                    </p>
                  </div>
                </button>
              );
            })}
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setReassignDialog(false)}
            className="rounded-lg border px-3 py-2.5 text-[12px]"
            style={{
              borderColor: "var(--border)",
              color: "var(--text-h)",
            }}
          >
            Annuler
          </button>

          <button
            type="button"
            disabled={!reassignCommercial}
            onClick={handleReassign}
            className="rounded-lg px-3 py-2.5 text-[12px] font-medium text-white disabled:opacity-50"
            style={{
              backgroundColor: "var(--primary)",
            }}
          >
            Réassigner et retirer
          </button>
        </div>
      </AppDialog>

      {/* Permissions */}
      <AppDialog
        open={permissionsDialog}
        onClose={() => setPermissionsDialog(false)}
        title="Actions du commercial"
        description={
          selectedCommercial
            ? `${selectedCommercial.prenom} ${selectedCommercial.nom}`
            : ""
        }
        size="md"
      >
        <div className="space-y-2">
          <Permission
            label="Créer un client"
            checked={permissions.creerClient}
            onChange={() =>
              togglePermission("creerClient")
            }
          />

          <Permission
            label="Ajouter un rapport d'appel"
            checked={permissions.rapportAppel}
            onChange={() =>
              togglePermission("rapportAppel")
            }
          />

          <Permission
            label="Programmer un appel"
            checked={permissions.programmerAppel}
            onChange={() =>
              togglePermission("programmerAppel")
            }
          />

          <Permission
            label="Voir tous les clients"
            checked={permissions.voirTousClients}
            onChange={() =>
              togglePermission("voirTousClients")
            }
          />
        </div>

        <button
          type="button"
          onClick={() => {
            console.log(
              "Permissions sauvegardées",
              selectedCommercial,
              permissions
            );

            setPermissionsDialog(false);
          }}
          className="mt-5 w-full rounded-lg py-2.5 text-[13px] font-medium text-white"
          style={{
            backgroundColor: "var(--primary)",
          }}
        >
          Enregistrer les permissions
        </button>
      </AppDialog>
    </div>
  );
}

function CommercialListItem({
  commercial,
  callsCount,
  completedCalls,
  scheduledCalls,
  menuOpen,
  onMenu,
  onPermissions,
  onRemove,
  isLast,
}) {
  return (
    <div
      className={`relative ${
        !isLast ? "border-b" : ""
      }`}
      style={{
        borderColor: "var(--border)",
        backgroundColor: "#f5f9ff",
      }}
    >
      {/* Bordure gauche */}
      <div
        className="absolute left-0 top-0 h-full w-1"
        style={{
          backgroundColor: commercial.actif
            ? "var(--success)"
            : "var(--text)",
        }}
      />

      <div className="flex min-w-0 items-center gap-3 p-3 sm:gap-4 sm:px-4">
        {/* Avatar */}
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
          style={{
            backgroundColor: "var(--primary-light)",
            color: "var(--primary)",
          }}
        >
          <UserRound size={18} />
        </div>

        {/* Identité */}
        <div className="min-w-[145px] flex-1">
          <p
            className="truncate text-[14px] font-semibold"
            style={{
              color: "var(--text-h)",
            }}
          >
            {commercial.prenom} {commercial.nom}
          </p>

          <p
            className="mt-0.5 truncate text-[12px]"
            style={{
              color: "var(--text)",
            }}
          >
            {commercial.email}
          </p>

          {/* Statut mobile */}
          <div className="mt-1.5 flex items-center gap-1.5 sm:hidden">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{
                backgroundColor: commercial.actif
                  ? "var(--success)"
                  : "var(--text)",
              }}
            />

            <span
              className="text-[11px]"
              style={{
                color: commercial.actif
                  ? "var(--success)"
                  : "var(--text)",
              }}
            >
              {commercial.actif ? "Actif" : "Inactif"}
            </span>
          </div>
        </div>

        {/* Téléphone */}
        <div className="hidden min-w-[135px] items-center gap-2 lg:flex">
          <PhoneCall
            size={14}
            style={{
              color: "var(--primary)",
            }}
          />

          <span
            className="truncate text-[12px]"
            style={{
              color: "var(--text)",
            }}
          >
            {commercial.telephone || "—"}
          </span>
        </div>

        {/* Appels */}
        <Stat
          icon={PhoneCall}
          label="Appels"
          value={callsCount}
        />

        {/* Terminés */}
        <Stat
          icon={CheckCircle2}
          label="Terminés"
          value={completedCalls}
        />

        {/* Programmés */}
        <Stat
          icon={PhoneCall}
          label="Programmés"
          value={scheduledCalls}
        />

        {/* Statut desktop */}
        <div className="hidden min-w-[65px] items-center gap-1.5 sm:flex">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{
              backgroundColor: commercial.actif
                ? "var(--success)"
                : "var(--text)",
            }}
          />

          <span
            className="text-[11px] font-medium"
            style={{
              color: commercial.actif
                ? "var(--success)"
                : "var(--text)",
            }}
          >
            {commercial.actif ? "Actif" : "Inactif"}
          </span>
        </div>

        {/* Menu */}
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={onMenu}
            className="flex h-9 w-9 items-center justify-center rounded-lg transition hover:bg-white"
            style={{
              color: "var(--text)",
            }}
          >
            <MoreHorizontal size={18} />
          </button>

          {menuOpen && (
            <div
              className="absolute right-0 top-10 z-30 w-48 rounded-lg border bg-white p-1"
              style={{
                borderColor: "var(--border)",
                boxShadow:
                  "0 8px 20px rgba(0,0,0,0.08)",
              }}
            >
              <button
                type="button"
                onClick={onPermissions}
                className="flex w-full items-center gap-2 rounded-md px-3 py-2.5 text-left text-[12px] transition hover:bg-gray-50"
                style={{
                  color: "var(--text-h)",
                }}
              >
                <CheckCircle2 size={14} />
                Gérer les actions
              </button>

              <button
                type="button"
                onClick={onRemove}
                className="flex w-full items-center gap-2 rounded-md px-3 py-2.5 text-left text-[12px] transition hover:bg-red-50"
                style={{
                  color: "var(--danger)",
                }}
              >
                <Trash2 size={14} />
                Retirer du projet
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Statistiques mobiles */}
      <div className="grid grid-cols-3 gap-2 px-3 pb-3 sm:hidden">
        <MobileStat
          label="Appels"
          value={callsCount}
        />

        <MobileStat
          label="Terminés"
          value={completedCalls}
        />

        <MobileStat
          label="Programmés"
          value={scheduledCalls}
        />
      </div>
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="hidden min-w-[70px] sm:block">
      <div className="flex items-center gap-1.5">
        <Icon
          size={13}
          style={{
            color: "var(--primary)",
          }}
        />

        <span
          className="text-[10px]"
          style={{
            color: "var(--text)",
          }}
        >
          {label}
        </span>
      </div>

      <p
        className="mt-0.5 text-[13px] font-semibold"
        style={{
          color: "var(--text-h)",
        }}
      >
        {value}
      </p>
    </div>
  );
}

function MobileStat({
  label,
  value,
}) {
  return (
    <div
      className="rounded-lg border p-2"
      style={{
        borderColor: "rgba(37,99,235,0.08)",
        backgroundColor: "rgba(255,255,255,0.65)",
      }}
    >
      <p
        className="text-[10px]"
        style={{
          color: "var(--text)",
        }}
      >
        {label}
      </p>

      <p
        className="mt-0.5 text-[13px] font-semibold"
        style={{
          color: "var(--text-h)",
        }}
      >
        {value}
      </p>
    </div>
  );
}

function Permission({
  label,
  checked,
  onChange,
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="flex w-full items-center justify-between rounded-lg border p-3 text-left"
      style={{
        borderColor: "var(--border)",
      }}
    >
      <span
        className="text-[13px]"
        style={{
          color: "var(--text-h)",
        }}
      >
        {label}
      </span>

      <span
        className="flex h-5 w-9 items-center rounded-full p-0.5 transition"
        style={{
          backgroundColor: checked
            ? "var(--primary)"
            : "#d1d5db",
        }}
      >
        <span
          className="h-4 w-4 rounded-full bg-white transition"
          style={{
            transform: checked
              ? "translateX(16px)"
              : "translateX(0)",
          }}
        />
      </span>
    </button>
  );
}

export default ProjectCommercials;