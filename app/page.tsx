
import { setupSite } from "@/app/siteContextService"
import { renderPage } from "./renderPageContents"
import { fetchPageData, fetchMetadata, logPrefix } from "@conversiondigital/headless-basics-data";
import { getLogger } from "@conversiondigital/headless-basics-data";

import { PageBlueprint, PageDefinition } from "@conversiondigital/headless-basics-data/src/interfaces";

const log = getLogger("page.Homepage")

export default async function Page() {
  log.info(`${logPrefix()}[SHOWCASE] Page Homepage loading -- ${process.env.SITE_ID} -- ${process.env.UMBRACO_API_KEY}`) 
  setupSite();
  log.trace(`${logPrefix()}[SHOWCASE] Page Homepage loading`)
  const bluePrint: PageBlueprint = await fetchPageData({ slug: ["/"], source: "page.Homepage.fetchPageData" })
  log.info(`${logPrefix()}[SHOWCASE] Page Homepage loaded ${process.env.SITE_ID}`)
  return renderPage(bluePrint)
}

export async function generateMetadata({ params }) {
  setupSite();
  log.trace(`${logPrefix()}[SHOWCASE] generateMetadata for homepage`)
  return await fetchMetadata({ slug: ["/"] })
}