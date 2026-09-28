// Directorio fijo de participantes. Solo datos de contacto (no sensibles).
// Las respuestas (endulzadas, regalo, observaciones) se guardan aparte en KV.
export const PARTICIPANTS = [
  { id: 1,  name: "Juan Carlos Gómez",              phone: "3193285607", email: "juancarlosgomezlondono@gmail.com" },
  { id: 2,  name: "Marcela Urdinola Bedoya",         phone: "3203492302", email: "c.urdinola@uniandes.edu.co" },
  { id: 3,  name: "Nancy Patricia Córdoba",          phone: "3173650343", email: "npcordoba@porvenir.com.co" },
  { id: 4,  name: "Jorge Enrique Herrera",           phone: "3176682691", email: "jorgeherreramesa@gmail.com" },
  { id: 5,  name: "Edith Lucia Fuentes López",       phone: "3160813781", email: "edithfu82@gmail.com" },
  { id: 6,  name: "Rosanna Paola Mancilla Tapias",   phone: "3125901187", email: "rosanna.mancilla@gmail.com" },
  { id: 7,  name: "Steve Fernando Mendoza Mollano",  phone: "3112627561", email: "stevefmm@gmail.com" },
  { id: 8,  name: "Moises Martínez",                 phone: "3507846949", email: "ing.moisesmartinezmenco@gmail.com" },
  { id: 9,  name: "Dayan Mahecha Vega",               phone: "3112107809", email: "dayanmahechavega@gmail.com" },
  { id: 10, name: "Jhon Alexander Toro Carvajal",    phone: "3006748999", email: "jhontoro9@outlook.es" },
  { id: 11, name: "Efrain Rafael Siado",             phone: "3216524905", email: "siadoefrain@gmail.com" },
  { id: 12, name: "Sergio Ricardo Pulido",           phone: "3057365374", email: "s_pulido@yahoo.com" },
  { id: 13, name: "Mariana Cano Restrepo",           phone: "3014902473", email: "ycanorestrepo@gmail.com" },
  { id: 14, name: "Richard Toro Carvajal",           phone: "3003993722", email: "richard_toro@hotmail.com" },
  { id: 15, name: "Hernan Dario De Lavalle Pérez",   phone: "3103214156", email: "delavalleperez@gmail.com" },
  { id: 16, name: "Yuky Katherine Piracón",          phone: "3133654718", email: "katherine.piracon@gmail.com" }
];

export function findParticipant(id) {
  return PARTICIPANTS.find(p => String(p.id) === String(id));
}

export function emptyResponse() {
  return { endulzadas: ["", "", ""], regalo: ["", "", ""], observaciones: "", completed: false, updatedAt: null };
}
