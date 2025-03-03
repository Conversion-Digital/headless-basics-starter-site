
import { setupSite } from "@/app/siteContextService"
import { renderPage } from "./renderPageContents"
import { fetchPageData, fetchMetadata, logPrefix } from "@conversiondigital/headless-basics-data";
import { getLogger } from "@conversiondigital/headless-basics-data";

import { PageBlueprint } from "@conversiondigital/headless-basics-data/src/interfaces";

const log = getLogger("page.Homepage")

export default async function Page() {
  log.info(`${logPrefix()}[SHOWCASE] Page Homepage loading -- ${process.env.SITE_ID}`) 
  setupSite();
  log.trace(`${logPrefix()}[SHOWCASE] Page Homepage loading`)
  const bluePrint: PageBlueprint = await fetchPageData({ slug: ["/"], source: "page.Homepage.fetchPageData" })
  
  // log.info(`${logPrefix()}[SHOWCASE] Page Homepage loaded ${process.env.SITE_ID}`)
  // await import(`@conversiondigital/headless-basics-components/src/theme/default/components/subcomponentcontent`)
  // await import(`@conversiondigital/headless-basics-components/src/theme/default/components/subcomponentcontent/sanity-mapping`)
  // const identifier = "subcomponentcontent";
  // const cmsPrefix = "heartcore";
  // const cmsPrefix2 = "sanity";

  // // await import(
  // //   `@conversiondigital/headless-basics-components/src/theme/default/components/${identifier}/${cmsPrefix}-mapping`
  // // )

  // // await import(`@conversiondigital/headless-basics-components/src/theme/default/components/${identifier}/${cmsPrefix}-mapping`);
  // // await import(`@conversiondigital/headless-basics-components/src/theme/default/components/${identifier}/${cmsPrefix2}-mapping`);
  // await import(`@conversiondigital/headless-basics-components/src/theme/default/components/subcomponentcontent`).then((module) => module.default);
  // return (<> Hello </>)
  return renderPage(bluePrint)
}

// export async function generateMetadata({ params }) {
//   setupSite();
//   log.trace(`${logPrefix()}[SHOWCASE] generateMetadata for homepage`)
//   return await fetchMetadata({ slug: ["/"] })
// }