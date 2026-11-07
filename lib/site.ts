// Contact details pulled from the previous dialpilotai.com site (phone/WhatsApp)
// and the DialPilot Cal.com account (email, booking link).
export const site = {
  name: "DialPilot AI",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://dialpilotai.com",
  phoneDisplay: "+1 515 800 7975",
  phoneHref: "tel:+15158007975",
  whatsappNumber: "15158007975",
  email: "dialpilotai@gmail.com",
  calUrl: "https://cal.com/dialpilot/15min",
};

export function whatsappLink(text: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export const WA_DEFAULT = "Hi DialPilot AI, I'd like an AI receptionist for my salon.";
export const WA_PILOT = "Hi DialPilot AI, I'd like to start the free 2-week AI receptionist pilot for my salon.";
