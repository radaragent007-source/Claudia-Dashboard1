export default {
  async fetch(): Promise<Response> {
    const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Claudia Dashboard</title>
  <style>
    body { font-family: Arial; padding: 20px; background: #0f172a; color: white; }
    #status { margin-top: 20px; padding: 10px; background: #1e293b; border-radius: 8px; }
  </style>
</head>
<body>
  <h1>🚀 OpenClaw Dashboard</h1>
  <div id="status">Connecting...</div>

  <script>
    const ws = new WebSocket("wss://praise-configuring-psychology-dist.trycloudflare.com");

    ws.onopen = () => {
      document.getElementById("status").innerText = "✅ Connected to OpenClaw";
    };

    ws.onmessage = (event) => {
      document.getElementById("status").innerText = "📡 " + event.data;
    };

    ws.onerror = () => {
      document.getElementById("status").innerText = "❌ Connection error";
    };
  </script>
</body>
</html>
`;
    return new Response(html, {
      headers: { "content-type": "text/html" },
    });
  },
};
