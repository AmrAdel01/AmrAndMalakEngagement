// ============================================================================
// eventData.js - central content for the engagement website
// ============================================================================

export const eventData = {
  couple: {
    groom: "Amr",
    bride: "Malak",
    combinedNames: "Amr & Malak",
  },

  event: {
    title: "Our Engagement",
    isoDateTime: "2026-08-22T18:00:00+02:00",
    displayDate: "22 August 2026",
    dateMark: "22 • 08 • 2026",
    venue: "G Island",
    location: "Maadi Corniche, Cairo, Egypt",
    address: "G Island, Maadi Corniche, Cairo, Egypt",
    mapsUrl: "https://maps.app.goo.gl/VX7pDkmttZymybXo8?g_st=ic",
    coordinates: { lat: 29.9603, lng: 31.2569 },
  },

  hero: {
    eyebrow: "Our Forever Begins Here",
    subtitle: "A beautiful beginning to our forever.",
    scrollHint: "Scroll to begin",
  },

  intro: {
    enabled: true,
    message: "With love, we invite you to celebrate the beginning of our forever.",
  },

  quote: {
    arabic:
      "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنْفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
    reference: "سورة الروم — ٢١",
  },

  countdown: {
    heading: "Counting Down to Forever",
    completedMessage: "Today is the beginning of our forever.",
  },

  eventDetails: {
    heading: "Event Details",
    label: "Engagement",
  },

  location: {
    heading: "Join Us",
    directionsLabel: "Get Directions",
    useEmbeddedMap: false,
    embedApiKey: "",
  },

  messages: {
    heading: "Words for Us",
    subheading: "If you'd like to share a wish, a memory, or a little note  " + "\n we'd love to read it.",
    namePlaceholder: "Your name",
    messagePlaceholder: "Write your message here...",
    submitLabel: "Send with Love",
    successMessage: "Thank you — your words mean the world to us.",
    formspreeId: "xwkegpyj",
  },

  images: {
    ogCover: "/images/og-cover.jpg",
  },

  social: {
    whatsappShareText: "You're invited to celebrate our engagement — 22 August 2026 💛",
  },

  navigation: [
    { id: "home", label: "Home" },
    { id: "event", label: "Event" },
    { id: "location", label: "Location" },
    { id: "messages", label: "Messages" },
  ],
};

export default eventData;
