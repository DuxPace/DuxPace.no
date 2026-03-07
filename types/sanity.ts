export interface LocalizedString {
  no?: string;
  en?: string;
}

export interface LocalizedText {
  no?: string;
  en?: string;
}

export interface LocalizedBlockContent {
  no?: Array<{
    _type: "block";
    children: Array<{
      _type: "span";
      text: string;
      marks?: string[];
    }>;
    markDefs?: Array<{
      _key: string;
      _type: string;
      href?: string;
    }>;
  }>;
  en?: Array<{
    _type: "block";
    children: Array<{
      _type: "span";
      text: string;
      marks?: string[];
    }>;
    markDefs?: Array<{
      _key: string;
      _type: string;
      href?: string;
    }>;
  }>;
}

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

export interface SiteSettings {
  _id: string;
  _type: "siteSettings";
  title: LocalizedString;
  description: LocalizedText;
  contactEmail?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

export interface HeroSection {
  _id: string;
  _type: "heroSection";
  title: LocalizedString;
  subtitle: LocalizedString;
  ctaText?: LocalizedString;
  ctaLink?: string;
}

export interface AboutSection {
  _id: string;
  _type: "aboutSection";
  title: LocalizedString;
  content: LocalizedBlockContent;
  missionTitle?: LocalizedString;
  missionContent?: LocalizedBlockContent;
}

export interface TeamMember {
  _id: string;
  _type: "teamMember";
  name: string;
  role: LocalizedString;
  image?: SanityImage;
  bio?: LocalizedText;
  linkedin?: string;
  order?: number;
}

export interface NewsArticle {
  _id: string;
  _type: "newsArticle";
  title: LocalizedString;
  slug: {
    current: string;
  };
  excerpt?: LocalizedText;
  content: LocalizedBlockContent;
  image?: SanityImage;
  publishedAt: string;
  featured?: boolean;
}

export interface ContactSection {
  _id: string;
  _type: "contactSection";
  title: LocalizedString;
  subtitle?: LocalizedString;
  formLabels?: {
    name: LocalizedString;
    email: LocalizedString;
    message: LocalizedString;
    submit: LocalizedString;
    success: LocalizedString;
    error: LocalizedString;
  };
  contactInfo?: {
    email?: string;
    phone?: string;
    address?: LocalizedString;
  };
}

export interface SanityData {
  hero: HeroSection | null;
  about: AboutSection | null;
  teamMembers: TeamMember[];
  news: NewsArticle[];
  contact: ContactSection | null;
  settings: SiteSettings | null;
}

export type Language = "no" | "en";
