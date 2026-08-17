export interface MuseumSubject {
  name: string;
  fullName: string;
  nickname: string;
  birthday: string;
  curator: string;
  exhibitionNumber: string;
  estYear: string;
  status: string;
}

export interface ArtworkPlacard {
  id: string;
  objectNumber: string;
  title: string;
  subtitle?: string;
  medium: string;
  year: string;
  classification?: string;
  curatorNotes: string;
  extendedAnalysis?: string;
  image?: string;
  interactiveType?: 'diagram' | 'tilt' | 'audio' | 'inspect' | 'redacted' | 'lightbox' | 'glow' | 'blank';
  interactiveData?: any;
}

export interface ArchivalMemory {
  id: string;
  catalogCode: string;
  aspectRatio: 'landscape' | 'portrait' | 'square' | 'wide' | 'hero' | 'tall' | 'story';
  title: string;
  date: string;
  time?: string;
  location: string;
  curatorNote: string;
  image: string;
  isVideo?: boolean;
  tags: string[];
}

export interface RoomDefinition {
  id: string;
  roomIndex: number;
  code: string;
  name: string;
  subtitle: string;
  floor: string;
  lightingMood: 'entrance' | 'lobby' | 'cool' | 'warm' | 'playful' | 'intimate' | 'archival' | 'editorial' | 'skylit' | 'letter' | 'darkness';
  theme: 'white' | 'ivory' | 'dark';
  colorTemp: string;
  ambientDescription: string;
}

