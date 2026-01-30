import { prisma } from './prisma';

export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  linkedinUrl: string;
  twitterUrl: string;
  facebookUrl: string;
  instagramUrl: string;
  theme: string;
}

const defaultSettings: SiteSettings = {
  siteName: 'Growing Graham',
  siteDescription: 'Services en développement durable, RSE et transition écologique pour les entreprises.',
  contactEmail: '',
  contactPhone: '',
  address: '',
  linkedinUrl: '',
  twitterUrl: '',
  facebookUrl: '',
  instagramUrl: '',
  theme: 'light',
};

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const settingsArray = await prisma.siteSetting.findMany();
    const settings = settingsArray.reduce((acc, s) => {
      acc[s.key] = s.value;
      return acc;
    }, {} as Record<string, string>);

    return {
      siteName: settings.siteName || defaultSettings.siteName,
      siteDescription: settings.siteDescription || defaultSettings.siteDescription,
      contactEmail: settings.contactEmail || defaultSettings.contactEmail,
      contactPhone: settings.contactPhone || defaultSettings.contactPhone,
      address: settings.address || defaultSettings.address,
      linkedinUrl: settings.linkedinUrl || defaultSettings.linkedinUrl,
      twitterUrl: settings.twitterUrl || defaultSettings.twitterUrl,
      facebookUrl: settings.facebookUrl || defaultSettings.facebookUrl,
      instagramUrl: settings.instagramUrl || defaultSettings.instagramUrl,
      theme: settings.theme || defaultSettings.theme,
    };
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return defaultSettings;
  }
}

export function getDefaultSettings(): SiteSettings {
  return { ...defaultSettings };
}
