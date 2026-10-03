import { createHmac, randomUUID } from "crypto";
import type { LeadInput } from "./lead-schema";

const services: Record<string,string> = {permanent_wonen:"Tiny house permanent wonen",recreatie:"Tiny house recreatie",tijdelijke_woning:"Tiny house kopen",mantelzorg:"Tiny house laten bouwen",gastenverblijf:"Tiny house laten bouwen",verhuur:"Tiny house kopen",anders:"Tiny house kopen"};
export function leadPayload(input:LeadInput, externalLeadId=randomUUID()){
  const createdAt=new Date().toISOString();
  return {sourceWebsite:"https://tinyhousekopennederland.nl",externalLeadId,category:"Tiny Houses",service:services[input.usage]??"Tiny house kopen",customerName:`${input.firstName} ${input.lastName}`,email:input.email,phone:input.phone,postcode:input.postcode.replace(/\s/g,"").replace(/^(\d{4})([A-Z]{2})$/i,"$1 $2").toUpperCase(),city:input.city,region:input.region,description:`Aanvraag tiny house. Gebruik: ${input.usage}; type: ${input.houseType}; grootte: ${input.size}; budget: ${input.budget}; termijn: ${input.purchaseTimeline}; grond: ${input.landStatus}.${input.additionalWishes?` Wensen: ${input.additionalWishes}`:""}`,createdAt,maxBuyersPerLead:1,consent:{accepted:true,capturedAt:createdAt,version:input.consentVersion,source:"tinyhousekopennederland.nl",marketingAllowed:false,metadata:{privacyPolicyVersion:input.consentVersion,...input.attribution}},metadata:{usage:input.usage,houseType:input.houseType,size:input.size,budget:input.budget,purchaseTimeline:input.purchaseTimeline,landStatus:input.landStatus,additionalWishes:input.additionalWishes,...input.attribution}};
}
export async function sendToLinkConnect(payload:ReturnType<typeof leadPayload>){
  const url=process.env.LINKCONNECT_API_URL,key=process.env.LINKCONNECT_API_KEY,secret=process.env.LINKCONNECT_HMAC_SECRET;
  if(!url||!key||!secret)throw new Error("Lead service is not configured");
  const raw=JSON.stringify(payload),timestamp=Date.now().toString();
  const headers={"content-type":"application/json","x-api-key":key,"x-request-id":payload.externalLeadId,"idempotency-key":payload.externalLeadId,"x-linkconnect-timestamp":timestamp,"x-linkconnect-signature":createHmac("sha256",secret).update(`${timestamp}.${raw}`).digest("hex")};
  const response=await fetch(url,{method:"POST",headers,body:raw,signal:AbortSignal.timeout(8000)});
  if(!response.ok)throw new Error(`LinkConnect rejected lead (${response.status})`);
  return response.json() as Promise<{leadId:string;duplicate:boolean}>;
}
