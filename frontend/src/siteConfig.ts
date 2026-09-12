// Edit the values below to match your real business details.
// Everything on the site that mentions phone/address/hours/WhatsApp reads from here.

export const siteConfig = {
  businessName: "Image Marketing Agencies",
  tagline: "Premium Kitchen & Home Appliances",

  // Shown in the top bar, contact section and showroom details.
  phones: [
    { display: "+91 98494 23555", link: "+919849423555" },
    { display: "+91 98661 56677", link: "+919866156677" },
  ],

  // WhatsApp number in international format WITHOUT + or spaces, e.g. "919876543210"
  whatsappNumber: "919849423555",
  whatsappDefaultMessage: "Hi! I'd like to know more about your appliances.",

  email: "image_ima@yahoo.com",

  // All three showroom locations. `lat`/`lng` pin the exact spot on the embedded map
  // (verified against official brand dealer listings for this business) — edit them
  // if a location ever moves.
  locations: [
    {
      label: "Head Office",
      lines: [
        "H.O.# 40-27-6/5, Opp: Lalitha Jewellery",
        "Polyclinic Road, Near Benz Circle, Vijayawada - 520010",
      ],
      lat: 16.50256364,
      lng: 80.65250594,
    },
    {
      label: "Branch Office — MG Road",
      lines: [
        "Beside Manorama Hotel, Vasu Complex, 1st Floor",
        "# 27-44-8/2A, MG Road, Vijayawada - 520002",
      ],
      lat: 16.5113147,
      lng: 80.6205253,
    },
    {
      label: "Branch Office — Eluru Road",
      lines: [
        "# 29-37-87, Near Vijaya Talkies Center",
        "Eluru Road, Vijayawada - 520002",
      ],
      lat: 16.515201,
      lng: 80.636635,
    },
  ],

  hours: "Mon – Sat: 10:00 AM – 9:00 PM, Sunday: 11:00 AM – 8:00 PM",

  socials: {
    instagram: "",
    facebook: "",
  },
};
