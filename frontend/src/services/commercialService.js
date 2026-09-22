const commercials = [
  {
    id: "commercial_1",
    prenom: "Paul",
    nom: "Mbarga",
    email: "paul.mbarga@entreprise.com",
    telephone: "+237 691 000 001",
    role: "commercial",
    actif: true,
    projectIds: ["project_1"],
  },
  {
    id: "commercial_2",
    prenom: "Sophie",
    nom: "Ngo",
    email: "sophie.ngo@entreprise.com",
    telephone: "+237 691 000 002",
    role: "commercial",
    actif: true,
    projectIds: ["project_1"],
  },
  {
    id: "commercial_3",
    prenom: "Michel",
    nom: "Fouda",
    email: "michel.fouda@entreprise.com",
    telephone: "+237 691 000 003",
    role: "commercial",
    actif: true,
    projectIds: ["project_1"],
  },
];

export function getProjectCommercials(projectId) {
  return commercials.filter((commercial) =>
    commercial.projectIds.includes(projectId)
  );
}

export function getCommercial(commercialId) {
  return (
    commercials.find((commercial) => commercial.id === commercialId) || null
  );
}

export function getCommercials() {
  return commercials;
}