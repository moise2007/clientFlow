import { useMemo, useState } from "react";
import {
  Building2,
  Check,
  Eye,
  Mail,
  Phone,
  Search,
  Trash2,
  UserRound,
} from "lucide-react";

import ConfirmDialog from "../dialog/ConfirmDialog";
import ClientDetailsDialog from "../dialog/ClientDetailsDialog";

function ProjectClients({
  clients = [],
  calls = [],
  commercials = [],
  onDelete,
}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("tous");

  const [selectedIds, setSelectedIds] = useState([]);

  const [selectedClient, setSelectedClient] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const [deleteDialog, setDeleteDialog] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);

  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const fullName =
        `${client.prenom} ${client.nom}`.toLowerCase();

      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        fullName.includes(searchValue) ||
        client.email?.toLowerCase().includes(searchValue) ||
        client.telephone?.includes(searchValue) ||
        client.entreprise?.toLowerCase().includes(searchValue);

      const matchesStatus =
        filter === "tous" || client.statut === filter;

      return matchesSearch && matchesStatus;
    });
  }, [clients, search, filter]);

  const allFilteredSelected =
    filteredClients.length > 0 &&
    filteredClients.every((client) =>
      selectedIds.includes(client.id)
    );

  function toggleClient(clientId) {
    setSelectedIds((current) => {
      if (current.includes(clientId)) {
        return current.filter((id) => id !== clientId);
      }

      return [...current, clientId];
    });
  }

  function toggleAll() {
    if (allFilteredSelected) {
      setSelectedIds((current) =>
        current.filter(
          (id) =>
            !filteredClients.some(
              (client) => client.id === id
            )
        )
      );

      return;
    }

    setSelectedIds((current) => {
      const ids = new Set(current);

      filteredClients.forEach((client) => {
        ids.add(client.id);
      });

      return [...ids];
    });
  }

  function clearSelection() {
    setSelectedIds([]);
  }

  function openClientDetails(client) {
    const clientCalls = calls
      .filter((call) => call.clientId === client.id)
      .map((call) => {
        const commercial = commercials.find(
          (item) => item.id === call.commercialId
        );

        return {
          ...call,
          commercial: commercial
            ? {
                id: commercial.id,
                prenom: commercial.prenom,
                nom: commercial.nom,
              }
            : null,
        };
      });

    setSelectedClient({
      ...client,
      appels: clientCalls,
    });

    setDetailsOpen(true);
  }

  function openDeleteDialog(client) {
    setClientToDelete(client);
    setDeleteDialog(true);
  }

  function handleDelete() {
    if (!clientToDelete) return;

    onDelete(clientToDelete.id);

    setSelectedIds((current) =>
      current.filter((id) => id !== clientToDelete.id)
    );

    setClientToDelete(null);
    setDeleteDialog(false);

    if (selectedClient?.id === clientToDelete.id) {
      setSelectedClient(null);
      setDetailsOpen(false);
    }
  }

  function handleDeleteSelected() {
    if (selectedIds.length === 0) return;

    selectedIds.forEach((id) => {
      onDelete(id);
    });

    setSelectedIds([]);
  }

  return (
    <div className="space-y-5">
      {/* Recherche + filtres */}
      <div
        className="rounded-xl border bg-white p-3"
        style={{
          borderColor: "var(--border)",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-sm">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: "var(--text)" }}
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Rechercher un client..."
              className="w-full rounded-lg border bg-white py-2.5 pl-10 pr-3 text-sm outline-none transition focus:ring-2"
              style={{
                borderColor: "var(--border)",
                color: "var(--text-h)",
                "--tw-ring-color": "var(--primary-light)",
              }}
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            <FilterButton
              active={filter === "tous"}
              onClick={() => setFilter("tous")}
            >
              Tous
            </FilterButton>

            <FilterButton
              active={filter === "prospect"}
              onClick={() => setFilter("prospect")}
            >
              Prospects
            </FilterButton>

            <FilterButton
              active={filter === "qualifie"}
              onClick={() => setFilter("qualifie")}
            >
              Qualifiés
            </FilterButton>

            <FilterButton
              active={filter === "en_negociation"}
              onClick={() => setFilter("en_negociation")}
            >
              Négociation
            </FilterButton>

            <FilterButton
              active={filter === "converti"}
              onClick={() => setFilter("converti")}
            >
              Convertis
            </FilterButton>

            <FilterButton
              active={filter === "perdu"}
              onClick={() => setFilter("perdu")}
            >
              Perdus
            </FilterButton>
          </div>
        </div>

        {/* Sélection */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleAll}
              className="flex items-center gap-2 text-[12px] font-medium"
              style={{ color: "var(--primary)" }}
            >
              <SelectionBox
                selected={allFilteredSelected}
              />

              {allFilteredSelected
                ? "Tout désélectionner"
                : "Tout sélectionner"}
            </button>

            <span
              className="text-[12px]"
              style={{ color: "var(--text)" }}
            >
              {filteredClients.length} client
              {filteredClients.length > 1 ? "s" : ""}
            </span>
          </div>

          {selectedIds.length > 0 && (
            <div className="flex items-center gap-3">
              <span
                className="text-[12px] font-medium"
                style={{ color: "var(--primary)" }}
              >
                {selectedIds.length} sélectionné
                {selectedIds.length > 1 ? "s" : ""}
              </span>

              <button
                type="button"
                onClick={clearSelection}
                className="text-[12px] font-medium"
                style={{ color: "var(--text)" }}
              >
                Annuler
              </button>

              <button
                type="button"
                onClick={handleDeleteSelected}
                className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-[12px] font-medium"
                style={{
                  color: "var(--danger)",
                  backgroundColor: "var(--danger-light)",
                }}
              >
                <Trash2 size={14} />
                Supprimer
              </button>
            </div>
          )}

          {search && selectedIds.length === 0 && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="text-[12px] font-medium"
              style={{ color: "var(--primary)" }}
            >
              Effacer la recherche
            </button>
          )}
        </div>
      </div>

      {/* Liste */}
      {filteredClients.length > 0 ? (
        <div
          className="overflow-hidden rounded-xl border"
          style={{
            borderColor: "var(--border)",
          }}
        >
          {filteredClients.map((client, index) => {
            const clientCalls = calls.filter(
              (call) => call.clientId === client.id
            );

            return (
              <ClientListItem
                key={client.id}
                client={client}
                callsCount={clientCalls.length}
                selected={selectedIds.includes(client.id)}
                onSelect={() => toggleClient(client.id)}
                onView={() => openClientDetails(client)}
                onDelete={() => openDeleteDialog(client)}
                isLast={index === filteredClients.length - 1}
              />
            );
          })}
        </div>
      ) : (
        <EmptyClients search={search} />
      )}

      <ClientDetailsDialog
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        client={selectedClient}
        onDelete={onDelete}
      />

      <ConfirmDialog
        open={deleteDialog}
        onClose={() => {
          setDeleteDialog(false);
          setClientToDelete(null);
        }}
        onConfirm={handleDelete}
        title="Supprimer le client"
        description={
          clientToDelete
            ? `Voulez-vous vraiment supprimer ${clientToDelete.prenom} ${clientToDelete.nom} de ce projet ?`
            : ""
        }
        confirmText="Supprimer"
      />
    </div>
  );
}

