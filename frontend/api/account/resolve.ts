// Vercel serverless function — POST /api/account/resolve
// Resolves a Nigerian bank account number to the holder's name via Flutterwave.

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const flwKey = process.env.Flutter;

  if (!flwKey) {
    return res.status(503).json({
      error: "Account lookup is not configured. Add your Flutterwave key in Vercel environment variables.",
    });
  }

  const { account_number, account_bank } = req.body ?? {};

  if (!account_number || !account_bank) {
    return res.status(400).json({ error: "account_number and account_bank are required" });
  }

  if (!/^\d{10}$/.test(account_number)) {
    return res.status(400).json({ error: "account_number must be exactly 10 digits" });
  }

  try {
    const resp = await fetch("https://api.flutterwave.com/v3/accounts/resolve", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${flwKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ account_number, account_bank }),
    });

    const data = (await resp.json()) as {
      status: string;
      message: string;
      data?: { account_name: string; account_number: string };
    };

    if (data.status === "error" || !data.data) {
      return res.status(400).json({ error: data.message || "Could not resolve account" });
    }

    return res.status(200).json({
      account_name: data.data.account_name,
      account_number: data.data.account_number,
    });
  } catch {
    return res.status(500).json({ error: "Failed to resolve account. Please try again." });
  }
}
