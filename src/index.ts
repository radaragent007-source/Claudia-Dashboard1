export default {
  async fetch(): Promise<Response> {
    return new Response(
      "Claudia Dashboard läuft ✅",
      { headers: { "content-type": "text/plain" } }
    );
  },
};
