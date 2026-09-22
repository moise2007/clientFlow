const calls = [
  {
    id: "call_1",
    projectId: "project_1",
    clientId: "client_1",
    titre: "Appel découverte",
    date: "2026-09-22",
    heure: "09:30",
    debut: "2026-09-22T09:30:00",
    duree: 30,
    statut: "termine",
    commercialId: "commercial_1",
    rapport:
      "Le client souhaite recevoir une présentation détaillée de nos services.",
  },
  {
    id: "call_2",
    projectId: "project_1",
    clientId: "client_2",
    titre: "Présentation commerciale",
    date: "2026-09-22",
    heure: "11:00",
    debut: "2026-09-22T11:00:00",
    duree: 45,
    statut: "programme",
    commercialId: "commercial_2",
    rapport: null,
  },
  {
    id: "call_3",
    projectId: "project_1",
    clientId: "client_3",
    titre: "Suivi prospect",
    date: "2026-09-23",
    heure: "14:00",
    debut: "2026-09-23T14:00:00",
    duree: 20,
    statut: "programme",
    commercialId: "commercial_1",
    rapport: null,
  },
  {
    id: "call_4",
    projectId: "project_1",
    clientId: "client_1",
    titre: "Relance commerciale",
    date: "2026-09-18",
    heure: "15:30",
    debut: "2026-09-18T15:30:00",
    duree: 20,
    statut: "annule",
    commercialId: "commercial_2",
    rapport: null,
  },
  {
    id: "call_5",
    projectId: "project_1",
    clientId: "client_4",
    titre: "Appel de qualification",
    date: "2026-09-20",
    heure: "10:00",
    debut: "2026-09-20T10:00:00",
    duree: 30,
    statut: "termine",
    commercialId: "commercial_3",
    rapport:
      "Le prospect est qualifié et souhaite recevoir une proposition.",
  },
];

export function getProjectCalls(projectId) {
  return calls.filter((call) => call.projectId === projectId);
}

export function getCall(callId) {
  return calls.find((call) => call.id === callId) || null;
}