// Vercel serverless function — GET /api/banks
// Returns Nigerian bank list from Flutterwave, falls back to hardcoded list.

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

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const flwKey = process.env.Flutter;

  if (!flwKey) {
    return res.status(200).json(FALLBACK_BANKS);
  }

  try {
    const resp = await fetch("https://api.flutterwave.com/v3/banks/NG", {
      headers: { Authorization: `Bearer ${flwKey}` },
    });

    if (!resp.ok) {
      return res.status(200).json(FALLBACK_BANKS);
    }

    const data = (await resp.json()) as {
      data: { id: number; name: string; code: string }[];
    };

    return res
      .status(200)
      .json(data.data.map((b) => ({ id: b.id, name: b.name, code: b.code })));
  } catch {
    return res.status(200).json(FALLBACK_BANKS);
  }
}
