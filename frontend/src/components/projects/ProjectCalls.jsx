import { useMemo, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Eye,
  Phone,
  PhoneCall,
  Trash2,
  UserRound,
  X,
} from "lucide-react";

import ConfirmDialog from "../dialog/ConfirmDialog";
import SelectCommercialDialog from "../dialog/SelectCommercialDialog";
import CallDetailsDialog from "../dialog/CallDetailsDialog";

function ProjectCalls({
  calls = [],
  clients = [],
  commercials = [],
  onAssign,
  onCancel,
  onDelete,
}) {
  const [filter, setFilter] = useState("tous");
  const [selectedCalls, setSelectedCalls] = useState([]);

  const [assignDialog, setAssignDialog] = useState(false);
  const [selectedCommercial, setSelectedCommercial] = useState("");

  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    type: null,
  });

  const [selectedCall, setSelectedCall] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const filteredCalls = useMemo(() => {
    if (filter === "tous") {
      return calls;
    }

    return calls.filter((call) => call.statut === filter);
  }, [calls, filter]);

  const allVisibleSelected =
    filteredCalls.length > 0 &&
    filteredCalls.every((call) =>
      selectedCalls.includes(call.id)
    );

  function toggleCall(callId) {
    setSelectedCalls((current) => {
      if (current.includes(callId)) {
        return current.filter((id) => id !== callId);
      }

      return [...current, callId];
    });
  }

  function toggleAll() {
    if (allVisibleSelected) {
      setSelectedCalls((current) =>
        current.filter(
          (id) =>
            !filteredCalls.some((call) => call.id === id)
        )
      );

      return;
    }

    setSelectedCalls((current) => [
      ...new Set([
        ...current,
        ...filteredCalls.map((call) => call.id),
      ]),
    ]);
  }

  function openAssignDialog() {
    setSelectedCommercial("");
    setAssignDialog(true);
  }

  function handleAssign() {
    if (!selectedCommercial || selectedCalls.length === 0) {
      return;
    }

    onAssign(selectedCalls, selectedCommercial);

    setSelectedCalls([]);
    setAssignDialog(false);
    setSelectedCommercial("");
  }

  function openConfirm(type) {
    setConfirmDialog({
      open: true,
      type,
    });
  }

  function closeConfirm() {
    setConfirmDialog({
      open: false,
      type: null,
    });
  }

  function confirmAction() {
    const type = confirmDialog.type;

    if (type === "cancel") {
      onCancel(selectedCalls);
    }

    if (type === "delete") {
      onDelete(selectedCalls);
    }

    setSelectedCalls([]);
    closeConfirm();
  }

  function openCallDetails(call) {
    setSelectedCall(buildCallDetails(call));
    setDetailsOpen(true);
  }

  function buildCallDetails(call) {
    const client = clients.find(
      (item) => item.id === call.clientId
    );

    const commercial = commercials.find(
      (item) => item.id === call.commercialId
    );

    return {
      ...call,
      client: client
        ? `${client.prenom} ${client.nom}`
        : "Client inconnu",
      commercial: commercial
        ? `${commercial.prenom} ${commercial.nom}`
        : null,
    };
  }

  function getCommercial(commercialId) {
    return commercials.find(
      (commercial) => commercial.id === commercialId
    );
  }

  function getClient(clientId) {
    return clients.find(
      (client) => client.id === clientId
    );
  }

  return (
    <div className="space-y-5">
      {/* Barre de contrôle */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          <FilterButton
            active={filter === "tous"}
            onClick={() => setFilter("tous")}
          >
            Tous
          </FilterButton>

          <FilterButton
            active={filter === "programme"}
            onClick={() => setFilter("programme")}
          >
            Programmés
          </FilterButton>

          <FilterButton
            active={filter === "termine"}
            onClick={() => setFilter("termine")}
          >
            Terminés
          </FilterButton>

          <FilterButton
            active={filter === "annule"}
            onClick={() => setFilter("annule")}
          >
            Annulés
          </FilterButton>
        </div>

        <p
          className="text-xs"
          style={{ color: "var(--text)" }}
        >
          {filteredCalls.length} appel
          {filteredCalls.length > 1 ? "s" : ""}
        </p>
      </div>

      {/* Actions groupées */}
      {selectedCalls.length > 0 && (
        <div
          className="flex flex-wrap items-center gap-2 rounded-xl border p-3"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--primary-light)",
          }}
        >
          <div className="mr-auto flex items-center gap-2">
            <CheckCircle2
              size={17}
              style={{ color: "var(--primary)" }}
            />

            <span
              className="text-sm font-medium"
              style={{ color: "var(--text-h)" }}
            >
              {selectedCalls.length} sélectionné
              {selectedCalls.length > 1 ? "s" : ""}
            </span>
          </div>

          <button
            type="button"
            onClick={openAssignDialog}
            className="flex items-center gap-2 rounded-lg border bg-white px-3 py-2 text-xs font-medium transition hover:bg-gray-50"
            style={{
              borderColor: "var(--border)",
              color: "var(--text-h)",
            }}
          >
            <UserRound size={15} />
            Attribuer
          </button>

          <button
            type="button"
            onClick={() => openConfirm("cancel")}
            className="flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition"
            style={{
              borderColor: "#fde68a",
              color: "#b45309",
              backgroundColor: "#fffbeb",
            }}
          >
            <X size={15} />
            Annuler
          </button>

          <button
            type="button"
            onClick={() => openConfirm("delete")}
            className="flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition"
            style={{
              borderColor: "#fecaca",
              color: "var(--danger)",
              backgroundColor: "var(--danger-light)",
            }}
          >
            <Trash2 size={15} />
            Supprimer
          </button>
        </div>
      )}

      {/* Tableau desktop */}
      <div
        className="hidden overflow-hidden rounded-xl border md:block"
        style={{ borderColor: "var(--border)" }}
      >
        <table className="w-full text-left">
          <thead
            style={{
              backgroundColor: "var(--surface)",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <tr>
              <th className="w-10 px-4 py-3.5">
                <input
                  type="checkbox"
                  checked={allVisibleSelected}
                  onChange={toggleAll}
                  className="h-4 w-4"
                />
              </th>

              <TableHeader>Client</TableHeader>
              <TableHeader>Appel</TableHeader>
              <TableHeader>Date</TableHeader>
              <TableHeader>Commercial</TableHeader>
              <TableHeader>Statut</TableHeader>

              <th className="px-3 py-3.5" />
            </tr>
          </thead>

          <tbody>
            {filteredCalls.map((call) => {
              const client = getClient(call.clientId);
              const commercial = getCommercial(
                call.commercialId
              );

              return (
                <CallRow
                  key={call.id}
                  call={call}
                  client={client}
                  commercial={commercial}
                  selected={selectedCalls.includes(call.id)}
                  onToggle={() => toggleCall(call.id)}
                  onView={() => openCallDetails(call)}
                />
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Cartes mobile */}
      <div className="space-y-3 md:hidden">
        {filteredCalls.map((call) => {
          const client = getClient(call.clientId);
          const commercial = getCommercial(
            call.commercialId
          );

          return (
            <MobileCallCard
              key={call.id}
              call={call}
              client={client}
              commercial={commercial}
              selected={selectedCalls.includes(call.id)}
              onToggle={() => toggleCall(call.id)}
              onView={() => openCallDetails(call)}
            />
          );
        })}
      </div>

      {/* État vide */}
      {filteredCalls.length === 0 && (
        <div className="py-12 text-center">
          <div
            className="mx-auto flex h-11 w-11 items-center justify-center rounded-full"
            style={{
              backgroundColor: "var(--primary-light)",
              color: "var(--primary)",
            }}
          >
            <PhoneCall size={21} />
          </div>

          <p
            className="mt-3 text-sm font-medium"
            style={{ color: "var(--text-h)" }}
          >
            Aucun appel
          </p>

          <p
            className="mt-1 text-xs"
            style={{ color: "var(--text)" }}
          >
            Aucun appel ne correspond à ce filtre.
          </p>
        </div>
      )}

      {/* Attribution */}
      <SelectCommercialDialog
        open={assignDialog}
        onClose={() => setAssignDialog(false)}
        commercials={commercials}
        selectedIds={
          selectedCommercial
            ? [selectedCommercial]
            : []
        }
        onSelect={(commercialId) =>
          setSelectedCommercial(commercialId)
        }
        onConfirm={handleAssign}
      />

      {/* Confirmation */}
      <ConfirmDialog
        open={confirmDialog.open}
        onClose={closeConfirm}
        onConfirm={confirmAction}
        title={
          confirmDialog.type === "delete"
            ? "Supprimer les appels"
            : "Annuler les appels"
        }
        description={
          confirmDialog.type === "delete"
            ? `Vous êtes sur le point de supprimer ${selectedCalls.length} appel(s). Cette action est définitive.`
            : `Vous êtes sur le point d'annuler ${selectedCalls.length} appel(s) programmé(s).`
        }
        confirmText={
          confirmDialog.type === "delete"
            ? "Supprimer"
            : "Annuler les appels"
        }
      />

      {/* Détails */}
      <CallDetailsDialog
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        call={selectedCall}
      />
    </div>
  );
}

function TableHeader({ children }) {
  return (
    <th
      className="px-3 py-3.5 text-xs font-medium"
      style={{ color: "var(--text)" }}
    >
      {children}
    </th>
  );
}

function CallRow({
  call,
  client,
  commercial,
  selected,
  onToggle,
  onView,
}) {
  return (
    <tr
      className="border-b last:border-b-0"
      style={{ borderColor: "var(--border)" }}
    >
      <td className="px-4 py-3.5">
        <input
          type="checkbox"
          checked={selected}
          onChange={onToggle}
          className="h-4 w-4"
        />
      </td>

      <td className="px-3 py-3.5">
        <div className="flex items-center gap-2.5">
          <Avatar
            name={`${client?.prenom || ""} ${
              client?.nom || ""
            }`}
          />

          <div className="min-w-0">
            <p
              className="truncate text-sm font-medium"
              style={{ color: "var(--text-h)" }}
            >
              {client
                ? `${client.prenom} ${client.nom}`
                : "Client inconnu"}
            </p>

            <p
              className="truncate text-xs"
              style={{ color: "var(--text)" }}
            >
              {client?.entreprise || "—"}
            </p>
          </div>
        </div>
      </td>

      <td className="px-3 py-3.5">
        <p
          className="text-sm font-medium"
          style={{ color: "var(--text-h)" }}
        >
          {call.titre}
        </p>

        <p
          className="mt-1 text-xs"
          style={{ color: "var(--text)" }}
        >
          {call.duree} min
        </p>
      </td>

      <td className="px-3 py-3.5">
        <div className="flex items-center gap-1.5">
          <CalendarDays
            size={14}
            style={{ color: "var(--primary)" }}
          />

          <span
            className="text-xs"
            style={{ color: "var(--text-h)" }}
          >
            {formatDate(call.date)}
          </span>
        </div>

        <div className="mt-1.5 flex items-center gap-1.5">
          <Clock3
            size={14}
            style={{ color: "var(--text)" }}
          />

          <span
            className="text-xs"
            style={{ color: "var(--text)" }}
          >
            {call.heure}
          </span>
        </div>
      </td>

      <td className="px-3 py-3.5">
        {commercial ? (
          <div className="flex items-center gap-2">
            <Avatar
              name={`${commercial.prenom} ${commercial.nom}`}
            />

            <span
              className="text-xs"
              style={{ color: "var(--text-h)" }}
            >
              {commercial.prenom} {commercial.nom}
            </span>
          </div>
        ) : (
          <span
            className="text-xs"
            style={{ color: "var(--text)" }}
          >
            Non attribué
          </span>
        )}
      </td>

      <td className="px-3 py-3.5">
        <CallStatus status={call.statut} />
      </td>

      <td className="px-3 py-3.5">
        <div className="flex items-center justify-end gap-1.5">
          {call.statut === "programme" &&
            canStartCall(call.debut) && (
              <button
                type="button"
                className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-white transition"
                style={{
                  backgroundColor: "var(--success)",
                }}
                onClick={() =>
                  console.log("Passer l'appel", call.id)
                }
              >
                <Phone size={13} />
                Passer
              </button>
            )}

          <button
            type="button"
            onClick={onView}
            className="flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-gray-100"
            style={{ color: "var(--text)" }}
            title="Voir les détails"
          >
            <Eye size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}

function MobileCallCard({
  call,
  client,
  commercial,
  selected,
  onToggle,
  onView,
}) {
  return (
    <div
      className="rounded-xl border bg-white p-4"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={selected}
          onChange={onToggle}
          className="mt-1 h-4 w-4"
        />

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p
                className="truncate text-sm font-semibold"
                style={{ color: "var(--text-h)" }}
              >
                {call.titre}
              </p>

              <p
                className="mt-1 text-xs"
                style={{ color: "var(--text)" }}
              >
                {client
                  ? `${client.prenom} ${client.nom}`
                  : "Client inconnu"}
              </p>
            </div>

            <CallStatus status={call.statut} />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <InfoItem
              icon={CalendarDays}
              value={formatDate(call.date)}
            />

            <InfoItem
              icon={Clock3}
              value={call.heure}
            />

            <InfoItem
              icon={UserRound}
              value={
                commercial
                  ? `${commercial.prenom} ${commercial.nom}`
                  : "Non attribué"
              }
            />

            <InfoItem
              icon={PhoneCall}
              value={`${call.duree} min`}
            />
          </div>

          <div className="mt-4 flex justify-end gap-2">
            {call.statut === "programme" &&
              canStartCall(call.debut) && (
                <button
                  type="button"
                  onClick={() =>
                    console.log("Passer l'appel", call.id)
                  }
                  className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-white"
                  style={{
                    backgroundColor: "var(--success)",
                  }}
                >
                  <Phone size={13} />
                  Passer l'appel
                </button>
              )}

            <button
              type="button"
              onClick={onView}
              className="flex items-center gap-1.5 rounded-lg border bg-white px-3 py-2 text-xs font-medium"
              style={{
                borderColor: "var(--border)",
                color: "var(--text-h)",
              }}
            >
              <Eye size={13} />
              Détails
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterButton({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-lg px-3.5 py-2 text-xs font-medium transition"
      style={{
        color: active
          ? "var(--primary)"
          : "var(--text)",
        backgroundColor: active
          ? "var(--primary-light)"
          : "var(--surface)",
      }}
    >
      {children}
    </button>
  );
}

function CallStatus({ status }) {
  const config = {
    programme: {
      label: "Programmé",
      color: "var(--primary)",
      bg: "var(--primary-light)",
    },
    en_cours: {
      label: "En cours",
      color: "var(--warning)",
      bg: "var(--warning-light)",
    },
    termine: {
      label: "Terminé",
      color: "var(--success)",
      bg: "var(--success-light)",
    },
    annule: {
      label: "Annulé",
      color: "var(--danger)",
      bg: "var(--danger-light)",
    },
  };

  const current = config[status] || {
    label: status,
    color: "var(--text)",
    bg: "var(--surface)",
  };

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[10px] font-medium"
      style={{
        color: current.color,
        backgroundColor: current.bg,
      }}
    >
      <CheckCircle2 size={11} />
      {current.label}
    </span>
  );
}

function Avatar({ name }) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((item) => item[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold"
      style={{
        color: "var(--primary)",
        backgroundColor: "var(--primary-light)",
      }}
    >
      {initials || "?"}
    </div>
  );
}

function InfoItem({ icon: Icon, value }) {
  return (
    <div className="flex min-w-0 items-center gap-2">
      <Icon
        size={13}
        className="shrink-0"
        style={{ color: "var(--primary)" }}
      />

      <span
        className="truncate text-xs"
        style={{ color: "var(--text)" }}
      >
        {value}
      </span>
    </div>
  );
}

function canStartCall(startDate) {
  const now = Date.now();
  const start = new Date(startDate).getTime();

  const differenceMinutes = (now - start) / 60000;

  return (
    differenceMinutes >= -10 &&
    differenceMinutes <= 10
  );
}

function formatDate(value) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export default ProjectCalls;