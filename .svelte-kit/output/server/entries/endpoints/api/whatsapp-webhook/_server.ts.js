const prerender = false;
const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || "berryboyzz_webhook_verify_token_2026";
const GET = async ({ url }) => {
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");
  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return new Response(challenge || "", {
      status: 200,
      headers: { "Content-Type": "text/plain" }
    });
  }
  return new Response("Forbidden: Verification token mismatch", { status: 403 });
};
const POST = async ({ request }) => {
  try {
    const payload = await request.json();
    return new Response(JSON.stringify({ status: "EVENT_RECEIVED" }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ status: "EVENT_RECEIVED" }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }
};
export {
  GET,
  POST,
  prerender
};
