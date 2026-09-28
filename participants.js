import { PARTICIPANTS } from "../_lib/participants.js";

// GET /api/participants
// Devuelve el directorio completo + estado (completo/pendiente) de cada participante.
// No expone las respuestas (endulzadas/regalo) de nadie, solo si ya respondió o no.
export async function onRequestGet({ env }) {
  const results = await Promise.all(
    PARTICIPANTS.map(async (p) => {
      const raw = await env.AMIGOS_KV.get(`response:${p.id}`);
      const r = raw ? JSON.parse(raw) : null;
      return {
        id: p.id,
        name: p.name,
        phone: p.phone,
        email: p.email,
        completed: r ? !!r.completed : false,
        updatedAt: r ? r.updatedAt : null
      };
    })
  );

  return new Response(JSON.stringify({ participants: results }), {
    headers: { "Content-Type": "application/json; charset=utf-8" }
  });
}
