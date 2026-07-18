import { Router, type IRouter } from "express";

const router: IRouter = Router();

const FALLBACK_BANKS = [
  { id: 1, name: "Access Bank", code: "044" },
  { id: 2, name: "Citibank Nigeria", code: "023" },
  { id: 3, name: "Ecobank Nigeria", code: "050" },
  { id: 4, name: "Fidelity Bank", code: "070" },
  { id: 5, name: "First Bank of Nigeria", code: "011" },
  { id: 6, name: "First City Monument Bank", code: "214" },
  { id: 7, name: "Globus Bank", code: "00103" },
  { id: 8, name: "Guaranty Trust Bank", code: "058" },
  { id: 9, name: "Heritage Bank", code: "030" },
  { id: 10, name: "Jaiz Bank", code: "301" },
  { id: 11, name: "Keystone Bank", code: "082" },
  { id: 12, name: "Kuda Bank", code: "50211" },
  { id: 13, name: "Moniepoint MFB", code: "50515" },
  { id: 14, name: "OPay Digital Services", code: "100004" },
  { id: 15, name: "Palmpay", code: "100033" },
  { id: 16, name: "Parallex Bank", code: "526" },
  { id: 17, name: "Polaris Bank", code: "076" },
  { id: 18, name: "Premium Trust Bank", code: "105" },
  { id: 19, name: "Providus Bank", code: "101" },
  { id: 20, name: "SmartCash Payment Service Bank", code: "50800" },
  { id: 21, name: "Stanbic IBTC Bank", code: "221" },
  { id: 22, name: "Standard Chartered Bank", code: "068" },
  { id: 23, name: "Sterling Bank", code: "232" },
  { id: 24, name: "Titan Trust Bank", code: "102" },
  { id: 25, name: "Union Bank of Nigeria", code: "032" },
  { id: 26, name: "United Bank for Africa", code: "033" },
  { id: 27, name: "Unity Bank", code: "215" },
  { id: 28, name: "VFD Microfinance Bank", code: "566" },
  { id: 29, name: "Wema Bank", code: "035" },
  { id: 30, name: "Zenith Bank", code: "057" },
];

/**
 * GET /api/banks
 * Returns list of Nigerian banks from Flutterwave (or fallback list).
 */
router.get("/banks", async (req, res): Promise<void> => {
  const flwKey = process.env["Flutter"];

  if (!flwKey) {
    (req as any).log?.info("Flutter key not set — returning fallback bank list");
    res.json(FALLBACK_BANKS);
    return;
  }

  try {
    const resp = await fetch("https://api.flutterwave.com/v3/banks/NG", {
      headers: { Authorization: `Bearer ${flwKey}` },
    });

    if (!resp.ok) {
      res.json(FALLBACK_BANKS);
      return;
    }

    const data = (await resp.json()) as { data: { id: number; name: string; code: string }[] };
    res.json(data.data.map((b) => ({ id: b.id, name: b.name, code: b.code })));
  } catch {
    res.json(FALLBACK_BANKS);
  }
});

/**
 * POST /api/account/resolve
 * Resolves a Nigerian bank account number to the holder's name via Flutterwave.
 */
router.post("/account/resolve", async (req, res): Promise<void> => {
  const flwKey = process.env["Flutter"];

  if (!flwKey) {
    res.status(503).json({
      error: "Account lookup unavailable. Set the Flutter environment variable.",
    });
    return;
  }

  const { account_number, account_bank } = req.body as {
    account_number?: string;
    account_bank?: string;
  };

  if (!account_number || !account_bank) {
    res.status(400).json({ error: "account_number and account_bank are required" });
    return;
  }

  if (!/^\d{10}$/.test(account_number)) {
    res.status(400).json({ error: "account_number must be exactly 10 digits" });
    return;
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
      res.status(400).json({ error: data.message || "Could not resolve account" });
      return;
    }

    res.json({ account_name: data.data.account_name, account_number: data.data.account_number });
  } catch {
    res.status(500).json({ error: "Failed to resolve account. Please try again." });
  }
});

export default router;
