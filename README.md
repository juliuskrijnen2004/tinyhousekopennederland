# Tiny House Kopen Nederland

Zelfstandige Next.js leadgeneratiewebsite voor `tinyhousekopennederland.nl`. De browser verstuurt aanvragen uitsluitend naar de eigen route `/api/leads`; die valideert server-side en stuurt de lead met API-key en optioneel HMAC door naar de bestaande LinkConnect lead-ingest.

## Lokaal

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Vul echte geheimen alleen in `.env.local` of Vercel Environment Variables in. De productie-API-key en HMAC-secret mogen nooit met `NEXT_PUBLIC_` beginnen.

## Productieconfiguratie

- `LINKCONNECT_API_URL`, `LINKCONNECT_API_KEY`, `LINKCONNECT_HMAC_SECRET`: centrale lead-ingest.
- `KV_REST_API_URL`, `KV_REST_API_TOKEN`: gereserveerd voor een duurzame outbox en distributed rate limiting. De huidige in-memory limiter is alleen een basisbescherming en niet voldoende voor horizontaal geschaalde productie.
- `NEXT_PUBLIC_GTM_ID`: optionele GTM-container; activeer pas na een geldige consentmanager.
- Turnstile-variabelen zijn gereserveerd; verificatie moet worden geïmplementeerd vóór grootschalig advertentieverkeer.

## Belangrijke releaseblokkades

De LinkConnect-audit vond dat de centrale ingest nog ingest-scopes/source-status, verplichte consent-evidence, distributed rate limiting en een transactionele matching-outbox mist. De website mag niet als volledig productiegeschikt worden beschouwd tot deze centrale controles zijn opgelost en een echte testlead in de admin is geverifieerd.

De privacy-, cookie- en voorwaardenpagina's zijn gemarkeerde concepten en vereisen juridische review. Analytics blijft uit zolang geen consentmanager en identifiers zijn ingesteld.
