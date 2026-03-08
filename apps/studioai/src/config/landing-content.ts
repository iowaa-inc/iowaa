/**
 * Landing Page Content Configuration
 *
 * This file contains all text content, copy, and data for the StudioAI landing page.
 * Centralized for easy content management and future CMS migration.
 *
 * FOCUS: Professional speech production platform for creating audio content,
 * not just a voice creation tool. Voice quality is the enabler, not the main value prop.
 */

// No imports needed - using plain TypeScript types

// ============================================================================
// HERO SECTION
// ============================================================================

export const hero = {
  badge: "Professional Speech Production Platform",
  headline: "Produce professional audio content at scale",
  subheadline: "Create studio-quality voice content with the precision and control of a professional production suite.",
  productionTypes: {
    label: "From audiobooks to podcasts, training videos to game dialogue—",
    items: [
      {
        name: "Audiobooks",
        icon: "book",
      },
      {
        name: "Podcasts",
        icon: "mic",
      },
      {
        name: "Training Videos",
        icon: "play",
      },
      {
        name: "Game Dialogue",
        icon: "gamepad",
      },
    ],
  },
  cta: {
    primary: {
      text: "Start Producing",
      href: "/auth/register",
    },
    secondary: {
      text: "Explore Workflows",
      href: "#how-it-works",
    },
  },
  stats: [
    {
      value: "10x",
      label: "Faster Production",
    },
    {
      value: "60%",
      label: "Cost Savings",
    },
    {
      value: "∞",
      label: "Creative Control",
    },
  ],
} as const;

// ============================================================================
// FEATURES SECTION
// ============================================================================

export const features = {
  sectionBadge: "Production Tools",
  sectionTitle: "Everything you need to produce professional audio content",
  sectionDescription: "A complete production suite designed for creators who demand broadcast-quality results without the broadcast-level costs.",
  items: [
    {
      icon: "file-list",
      title: "Project-Based Workflow",
      description: "Organize audiobooks, podcast series, training courses, and more with a professional project structure. Keep all your productions organized in one place.",
      href: null,
    },
    {
      icon: "text",
      title: "Script Editor with Timeline",
      description: "Write and edit your scripts with a powerful editor. Timeline-based segment management makes complex multi-character dialogues effortless.",
      href: null,
    },
    {
      icon: "team",
      title: "Team Collaboration",
      description: "Work with writers, directors, and editors in real-time. Role-based permissions keep your production organized and secure.",
      href: null,
    },
    {
      icon: "mic",
      title: "Direction & Performance Controls",
      description: "Direct every line like a voice director. Control emotion, pacing, emphasis, and delivery with precision—no studio time required.",
      href: null,
    },
    {
      icon: "emotion",
      title: "Character Voice Profiles",
      description: "Create distinct, consistent character voices for your productions. Save voice profiles and reuse them across projects for brand consistency.",
      href: null,
    },
    {
      icon: "settings",
      title: "Export & Distribution",
      description: "Export your finished productions in multiple formats optimized for audiobooks, podcasts, videos, or games. Ready for any platform.",
      href: null,
    },
  ],
} as const;

// ============================================================================
// VOICE LIBRARY SECTION
// ============================================================================

