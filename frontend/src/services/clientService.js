const clients = [
  {
    id: "client_1",
    prenom: "Jean",
    nom: "Dupont",
    email: "jean.dupont@gmail.com",
    telephone: "+237 690 000 001",
    entreprise: "ABC Cameroun",
    coutClient: 450000,
    statut: "converti",
    dateCreation: "2026-08-20",
    projectId: "project_1",
  },
  {
    id: "client_2",
    prenom: "Paul",
    nom: "Mbarga",
    email: "paul.mbarga@gmail.com",
    telephone: "+237 690 000 002",
    entreprise: "Mbarga Services",
    coutClient: 180000,
    statut: "en_negociation",
    dateCreation: "2026-09-02",
    projectId: "project_1",
  },
  {
    id: "client_3",
    prenom: "Marie",
    nom: "Nkomo",
    email: "marie.nkomo@gmail.com",
    telephone: "+237 690 000 003",
    entreprise: "Nkomo Distribution",
    coutClient: 95000,
    statut: "qualifie",
    dateCreation: "2026-09-05",
    projectId: "project_1",
  },
  {
    id: "client_4",
    prenom: "David",
    nom: "Fouda",
    email: "david.fouda@gmail.com",
    telephone: "+237 690 000 004",
    entreprise: "Fouda Consulting",
    coutClient: 120000,
    statut: "prospect",
    dateCreation: "2026-09-10",
    projectId: "project_1",
  },
];

export function getProjectClients(projectId) {
  return clients.filter((client) => client.projectId === projectId);
}

export function getClient(clientId) {
  return clients.find((client) => client.id === clientId) || null;
}