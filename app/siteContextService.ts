import { MySiteSettings } from "@/app/SiteConstants";
import { getLogger, logPrefix } from "@conversiondigital/headless-basics-data";
import { SiteSettings, BaseSiteConfig } from "@conversiondigital/headless-basics-data/src/interfaces";

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