export const voiceLibrary = {
  sectionBadge: "Global Voice Library",
  sectionTitle: "Authentic voices from every corner of the world",
  sectionDescription: "Access a diverse library of natural-sounding voices in 100+ languages and dialects—including regional and local languages often overlooked by other platforms.",
  stats: [
    {
      value: "100+",
      label: "Languages & Dialects",
    },
    {
      value: "500+",
      label: "Unique Voices",
    },
    {
      value: "50+",
      label: "African Languages",
    },
  ],
  categories: [
    {
      region: "African Languages",
      description: "Authentic African voices for local content production and cultural preservation.",
      languages: [
        { name: "Nigerian Pidgin", speakers: "75M+" },
        { name: "Yoruba", speakers: "50M+" },
        { name: "Hausa", speakers: "80M+" },
        { name: "Igbo", speakers: "45M+" },
        { name: "Swahili", speakers: "200M+" },
        { name: "Zulu", speakers: "12M+" },
        { name: "Amharic", speakers: "57M+" },
        { name: "Afrikaans", speakers: "7M+" },
      ],
      highlight: true,
    },
    {
      region: "Global Languages",
      description: "Major world languages with regional accent variations for authentic localization.",
      languages: [
        { name: "English", speakers: "1.5B+", accents: "US, UK, Australian, Indian, Nigerian, Kenyan" },
        { name: "Spanish", speakers: "500M+", accents: "Latin American, European, Caribbean" },
        { name: "French", speakers: "300M+", accents: "European, African, Canadian" },
        { name: "Arabic", speakers: "400M+", accents: "Egyptian, Gulf, Levantine, Maghrebi" },
        { name: "Mandarin", speakers: "1.1B+" },
        { name: "Hindi", speakers: "600M+" },
        { name: "Portuguese", speakers: "260M+", accents: "Brazilian, European, African" },
        { name: "Bengali", speakers: "270M+" },
      ],
      highlight: false,
    },
    {
      region: "Asian Languages",
      description: "Comprehensive coverage of Asian languages for regional content creation.",
      languages: [
        { name: "Japanese", speakers: "125M+" },
        { name: "Korean", speakers: "80M+" },
        { name: "Vietnamese", speakers: "95M+" },
        { name: "Thai", speakers: "60M+" },
        { name: "Tagalog", speakers: "110M+" },
        { name: "Indonesian", speakers: "270M+" },
        { name: "Urdu", speakers: "230M+" },
        { name: "Tamil", speakers: "85M+" },
      ],
      highlight: false,
    },
    {
      region: "European Languages",
      description: "Complete European language coverage for continental content production.",
      languages: [
        { name: "German", speakers: "130M+" },
        { name: "Italian", speakers: "85M+" },
        { name: "Polish", speakers: "45M+" },
        { name: "Ukrainian", speakers: "35M+" },
        { name: "Dutch", speakers: "25M+" },
        { name: "Swedish", speakers: "13M+" },
        { name: "Greek", speakers: "13M+" },
        { name: "Romanian", speakers: "26M+" },
      ],
      highlight: false,
    },
  ],
  features: [
    {
      title: "Regional Authenticity",
      description: "Not just translations—truly authentic regional accents and dialects that resonate with local audiences.",
    },
    {
      title: "Cultural Preservation",
      description: "Help preserve and promote underrepresented languages through accessible audio content creation.",
    },
    {
      title: "Localization at Scale",
      description: "Produce the same content in dozens of languages without hiring separate voice actors for each.",
    },
    {
      title: "Gender & Age Diversity",
      description: "Multiple voice options for each language—male, female, young, mature—to match your content needs.",
    },
  ],
  useCases: [
    {
      title: "Local Content Creators",
      description: "Create podcasts, audiobooks, and videos in your native language—including languages often ignored by major platforms.",
      icon: "mic",
    },
    {
      title: "Educational Content",
      description: "Produce learning materials in students' mother tongues, improving comprehension and engagement.",
      icon: "book",
    },
    {
      title: "Global Brands",
      description: "Localize marketing and training content for every market you serve—at a fraction of traditional costs.",
      icon: "global",
    },
    {
      title: "Cultural Documentation",
      description: "Convert written stories, histories, and knowledge into audio format, preserving cultural heritage.",
      icon: "archive",
    },
  ],
} as const;

// ============================================================================
// VOICE CUSTOMIZATION SHOWCASE
// ============================================================================

export const voiceCustomization = {
  sectionBadge: "Voice Direction Tools",
  sectionTitle: "Direct performances like a professional voice director",
  sectionDescription: "StudioAI gives you the same level of control a voice director has in a recording studio—without booking studio time or hiring voice actors for every iteration.",
  layers: [
    {
      number: "01",
      title: "Character Voice Design",
      description: "Create unique, memorable character voices that stay consistent across your entire production.",
      features: [
        "Design distinct voices for different characters or narrators",
        "Control gender, age, accent, and regional variations",
        "Adjust vocal texture, resonance, and tonal quality",
        "Save character profiles for series and sequels",
        "Maintain brand voice consistency across content",
        "Mix and blend accents for authentic diversity",
      ],
      imageSlot: "voice-profile-ui",
    },
    {
      number: "02",
      title: "Performance Direction",
      description: "Direct the emotional performance of every line, just like working with a voice actor in the studio.",
      features: [
        "Choose from 19 emotions from subtle to intense",
        "Adjust pacing and rhythm for dramatic effect",
        "Control pitch variations for questions and emphasis",
        "Set volume dynamics from whispers to shouts",
        "Direct vocal texture: breathy, crisp, or gravelly",
        "Shape intonation patterns for natural dialogue",
      ],
      imageSlot: "expression-selector-ui",
    },
    {
      number: "03",
      title: "Fine Performance Tuning",
      description: "Polish your production with precise control over pauses, breaths, and vocal nuances that bring scenes to life.",
      features: [
        "Add natural pauses for dramatic timing",
        "Insert vocal utterances: laughs, sighs, gasps",
        "Control breath sounds for intimacy or intensity",
        "Fine-tune pronunciation for names and technical terms",
        "Add emphasis and stress to key words",
        "Layer multiple performance cues per line",
      ],
      imageSlot: "enrichments-ui",
    },
  ],
} as const;

