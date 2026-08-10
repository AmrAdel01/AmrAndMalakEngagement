// ============================================================================
// eventData.js — THE ONLY FILE YOU SHOULD NEED TO EDIT
// ============================================================================
// Every name, date, image, story beat, and link on the website is pulled from
// this file. Components never hardcode content — they only read from here.
// See "How to Customize Your Website" in README.md for a guided walkthrough.
// ============================================================================

export const eventData = {
  couple: {
    groom: "Amr",
    bride: "Malak",
    // Shown together as "Ahmed & Layla" in the nav / footer / share metadata
    combinedNames: "Amr & Malak",
  },

  event: {
    title: "Our Engagement",
    // ISO date used by the countdown — keep this format (YYYY-MM-DD) and add a time.
    isoDateTime: "2026-08-22T18:00:00+02:00",
    displayDate: "22 August 2026",
    // Shown in the hero as a stylised date mark
    dateMark: "22 • 08 • 2026",
    venue: "G Island",
    location: "Maadi Corniche, Cairo, Egypt",
    // Full address line for the location card
    address: "G Island, Maadi Corniche, Cairo, Egypt",
    // Replace with your real Google Maps share link (Google Maps → Share → Copy link)
    mapsUrl: "https://maps.app.goo.gl/VX7pDkmttZymybXo8?g_st=ic",
    // Coordinates used only if you switch on the embedded map iframe (optional)
    coordinates: { lat: 29.9603, lng: 31.2569 },
  },

  hero: {
    eyebrow: "Our Story Begins Here",
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
    /*translation:
      "\"And among His signs is this: He created for you mates from among yourselves, that you may dwell in tranquility with them, and He has put love and mercy between you.\"",
    translationReference: "Surah Ar-Rum — 21",
    */
  },

  story: {
    heading: "Our Story",
    kicker: "All Started in 2026",
    intro:
      "Every chapter we are celebrating today began in 2026 - softly at first, then with the kind of certainty that changes everything.",
    // Add, remove, or reorder milestones freely — the timeline renders whatever is here.
    milestones: [
      {
        year: "2026",
        title: "The Beginning",
        text:
          "Some stories do not arrive loudly. Ours began in the small moments, the honest talks, and the calm feeling that this was something real.",
      },
      {
        year: "2026",
        title: "The Decision",
        text:
          "One evening, quietly and certainly, we decided this was the story we wanted to keep writing together.",
      },
      {
        year: "2026",
        title: "The Promise",
        text:
          "From that moment, every plan felt warmer, every tomorrow felt closer, and forever started to feel like home.",
      },
      {
        year: "2026",
        title: "Our Engagement",
        text:
          "And now, surrounded by the people we love most, we begin the next chapter of our forever.",
      },
    ],
  },

  childhood: {
    heading: "Before We Knew...",
    lead: "Two little stories, growing separately...",
    trail: "...until they became one story.",
    groomLabel: "Amr",
    brideLabel: "Malak",
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
    // Set true only if you have a Google Maps embed API key and want a live map.
    // Otherwise the elegant location card + button (no key required) is used.
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
    // Optional: add your Formspree form ID to receive messages by email (https://formspree.io)
    formspreeId: "xwkegpyj",
  },

  music: {
    enabled: true,
    // Add your copy of the song to public/music and keep this path in sync.
    src: "/music/Perfect%20-%20Ed%20Sheeran.mp3",
    title: "Ed Sheeran - Perfect",
  },

  images: {
    groomChildhood: "/images/childhood-him.png",
    brideChildhood: "/images/childhood-her.png",
    ogCover: "/images/og-cover.jpg",
  },

  social: {
    // Optional — shown in the footer if provided. Leave empty string to hide.
    whatsappShareText: "You're invited to celebrate our engagement — 22 August 2026 💛",
  },

  navigation: [
    { id: "home", label: "Home" },
    { id: "story", label: "Our Story" },
    { id: "memories", label: "Memories" },
    { id: "event", label: "Event" },
    { id: "location", label: "Location" },
    { id: "messages", label: "Messages" },
  ],
};

export default eventData;