function ClientListItem({
  client,
  callsCount,
  selected,
  onSelect,
  onView,
  onDelete,
  isLast,
}) {
  return (
    <article
      className={`relative overflow-hidden ${
        !isLast ? "border-b" : ""
      }`}
      style={{
        borderColor: "var(--border)",
        backgroundColor: selected
          ? "#edf5ff"
          : "#f5f9ff",
      }}
    >
      {/* Bordure gauche */}
      <div
        className="absolute left-0 top-0 h-full w-1"
        style={{
          backgroundColor: getStatusColor(client.statut),
        }}
      />

      <div className="flex min-w-0 items-center gap-3 p-3 sm:gap-4 sm:px-4">
        {/* Sélection */}
        <button
          type="button"
          onClick={onSelect}
          className="shrink-0"
        >
          <SelectionBox selected={selected} />
        </button>

        {/* Avatar */}
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
          style={{
            color: "var(--primary)",
            backgroundColor: "var(--primary-light)",
          }}
        >
          <UserRound size={18} />
        </div>

        {/* Nom + entreprise */}
        <div className="min-w-[150px] flex-1">
          <div className="flex items-center gap-2">
            <h3
              className="truncate text-[14px] font-semibold"
              style={{ color: "var(--text-h)" }}
            >
              {client.prenom} {client.nom}
            </h3>

            <ClientStatus status={client.statut} />
          </div>

          <p
            className="mt-0.5 truncate text-[12px]"
            style={{ color: "var(--text)" }}
          >
            {client.entreprise ||
              "Entreprise non renseignée"}
          </p>
        </div>

        {/* Email */}
        <div className="hidden min-w-0 flex-1 items-center gap-2 lg:flex">
          <Mail
            size={14}
            className="shrink-0"
            style={{ color: "var(--primary)" }}
          />

          <span
            className="truncate text-[12px]"
            style={{ color: "var(--text)" }}
          >
            {client.email || "—"}
          </span>
        </div>

        {/* Téléphone */}
        <div className="hidden min-w-[130px] items-center gap-2 xl:flex">
          <Phone
            size={14}
            className="shrink-0"
            style={{ color: "var(--primary)" }}
          />

          <span
            className="text-[12px]"
            style={{ color: "var(--text)" }}
          >
            {client.telephone || "—"}
          </span>
        </div>

        {/* Coût */}
        <div className="hidden min-w-[120px] 2xl:block">
          <p
            className="text-[10px]"
            style={{ color: "var(--text)" }}
          >
            Coût client
          </p>

          <p
            className="mt-0.5 text-[12px] font-semibold"
            style={{ color: "var(--text-h)" }}
          >
            {formatMoney(client.coutClient)}
          </p>
        </div>

        {/* Appels */}
        <div className="hidden min-w-[70px] text-center sm:block">
          <p
            className="text-[10px]"
            style={{ color: "var(--text)" }}
          >
            Appels
          </p>

          <p
            className="mt-0.5 text-[12px] font-semibold"
            style={{ color: "var(--text-h)" }}
          >
            {callsCount}
          </p>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-1.5">
          <button
            type="button"
            onClick={onView}
            className="flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-[11px] font-medium transition hover:opacity-90"
            style={{
              color: "var(--primary)",
              backgroundColor: "var(--primary-light)",
            }}
          >
            <Eye size={14} />
            <span>Voir</span>
          </button>

          <button
            type="button"
            onClick={onDelete}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition hover:opacity-90"
            style={{
              color: "var(--danger)",
              backgroundColor: "var(--danger-light)",
            }}
            title="Supprimer"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </article>
  );
}