// ============================================================================
// HOW IT WORKS SECTION
// ============================================================================

export const howItWorks = {
  sectionBadge: "Production Workflow",
  sectionTitle: "From script to finished audio in one platform",
  sectionDescription: "A streamlined production workflow that takes you from initial script to final export—all without leaving your browser.",
  steps: [
    {
      step: 1,
      title: "Set Up Your Production",
      description: "Create a project for your audiobook, podcast series, or video content. Organize by episodes, chapters, or scenes.",
      imageSlot: "create-project",
    },
    {
      step: 2,
      title: "Write & Structure Your Script",
      description: "Import existing scripts or write directly in our editor. Break your content into segments and assign them to different characters or narrators.",
      imageSlot: "write-script",
    },
    {
      step: 3,
      title: "Design Character Voices",
      description: "Create unique voice profiles for each character or narrator. Design the perfect voice for your protagonist, antagonist, and supporting cast.",
      imageSlot: "fine-tune-voice",
    },
    {
      step: 4,
      title: "Direct Each Performance",
      description: "Go through your script segment by segment. Direct the emotion, pacing, and delivery of each line. Add pauses, breaths, and vocal nuances.",
      imageSlot: "customize-expression",
    },
    {
      step: 5,
      title: "Review & Export",
      description: "Listen to your production, make adjustments, and export when ready. Generate your full audiobook, podcast episode, or voice-over in minutes.",
      imageSlot: "export-audio",
    },
  ],
} as const;

// ============================================================================
// USE CASES SECTION
// ============================================================================

export const useCases = {
  sectionBadge: "What You Can Produce",
  sectionTitle: "Professional audio content for every medium",
  sectionDescription: "Whether you're producing audiobooks, podcasts, training videos, or games, StudioAI adapts to your production needs.",
  cases: [
    {
      category: "Publishing",
      title: "Audiobook Production",
      description: "Produce full-length audiobooks with distinct character voices, consistent narration, and professional pacing. From indie novels to educational content.",
      benefits: [
        "Multi-character narration with distinct voices",
        "Consistent narrator voice across chapters",
        "Professional pacing and dramatic timing",
      ],
      imageSlot: "audiobook",
    },
    {
      category: "Content Creation",
      title: "Podcast Production",
      description: "Create podcast intros, outros, ad reads, and full episodes. Maintain consistent host voices and produce series at scale.",
      benefits: [
        "Consistent host voice across episodes",
        "Professional intro/outro production",
        "Rapid episode turnaround",
      ],
      imageSlot: "podcaster",
    },
    {
      category: "Education",
      title: "E-Learning & Training",
      description: "Produce engaging training videos, online courses, and educational content with clear narration and consistent delivery across modules.",
      benefits: [
        "Clear, professional narration",
        "Multi-language course production",
        "Consistent delivery across modules",
      ],
      imageSlot: "elearning",
    },
    {
      category: "Entertainment",
      title: "Game Dialogue & Narration",
      description: "Create thousands of dialogue lines for NPCs, character voices, and narrative content. Rapidly iterate and expand your game's voice content.",
      benefits: [
        "Multiple character voice profiles",
        "Rapid dialogue iteration",
        "Scalable content expansion",
      ],
      imageSlot: "gaming",
    },
    {
      category: "Marketing",
      title: "Video Production & Ads",
      description: "Produce voice-overs for video ads, explainer videos, product demos, and social media content. Test different approaches without re-recording.",
      benefits: [
        "Rapid video production turnaround",
        "A/B test different voice approaches",
        "Brand voice consistency",
      ],
      imageSlot: "marketing",
    },
    {
      category: "Business",
      title: "Documentation & Guides",
      description: "Turn written documentation, user guides, and help content into audio format. Make your resources accessible to everyone.",
      benefits: [
        "Audio versions of documentation",
        "Accessible content for all users",
        "Automated content updates",
      ],
      imageSlot: "accessibility",
    },
  ],
} as const;

