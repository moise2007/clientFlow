const projects = [
  {
    id: "project_1",
    nom: "Déploiement commercial",
    description:
      "Développement du portefeuille clients et suivi des prospects de l'entreprise.",
    statut: "en_cours",
    progression: 68,
    clients: 18,
    prixTotal: 3420000,
    prixMoyenClient: 190000,
    appelsMoyensClient: 4.1,
    dateCreation: "2026-08-15",
  },
  {
    id: "project_2",
    nom: "Prospection B2B",
    description:
      "Recherche et qualification de nouveaux clients professionnels.",
    statut: "en_cours",
    progression: 42,
    clients: 12,
    prixTotal: 1140000,
    prixMoyenClient: 95000,
    appelsMoyensClient: 3.8,
    dateCreation: "2026-09-01",
  },
];

export function getProject(projectId) {
  return projects.find((project) => project.id === projectId) || null;
}

export function getProjectStats(projectId) {
  const project = getProject(projectId);

  if (!project) return null;

  return {
    nombreClients: project.clients,
    prixTotal: project.prixTotal,
    prixMoyenClient: project.prixMoyenClient,
    appelsMoyensClient: project.appelsMoyensClient,
  };
}

export function getProjects() {
  return projects;
}