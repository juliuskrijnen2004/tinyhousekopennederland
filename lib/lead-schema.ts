import { z } from "zod";

const answer = z.string().trim().min(1).max(120);
export const regions = ["Drenthe", "Flevoland", "Friesland", "Gelderland", "Groningen", "Limburg", "Noord-Brabant", "Noord-Holland", "Overijssel", "Utrecht", "Zeeland", "Zuid-Holland"] as const;
export const leadSchema = z.object({
  usage: answer, houseType: answer, size: answer, budget: answer,
  purchaseTimeline: answer, landStatus: answer,
  postcode: z.string().trim().regex(/^\d{4}\s?[A-Za-z]{2}$/, "Vul een geldige postcode in"),
  city: z.string().trim().min(2).max(120), region: z.enum(regions),
  additionalWishes: z.string().trim().max(2000).default(""),
  firstName: z.string().trim().min(2).max(100), lastName: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(320),
  phone: z.string().trim().regex(/^[+()\d\s-]{8,20}$/, "Vul een geldig telefoonnummer in"),
  consent: z.literal(true), consentVersion: z.literal("2026-10-03-v1"),
  attribution: z.object({landingPage:z.string().max(500),referrer:z.string().max(500),utm_source:z.string().max(200).optional(),utm_medium:z.string().max(200).optional(),utm_campaign:z.string().max(200).optional(),utm_term:z.string().max(200).optional(),utm_content:z.string().max(200).optional()}),
  website: z.string().max(0).optional(),
});
export type LeadInput = z.infer<typeof leadSchema>;