// ============================================================================
// SOCIAL PROOF / TESTIMONIALS
// ============================================================================

export const testimonials = {
  sectionBadge: "Testimonials",
  sectionTitle: "Trusted by professional creators",
  sectionDescription: "See how creators are using StudioAI to produce professional audio content at scale.",
  items: [
    {
      quote: "I've produced three audiobooks with StudioAI in the time it would have taken me to record one the traditional way. The character voice consistency is remarkable.",
      author: "Sarah Chen",
      role: "Independent Author & Audiobook Producer",
      avatarSlot: "avatar-sarah",
    },
    {
      quote: "We reduced our e-learning production costs by 60% and cut turnaround time from weeks to days. The quality is indistinguishable from our previous studio recordings.",
      author: "Marcus Rodriguez",
      role: "Head of Learning & Development, TechCorp",
      avatarSlot: "avatar-marcus",
    },
    {
      quote: "As a podcast producer, being able to iterate on intros and ad reads without re-recording saves me hours every week. The consistency across episodes is perfect.",
      author: "Emily Thompson",
      role: "Podcast Producer & Host",
      avatarSlot: "avatar-emily",
    },
    {
      quote: "The timeline-based editor and performance controls feel like having a full production studio. I can direct every line exactly how I envision it.",
      author: "David Kim",
      role: "Audio Drama Producer",
      avatarSlot: "avatar-david",
    },
    {
      quote: "We're producing training videos in 12 languages simultaneously. The time and cost savings compared to hiring voice actors for each language are incredible.",
      author: "Ana Silva",
      role: "Global Training Manager",
      avatarSlot: "avatar-ana",
    },
    {
      quote: "StudioAI lets our entire team contribute to voice production—writers, directors, and editors all work together seamlessly. It's transformed our workflow.",
      author: "James Wilson",
      role: "Creative Director, Media Studio",
      avatarSlot: "avatar-james",
    },
  ],
} as const;

// ============================================================================
// PRICING SECTION
// ============================================================================

export const pricing = {
  sectionBadge: "Pricing",
  sectionTitle: "Production plans for every scale",
  sectionDescription: "From solo creators to production studios—choose the plan that fits your output needs.",
  plans: [
    {
      name: "Creator",
      description: "Perfect for indie authors and solo content creators",
      price: {
        monthly: 0,
        annual: 0,
      },
      features: [
        "5 active projects",
        "Up to 20 scripts per project",
        "10 hours of audio production per month",
        "Basic voice design controls",
        "Standard export formats",
        "Community support",
      ],
      cta: {
        text: "Start Producing Free",
        href: "/auth/register",
      },
      highlighted: false,
    },
    {
      name: "Professional",
      description: "For professional creators and small studios",
      price: {
        monthly: 49,
        annual: 490,
      },
      features: [
        "Unlimited projects and scripts",
        "100 hours of production per month",
        "Advanced voice direction tools (50+ parameters)",
        "Team collaboration (up to 5 members)",
        "Priority rendering queue",
        "All export formats",
        "Priority support",
        "Commercial usage rights",
      ],
      cta: {
        text: "Start Free Trial",
        href: "/auth/register?plan=professional",
      },
      highlighted: true,
    },
    {
      name: "Studio",
      description: "Custom solutions for production studios",
      price: {
        monthly: null,
        annual: null,
      },
      features: [
        "Everything in Professional",
        "Unlimited production hours",
        "Unlimited team members",
        "Custom voice profile library",
        "Dedicated account manager",
        "SLA guarantee & priority support",
        "Custom integrations & API access",
        "Volume licensing",
        "Training & onboarding",
      ],
      cta: {
        text: "Contact Sales",
        href: "/contact",
      },
      highlighted: false,
    },
  ],
} as const;

// ============================================================================
// FAQ SECTION
// ============================================================================

