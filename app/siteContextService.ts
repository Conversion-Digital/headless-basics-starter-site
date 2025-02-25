import { MySiteSettings } from "@/app/SiteConstants";
import { getLogger, logPrefix } from "@conversiondigital/cd-headless-data";
import { SiteSettings, BaseSiteConfig } from "@conversiondigital/cd-headless-data/src/interfaces";

const log = getLogger("page.siteContextService");

export function GetShowcaseSite(): SiteSettings {
    return MySiteSettings;
}

export async function GetAtaSiteConfig(): Promise<BaseSiteConfig> {
  return MySiteSettings.siteConfig;
}

export function setupSite() {
  if (typeof global.myGlobalSiteHolder === 'undefined') {
    log.trace(`${logPrefix()} Setting up site`);
    global.myGlobalSiteHolder = GetShowcaseSite();
  }
}

if (typeof global.myGlobalSiteHolder === 'undefined') {
  global.myGlobalSiteHolder = GetShowcaseSite();
}
