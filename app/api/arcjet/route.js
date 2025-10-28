import arcjet, { detectBot, shield } from "@arcjet/next";

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE", "GO_HTTP"],
    }),
  ],
});

export async function GET(request) {
  // Run Arcjet protection here
  const res = await aj.protect(request);
  if (!res.ok) {
    return new Response("Request blocked by Arcjet", { status: 403 });
  }

  return new Response("Arcjet passed", { status: 200 });
}