export const faq = {
  sectionBadge: "FAQ",
  sectionTitle: "Common production questions",
  sectionDescription: "Everything you need to know about producing audio content with StudioAI.",
  items: [
    {
      question: "What makes StudioAI different from other text-to-speech tools?",
      answer: "StudioAI isn't just a text-to-speech tool—it's a complete production platform. While tools like ElevenLabs focus on voice quality, we focus on the entire production workflow: project management, script editing, timeline-based direction, team collaboration, and professional export. We bridge the gap between basic TTS and professional studio production.",
    },
    {
      question: "Can I produce full-length audiobooks with StudioAI?",
      answer: "Absolutely. StudioAI is designed for long-form content production. You can organize your book by chapters, create distinct character voices, maintain consistent narration throughout, and export the full production. Many authors have produced complete audiobooks, from short stories to full novels.",
    },
    {
      question: "How does the team collaboration work?",
      answer: "StudioAI supports professional production teams with role-based permissions. Writers can draft scripts, directors can refine performances, and editors can handle final production—all in real-time. Perfect for podcast teams, audio drama productions, or e-learning studios.",
    },
    {
      question: "What audio quality can I expect?",
      answer: "Our productions deliver broadcast-quality audio suitable for commercial distribution. The voice quality itself is powered by leading AI voice synthesis, but what makes StudioAI special is the control you have over the performance—emotion, pacing, breath, pauses—resulting in professional, publication-ready content.",
    },
    {
      question: "Do I own the rights to the audio I produce?",
      answer: "Yes. All audio you produce with StudioAI is yours to use commercially without additional licensing fees. You own the full rights to your productions and can distribute them on any platform (Audible, Spotify, YouTube, etc.).",
    },
    {
      question: "Can I maintain consistent voices across a series?",
      answer: "Yes. One of StudioAI's strengths is voice profile management. Create a character voice once and save it as a profile. Use that exact voice across multiple books in a series, podcast episodes, or video series—ensuring perfect consistency.",
    },
    {
      question: "What languages are supported?",
      answer: "StudioAI supports 30+ languages including English, Spanish, French, German, Italian, Portuguese, Japanese, Korean, Mandarin, Hindi, Arabic, and more. Each language includes regional accent variations for authentic localization.",
    },
    {
      question: "How long does it take to produce content?",
      answer: "Production speed depends on your project complexity and how much direction you add. Simple narration can be produced in minutes. Complex multi-character scenes with detailed performance direction might take longer—but still dramatically faster than traditional studio recording. Most creators report 10x faster turnaround compared to traditional production.",
    },
  ],
} as const;

// ============================================================================
// FINAL CTA SECTION
// ============================================================================

export const finalCta = {
  badge: "Ready to produce?",
  headline: "Start your first production today",
  subheadline: "Join thousands of creators producing professional audiobooks, podcasts, videos, and more with StudioAI.",
  cta: {
    primary: {
      text: "Start Producing Free",
      href: "/auth/register",
    },
    secondary: {
      text: "Talk to Our Team",
      href: "/contact",
    },
  },
} as const;

// ============================================================================
// FOOTER
// ============================================================================

export const footer = {
  tagline: "Professional speech production for creators and studios",
  sections: [
    {
      title: "Product",
      links: [
        { label: "Features", href: "#features" },
        { label: "Pricing", href: "#pricing" },
        { label: "Use Cases", href: "#use-cases" },
        { label: "Changelog", href: "/changelog" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: "/docs" },
        { label: "Production Guides", href: "/guides" },
        { label: "Tutorials", href: "/tutorials" },
        { label: "Blog", href: "/blog" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "Careers", href: "/careers" },
        { label: "Press Kit", href: "/press" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Commercial License", href: "/license" },
        { label: "Cookie Policy", href: "/cookies" },
      ],
    },
  ],
  social: [
    { platform: "twitter", href: "https://twitter.com/studioai" },
    { platform: "github", href: "https://github.com/studioai" },
    { platform: "linkedin", href: "https://linkedin.com/company/studioai" },
    { platform: "youtube", href: "https://youtube.com/@studioai" },
  ],
  copyright: `© ${new Date().getFullYear()} StudioAI. All rights reserved.`,
} as const;

// ============================================================================
// TYPE EXPORTS FOR TYPE SAFETY
// ============================================================================

export type Hero = typeof hero;
export type Features = typeof features;
export type VoiceLibrary = typeof voiceLibrary;
export type VoiceCustomization = typeof voiceCustomization;
export type HowItWorks = typeof howItWorks;
export type UseCases = typeof useCases;
export type Testimonials = typeof testimonials;
export type Pricing = typeof pricing;
export type FAQ = typeof faq;
export type FinalCta = typeof finalCta;
export type Footer = typeof footer;
