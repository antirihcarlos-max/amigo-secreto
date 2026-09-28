import { findParticipant, emptyResponse } from "../../_lib/participants.js";

function jsonResponse(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" }
  });
}

// GET /api/response/:id
// Devuelve los datos del participante + su respuesta actual (o vacía si no ha respondido).
export async function onRequestGet({ params, env }) {
  const id = params.id;
  const participant = findParticipant(id);
  if (!participant) return jsonResponse({ error: "participant_not_found" }, 404);

  const raw = await env.AMIGOS_KV.get(`response:${id}`);
  const response = raw ? JSON.parse(raw) : emptyResponse();

  return jsonResponse({ participant, response });
}

// POST /api/response/:id
// Body JSON: { endulzadas: [string,string,string], regalo: [string,string,string], observaciones: string }
// Guarda (crea o actualiza) la respuesta de ese participante en Cloudflare KV.
export async function onRequestPost({ params, request, env }) {
  const id = params.id;
  const participant = findParticipant(id);
  if (!participant) return jsonResponse({ error: "participant_not_found" }, 404);

  let body;
  try {
    body = await request.json();
  } catch (e) {
    return jsonResponse({ error: "invalid_json" }, 400);
  }

  const clean3 = (arr) =>
    Array.isArray(arr)
      ? [0, 1, 2].map((i) => String(arr[i] || "").trim().slice(0, 200))
      : ["", "", ""];

  const endulzadas = clean3(body.endulzadas);
  const regalo = clean3(body.regalo);
  const observaciones = String(body.observaciones || "").trim().slice(0, 500);
  const completed = endulzadas.every((v) => v) && regalo.every((v) => v);

  const record = {
    endulzadas,
    regalo,
    observaciones,
    completed,
    updatedAt: new Date().toISOString()
  };

  await env.AMIGOS_KV.put(`response:${id}`, JSON.stringify(record));

  return jsonResponse({ ok: true, response: record });
}
