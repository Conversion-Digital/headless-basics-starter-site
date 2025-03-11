import {
  GetLanguageSiteByCode,
  GetSite,
  browserUrlToCmsUrlConverter,
  buildPageData,
  collectSitemapNavigationStructure,
  getLogger,
  logPrefix,
  staticPageSeoExtractor,
} from "@conversiondigital/headless-basics-data"
import { PageBlueprint, PageDefinition } from "@conversiondigital/headless-basics-data/src/interfaces";

import { getDynamicSitemap } from "@conversiondigital/headless-basics-components/src/theme/default/structures/services/sitemapService";
import { setupSite } from '../siteContextService';


const log = getLogger("page.sitemap.global");

export default async function Page() {
  log.trace(`${logPrefix()} Sitemap loading page global`);
  setupSite()
  const data = await getSitemapData();
  const DynamicSiteMap = getDynamicSitemap(data.data);
  return <DynamicSiteMap data={data.data} />;
}

async function getSitemapData() {
  log.trace(`${logPrefix()} Sitemap data loading`);
  const languageSite = await GetLanguageSiteByCode('us');
  const pageConstruction: PageDefinition = {
    preliminarySlug: '/sitemap',
    pageIdentifier: null, // This is populatated in the next function
    languageSite: languageSite,
    isDynamic: false,
    source: 'page.sitemap.global.getSitemapData()'
  }
  let { cmsUrl }: { cmsUrl: any } = await browserUrlToCmsUrlConverter(pageConstruction.preliminarySlug);
  pageConstruction.pageIdentifier = { pageVariant: "home", backEndSlug: cmsUrl, frontEndSlug: pageConstruction.preliminarySlug, identifier: undefined, cmsType: "home", isFixedLayout: true };

  const data = await buildPageData(pageConstruction);
  let dataSitemap = await collectSitemapNavigationStructure("sitemapClient", pageConstruction.source);
  if (Array.isArray(dataSitemap)) {
    dataSitemap = dataSitemap.filter((x) =>
      typeof x.showInSitemap !== 'undefined' &&
      x.showInSitemap === true &&
      typeof x.url !== 'undefined' &&
      x.url != null
    );
  } else {
    // Handle non-array case: possibly log an error or set dataSitemap to an empty array
    dataSitemap = [];
  }
  data.sitemapData = dataSitemap;
  // We generate the XML sitemap with the posts data
  const site = GetSite();
  const siteName = site.name;
  return {
      data,
      siteName,
      languageSite
    };
}

export async function generateMetadata()
{
  log.trace(`${logPrefix()} Sitemap metadata loading global`);
  setupSite()
  const slug = "/sitemap";
  const seoData = {name: "Sitemap",
             seoTitle:"Sitemap",
             seoDescription:"Find all the necessary links and pages easily with our user-friendly sitemap.",
             ogDescription:"",
             ogImage:null,
             canonicalURLAbsolute:"",
             canonicalURLContentItem:null,
             structuredData:"",
             noIndexPage:false,
             alternateMultiURLs:null
            };

  return await staticPageSeoExtractor(slug, seoData);
}