export const MUSEUM_CONFIG = {
  subject: {
    name: "FAE",
    fullName: "Fae",
    nickname: "Fae",
    birthday: "August 2026",
    curator: "MICHEAL",
    exhibitionNumber: "001",
    estYear: "2026",
    status: "PERMANENT ARCHIVE",
  } as MuseumSubject,

  introStatement: `This exhibition is dedicated to someone who is much easier to appreciate than she probably realizes. It is an exploration of intellect, humor, subtle tenderness, and the unmistakable presence of an extraordinary woman.`,

  curatorWelcome: `I could have bought you something. Instead, I wanted to build you somewhere.`,

  rooms: [
    {
      id: 'entrance',
      roomIndex: 0,
      code: 'ENTRY',
      name: 'The Entrance',
      subtitle: 'Architectural Portal & Threshold',
      floor: 'GROUND TIER',
      lightingMood: 'entrance',
      theme: 'dark',
      colorTemp: '3200K Architectural Dusk',
      ambientDescription: 'Massive limestone portal with soft amber radiance spilling through the grand threshold.'
    },
    {
      id: 'lobby',
      roomIndex: 1,
      code: 'ATRIUM',
      name: 'The Lobby',
      subtitle: 'Curatorial Reception & Orientation',
      floor: 'LEVEL 00',
      lightingMood: 'lobby',
      theme: 'white',
      colorTemp: '5000K Soft Daylight',
      ambientDescription: 'Vast white walls, soaring skylight proportions, and an expansive architectural reception.'
    },
    {
      id: 'mind',
      roomIndex: 2,
      code: 'GALLERY 01',
      name: 'Her Mind',
      subtitle: 'Intellect, Curiosity & Analytical Poise',
      floor: 'EAST WING',
      lightingMood: 'cool',
      theme: 'white',
      colorTemp: '5600K Cool Focus',
      ambientDescription: 'Clean, intellectual gallery celebrating how she thinks, analyzes, and perceives the world.'
    },
    {
      id: 'spirit',
      roomIndex: 3,
      code: 'GALLERY 02',
      name: 'Her Spirit',
      subtitle: 'Kindness, Courage & Quiet Steadiness',
      floor: 'WEST WING',
      lightingMood: 'warm',
      theme: 'ivory',
      colorTemp: '3000K Golden Radiance',
      ambientDescription: 'Monumental typography installations exploring the deep moral virtues that define who she is.'
    },
    {
      id: 'funny',
      roomIndex: 4,
      code: 'GALLERY 03',
      name: 'The Funny One',
      subtitle: 'Deadpan Delivery, Candid Expressions & Inside Jokes',
      floor: 'NORTH WING',
      lightingMood: 'playful',
      theme: 'white',
      colorTemp: '4200K Dynamic Halogen',
      ambientDescription: 'High-art curation framing her sharp wit, infectious laughter, and hilarious micro-expressions.'
    },
    {
      id: 'archive',
      roomIndex: 5,
      code: 'ARCHIVE',
      name: 'The Living Archive',
      subtitle: 'The Infinite Museum Wall & Flat-Files',
      floor: 'CENTRAL WING',
      lightingMood: 'archival',
      theme: 'ivory',
      colorTemp: '3500K Conservation Spec',
      ambientDescription: 'An expansive interactive scrolling contact sheet wall capturing real moments, adventures, and candid memories.'
    },
    {
      id: 'little-things',
      roomIndex: 6,
      code: 'GALLERY 04',
      name: 'The Little Things',
      subtitle: 'Micro-Observations & Unspoken Grace',
      floor: 'SANCTUARY',
      lightingMood: 'intimate',
      theme: 'white',
      colorTemp: '2800K Focused Spotlights',
      ambientDescription: 'A quiet gallery with discrete illuminated pedestals dedicated to the small habits and expressions I notice.'
    },
    {
      id: 'woman',
      roomIndex: 7,
      code: 'GALLERY 05',
      name: 'The Woman She Is',
      subtitle: 'High-Editorial Monograph & Core Truths',
      floor: 'ROTUNDA',
      lightingMood: 'editorial',
      theme: 'white',
      colorTemp: '5200K Editorial Luminescence',
      ambientDescription: 'Expansive whitespace and monumental serif typography celebrating the singular presence of who she is.'
    },
    {
      id: 'future',
      roomIndex: 8,
      code: 'FUTURE WING',
      name: 'The Future Wing',
      subtitle: 'The Unwritten Chapters & Open Frames',
      floor: 'SKY LEVEL',
      lightingMood: 'skylit',
      theme: 'white',
      colorTemp: '6000K Pure Horizon White',
      ambientDescription: 'Airy, open pavilion featuring empty gold frames ready for the extraordinary memories yet to come.'
    },
    {
      id: 'letter',
      roomIndex: 9,
      code: 'THE LETTER',
      name: 'A Letter from the Curator',
      subtitle: 'Direct, Authentic & Personal Dedication',
      floor: 'PRIVATE SALON',
      lightingMood: 'letter',
      theme: 'ivory',
      colorTemp: '2700K Warm Linen',
      ambientDescription: 'Warm ivory paper texture and a single gold frame line containing an intimate, unhurried personal letter.'
    },
    {
      id: 'final',
      roomIndex: 10,
      code: 'FINAL ROOM',
      name: 'The Final Room',
      subtitle: 'Object 000 & The Solitary Spotlight',
      floor: 'EPILOGUE',
      lightingMood: 'darkness',
      theme: 'dark',
      colorTemp: '2400K Solitary Beam',
      ambientDescription: 'Complete hush. A single beam of light falling across pure typography and an everlasting birthday dedication.'
    }
  ] as RoomDefinition[],

  // GALLERY 01 — HER MIND
  galleryMind: {
    objectNumber: "OBJECT 001",
    title: "HER MIND",
    headline: "BRILLIANT.",
    subtitle: "Portrait / 2026",
    medium: "Curated Archival Portrait & Cognitive Study",
    year: "2026",
    image: "/photos/mind_hero.webp",
    editorialText: `You have this beautiful way of being curious about things. You don't simply accept the world as it is. You question it, understand it, and somehow make everyone around you think a little differently. You dissect complexity with effortless clarity, moving between sharp analysis and intuitive empathy with a grace that is genuinely rare.`,
    shortLetter: `One of the things I admire most about you is how your mind works. I love listening to you talk about things you're interested in—the speed of your ideas, the connections you make, the way your eyes light up when you grasp something new. You don't even realize how impressive you are sometimes.`,
    thoughtNodes: [
      { id: "01", title: "Analytical Clarity", desc: "Dissects complex problems with calm, elegant precision." },
      { id: "02", title: "Lateral Leaps", desc: "Connects unexpected ideas that leave everyone else catching up." },
      { id: "03", title: "Authentic Curiosity", desc: "Never satisfied with superficial answers; seeks the truth beneath." },
      { id: "04", title: "Intuitive Perception", desc: "Sees the human emotions hidden behind facts and data." },
      { id: "05", title: "Quiet Mastery", desc: "Mastering whatever she sets her mind upon without needing to brag." }
    ]
  },

  // GALLERY 02 — HER SPIRIT
  gallerySpirit: {
    objectNumber: "OBJECT 014",
    title: "HER SPIRIT",
    subtitle: "Monumental Studies in Character",
    medium: "Fine Art Portrait & Sculptural Typology",
    year: "2026",
    image: "/photos/heart_virtue.webp",
    qualities: [
      {
        word: "KIND.",
        objectCode: "OBJECT 014",
        label: "KINDNESS",
        annotation: "Not the kind that asks to be noticed. The kind that simply exists.",
        detail: "An inherent tenderness that extends to strangers, friends, animals, and anyone who needs gentle ground. It is not performative; it is the fundamental core of who you are."
      },
      {
        word: "STRONG.",
        objectCode: "OBJECT 015",
        label: "COURAGE & RESILIENCE",
        annotation: "Stepping forward even when uncertainty is heavy.",
        detail: "You carry difficult situations with quiet dignity. You don't break under pressure; you breathe, stand tall, and find a path forward with unyielding grace."
      },
      {
        word: "RARE.",
        objectCode: "OBJECT 016",
        label: "INDIVIDUALITY",
        annotation: "Unapologetically herself in a world of copies.",
        detail: "You have your own distinct rhythm, your own compass, and your own moral gravity. To know you is to realize you cannot be compared to anyone else."
      }
    ],
    editorialText: `There is a profound difference between being impressive and being good. What makes you extraordinary is that you are both. Your strength does not make you hard; your kindness does not make you weak. You possess a rare, centered warmth that anchors everyone fortunate enough to be near you.`,
    shortLetter: `In a world that often rewards noise over substance, your spirit is a masterclass in quiet power. Thank you for showing me what real strength, genuine patience, and unshakable character look like every single day.`
  },

  // GALLERY 03 — THE FUNNY ONE
  galleryFunny: {
    objectNumber: "OBJECT 023",
    title: "THE COMEDIAN",
    subtitle: "Mixed media / candid",
    year: "2026",
    heroTitle: "SOMEHOW, EVERYTHING IS FUNNIER WHEN YOU'RE AROUND.",
    image: "/photos/funny_face.webp",
    observations: [
      {
        code: "OBJECT 027",
        title: "THE FACE",
        spec: "Reaction Study // 2026",
        body: "Used approximately 47 times per week. The micro-expression of heroic failure when trying not to laugh in a serious setting. Highly effective.",
        interactiveType: "tilt",
        image: "/photos/funny_face.webp"
      },
      {
        code: "OBJECT 028",
        title: "UNFILTERED WIT",
        spec: "Acoustic Artifact // Spontaneous",
        body: "Delivery: Deadpan. Accuracy: 100%. Timing: Devastating. Often muttered under your breath with pinpoint comedic precision.",
        interactiveType: "audio",
        image: "/photos/funny_memory.webp"
      },
      {
        code: "OBJECT 029",
        title: "THE INSIDE JOKES",
        spec: "Top Secret // Two Clearance Levels Only",
        body: "Permanent residency in my head. A single shared glance or one repeated word from six months ago that instantly incapacitates both of us.",
        interactiveType: "redacted",
        image: "/photos/inside_joke.webp"
      },
      {
        code: "OBJECT 030",
        title: "THE 2:00 AM THEATRICS",
        spec: "Existential Improv // High Fidelity",
        body: "The sudden late-night hypothetical scenario that begins with 'Wait, what if...' and ends in 45 minutes of breathless laughter.",
        interactiveType: "tilt",
        image: "/photos/laughing_candid.webp"
      }
    ],
    editorialText: `Your sense of humor is one of your greatest superpowers. It isn't just that you make great jokes—it's your infectious joy, the absurdity you spot in mundane situations, and how you make ordinary moments feel like private comedy specials.`,
    shortLetter: `No matter how stressful a day gets, one conversation with you resets everything. You make me laugh in ways nobody else ever has.`
  },

  // THE LIVING ARCHIVE
  livingArchive: {
    wallStatement: "An expansive, continuous museum contact sheet documenting real memories, laughter, adventures, and preserved timestamps.",
    items: [
      {
        id: "arch-01",
        catalogCode: "ARCHIVE 001",
        aspectRatio: "portrait",
        title: "THAT FACE",
        date: "AUGUST 2025",
        time: "02:14 PM",
        location: "SUNLIT VERANDA",
        curatorNote: "There is no way to look at this face and not smile. The kind of beauty that doesn't need a filter, a pose, or permission. Just her.",
        image: "/photos/archive_01.webp",
        tags: ["Beauty", "Portrait", "Radiance"]
      },
      {
        id: "arch-02",
        catalogCode: "ARCHIVE 002",
        aspectRatio: "tall",
        title: "US",
        date: "OCTOBER 2025",
        time: "01:37 AM",
        location: "WHEREVER WE WERE",
        curatorNote: "Some pictures don't need captions. Two people. One frame. Everything that matters in between.",
        image: "/photos/archive_02.webp",
        tags: ["Us", "Together", "Love"]
      },
      {
        id: "arch-03",
        catalogCode: "ARCHIVE 003",
        aspectRatio: "portrait",
        title: "THE SPONTANEOUS ADVENTURE",
        date: "DECEMBER 2025",
        time: "11:42 AM",
        location: "OUT IN THE CITY",
        curatorNote: "Zero itinerary, 100% enthusiasm. The kind of afternoon that proved anywhere is remarkable as long as she's there.",
        image: "/photos/archive_03.webp",
        tags: ["Adventure", "Wanderlust", "Laughter"]
      },
      {
        id: "arch-04",
        catalogCode: "ARCHIVE 004",
        aspectRatio: "portrait",
        title: "THE QUIET CONFIDENCE",
        date: "FEBRUARY 2026",
        time: "04:20 PM",
        location: "IN HER ELEMENT",
        curatorNote: "She doesn't try to be beautiful. She just is. Effortlessly, impossibly, unfairly. And she has no idea.",
        image: "/photos/archive_04.webp",
        tags: ["Grace", "Confidence", "Glow"]
      },
      {
        id: "arch-05",
        catalogCode: "ARCHIVE 005",
        aspectRatio: "portrait",
        title: "GOLDEN HOUR",
        date: "APRIL 2026",
        time: "07:15 PM",
        location: "WHEREVER THE LIGHT FOUND HER",
        curatorNote: "Sunlight finds her differently. As if it knows what the rest of us already know—she deserves the warmest light in the room.",
        image: "/photos/archive_05.webp",
        tags: ["Warmth", "Light", "Stunning"]
      },
      {
        id: "arch-06",
        catalogCode: "ARCHIVE 006",
        aspectRatio: "tall",
        title: "MY FAVOURITE PICTURE OF US",
        date: "JUNE 2026",
        time: "03:50 PM",
        location: "RIGHT WHERE WE BELONGED",
        curatorNote: "Every time I look at this, I remember exactly how that moment felt. I wouldn't trade it for anything in the world.",
        image: "/photos/archive_06.webp",
        tags: ["Us", "Memory", "Permanent"]
      },
      {
        id: "arch-07",
        catalogCode: "ARCHIVE 007",
        aspectRatio: "landscape",
        title: "LOOK AT HER",
        date: "JULY 2026",
        time: "09:30 PM",
        location: "EVERYWHERE SHE GOES",
        curatorNote: "Sometimes I just look at you and think: how did I get this lucky? This is one of those times, preserved forever.",
        image: "/photos/archive_07.webp",
        tags: ["Admiration", "Beauty", "Speechless"]
      },
      {
        id: "arch-08",
        catalogCode: "ARCHIVE 008",
        aspectRatio: "portrait",
        title: "THE WAY YOU LOOK AT SOMETHING BEAUTIFUL",
        date: "AUGUST 2026",
        time: "05:08 PM",
        location: "GALLERY PERSPECTIVE",
        curatorNote: "Your quiet reverence for art, nature, and craftsmanship. You absorb beauty and reflect it back to everyone around you.",
        image: "/photos/caring_moment.webp",
        tags: ["Reverence", "Beauty", "Attentive"]
      },
      {
        id: "arch-09",
        catalogCode: "ARCHIVE 009",
        aspectRatio: "square",
        title: "THE EXCITED GESTURE",
        date: "AUGUST 2026",
        time: "08:19 PM",
        location: "THE MID-STORY SPARK",
        curatorNote: "Both hands in motion, speaking at double speed because the story is just that good. Pure kinetic charm.",
        image: "/photos/excited_moment.webp",
        tags: ["Spark", "Energy", "Storyteller"]
      }
    ] as ArchivalMemory[]
  },

  // GALLERY 04 — THE LITTLE THINGS
  galleryLittleThings: {
    objectNumber: "OBJECT 040",
    title: "THE LITTLE THINGS",
    subtitle: "A Micro-Observational Field Study",
    medium: "Pedestal Studies & Fine Art Framing",
    year: "2026",
    image: "/photos/little_expressions.webp",
    editorialText: `Anyone can notice the loud qualities. This gallery is dedicated to the subtle things—the small, unscripted moments, micro-expressions, and unspoken habits that make you unmistakably you.`,
    shortLetter: `I pay attention to you. Not because I try to, but because everything about the way you move through the world is captivating.`,
    placards: [
      {
        id: "lt-1",
        label: "THE WAY YOU LAUGH",
        observation: "Not the polite laugh for strangers, but the real, full, head-thrown-back laugh when something is genuinely hilarious. It lights up an entire room without trying.",
        image: "/photos/laughing_candid.webp"
      },
      {
        id: "lt-2",
        label: "THE WAY YOU GET EXCITED",
        observation: "When you talk about something you care about, your speaking pace doubles, your eyes widen, and your hands choreograph ideas in the air. I could listen to you for hours.",
        image: "/photos/excited_moment.webp"
      },
      {
        id: "lt-3",
        label: "THE LITTLE EXPRESSIONS",
        observation: "The focused brow when working through a dilemma, the side-eye smirk, the involuntary grin you try to hide behind your hand. A whole language of its own.",
        image: "/photos/little_expressions.webp"
      },
      {
        id: "lt-4",
        label: "THE WAY YOU CARE",
        observation: "Remembering what someone mentioned weeks ago. Checking in when you sense fatigue. Making sure people feel seen and valued without expecting applause.",
        image: "/photos/caring_moment.webp"
      },
      {
        id: "lt-5",
        label: "THE THINGS YOU DON'T THINK ANYONE NOTICES",
        observation: "How you hum softly when concentrating, how you tuck a stray strand of hair, the quiet sigh of relief after a productive day. The moments you never knew were being admired.",
        image: "/photos/subconscious_moment.webp"
      }
    ]
  },

  // GALLERY 05 — THE WOMAN SHE IS
  galleryWoman: {
    objectNumber: "OBJECT 060",
    title: "THE WOMAN SHE IS",
    subtitle: "Monumental Editorial Monograph",
    medium: "Oversized Fine Art Installation",
    year: "2026",
    image: "/photos/observation_portrait.webp",
    monumentalWords: [
      { word: "AMAZING.", subtitle: "In every quiet room and every crowded hall." },
      { word: "SMART.", subtitle: "Sharp, intuitive, and deeply insightful." },
      { word: "FUNNY.", subtitle: "Hilarious, quick-witted, and infectious." },
      { word: "KIND.", subtitle: "Gentle, attentive, and genuinely good." },
      { word: "BEAUTIFUL.", subtitle: "Inside, outside, and in every gesture." },
      { word: "STRONG.", subtitle: "Resilient, poised, and unyielding." },
      { word: "LOVED.", subtitle: "Deeply, unconditionally, and without question." }
    ],
    editorialText: `There are a thousand ways to describe someone, but somehow none of them completely explain you. You are not a single trait or a simple summary. You are a rare combination of intellect, heart, humor, and depth that leaves an indelible mark on everyone who knows you.`,
    shortLetter: `If you could see yourself through my eyes for even five minutes, you would never doubt your worth, your brilliance, or how deeply special you are.`
  },

  // THE FUTURE WING
  futureWing: {
    wallTitle: "THE EXHIBITION IS NOT FINISHED.",
    wallStatement: "There are still so many chapters of you left to see. The future holds milestones, adventures, and triumphs that will amaze even yourself.",
    emptyFrames: [
      {
        id: "future-081",
        objectNumber: "OBJECT 081",
        title: "NOT YET DISCOVERED",
        description: "The hidden talents, passions, and curiosities quietly gathering momentum beneath the surface. Ready to take flight."
      },
      {
        id: "future-082",
        objectNumber: "OBJECT 082",
        title: "COMING SOON",
        description: "The next great victory, milestone, and adventure waiting right around the corner."
      },
      {
        id: "future-083",
        objectNumber: "OBJECT 083",
        title: "A FUTURE MEMORY",
        description: "The laughter we haven't shared yet, the cities we haven't explored, the sunsets we have yet to witness together."
      },
      {
        id: "future-084",
        objectNumber: "OBJECT 084",
        title: "SOMETHING AMAZING YOU HAVEN'T DONE YET",
        description: "The heights you will reach and the lives you will touch as your story continues to unfold."
      }
    ]
  },

  // LETTER FROM THE CURATOR
  curatorLetter: {
    heading: "A LETTER FROM THE CURATOR",
    recipient: "Dear Fae,",
    paragraphs: [
      `I spent a long time thinking about what I wanted to give you for your birthday. I could have bought you something from a store, wrapped it up, and handed it to you. But objects get put away on shelves. What I really wanted was to build you a place where the things that make you extraordinary could exist with the space, beauty, and reverence they deserve.`,
      `You are one of the most remarkable people I have ever met. You have a mind that cuts through noise with effortless brilliance, a sense of humor that turns ordinary Tuesdays into memories I treasure, and a heart that shows up for people with quiet, unconditional warmth. You make me want to think deeper, laugh louder, and appreciate the good things in life more carefully.`,
      `I notice the little things—the way your eyes light up when you're excited, the thoughtful questions you ask, the strength you show even when things are heavy, and the effortless grace with which you carry yourself. You don't ask to be the center of attention, but your presence changes the temperature of every room you walk into.`,
      `As you begin this next year, my greatest wish for you is that you experience the same joy, peace, and appreciation that you give so freely to the world. May your days be filled with projects you love, adventures that excite you, and the unwavering knowledge that you are cherished beyond measure.`,
      `Happy Birthday, Fae. Thank you for being exactly who you are.`
    ],
    signoff: "With all my love and admiration,",
    curatorName: "Micheal",
    date: "August 2026"
  },

  // THE FINAL ROOM
  finalRoom: {
    objectNumber: "OBJECT 000",
    exhibitTitle: "THE FINAL EXHIBIT",
    medium: "Permanent Monograph & Solitary Dedication",
    year: "Permanent / 2026",
    featuredImage: "/photos/final_portrait.webp",
    sequence: [
      "I DON'T HAVE MUCH RIGHT NOW...",
      "BUT I WANTED YOU TO HAVE SOMETHING THAT CAME FROM ME.",
      "HAPPY BIRTHDAY, FAE."
    ],
    closingEpigraph: `Some exhibitions are temporary.\nSome people are permanent.`
  }
};