function SelectionBox({ selected }) {
  return (
    <span
      className="flex h-4 w-4 items-center justify-center rounded border transition"
      style={{
        borderColor: selected
          ? "var(--primary)"
          : "#cbd5e1",
        backgroundColor: selected
          ? "var(--primary)"
          : "white",
      }}
    >
      {selected && (
        <Check
          size={11}
          strokeWidth={3}
          color="white"
        />
      )}
    </span>
  );
}

function ClientStatus({ status }) {
  const config = {
    prospect: {
      label: "Prospect",
      color: "var(--text)",
      bg: "rgba(107,114,128,0.08)",
    },
    qualifie: {
      label: "Qualifié",
      color: "var(--primary)",
      bg: "rgba(37,99,235,0.08)",
    },
    en_negociation: {
      label: "Négociation",
      color: "var(--accent)",
      bg: "rgba(249,115,22,0.08)",
    },
    converti: {
      label: "Converti",
      color: "var(--success)",
      bg: "rgba(22,163,74,0.08)",
    },
    perdu: {
      label: "Perdu",
      color: "var(--danger)",
      bg: "rgba(220,38,38,0.08)",
    },
  };

  const current = config[status] || config.prospect;

  return (
    <span
      className="shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold"
      style={{
        color: current.color,
        backgroundColor: current.bg,
      }}
    >
      {current.label}
    </span>
  );
}

function FilterButton({
  active,
  children,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-lg px-3 py-2 text-[12px] font-medium transition"
      style={{
        color: active
          ? "var(--primary)"
          : "var(--text)",
        backgroundColor: active
          ? "var(--primary-light)"
          : "transparent",
        border: active
          ? "1px solid transparent"
          : "1px solid var(--border)",
      }}
    >
      {children}
    </button>
  );
}

function EmptyClients({ search }) {
  return (
    <div
      className="rounded-xl border bg-white py-12 text-center"
      style={{ borderColor: "var(--border)" }}
    >
      <div
        className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl"
        style={{
          color: "var(--primary)",
          backgroundColor: "var(--primary-light)",
        }}
      >
        <UserRound size={22} />
      </div>

      <p
        className="mt-3 text-[14px] font-semibold"
        style={{ color: "var(--text-h)" }}
      >
        Aucun client trouvé
      </p>

      <p
        className="mx-auto mt-1 max-w-xs text-[12px]"
        style={{ color: "var(--text)" }}
      >
        {search
          ? "Aucun client ne correspond à votre recherche."
          : "Aucun client n'est encore associé à ce projet."}
      </p>
    </div>
  );
}

function getStatusColor(status) {
  const colors = {
    prospect: "var(--text)",
    qualifie: "var(--primary)",
    en_negociation: "var(--accent)",
    converti: "var(--success)",
    perdu: "var(--danger)",
  };

  return colors[status] || colors.prospect;
}

function formatMoney(value = 0) {
  return `${new Intl.NumberFormat("fr-FR").format(value)} FCFA`;
}

export default ProjectClients;