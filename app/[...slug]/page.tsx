import { setupSite } from "@/app/siteContextService"

import { fetchMetadata, fetchPageData, fetchStaticParams, getLogger, logPrefix } from "@conversiondigital/headless-basics-data"
import { renderPage } from "../renderPageContents"

import { PageBlueprint, Path } from "@conversiondigital/headless-basics-data/src/interfaces";

const log = getLogger("page.Slug.Dynamic")

type tParams = Promise<{ slug: string[] }>
export default async function Page(props: { params: tParams }) {
  setupSite()
  const { slug } = await props.params
  log.trace(`${logPrefix()} Slug Dynamic loading ${slug}`)

  const bluePrint: PageBlueprint = await fetchPageData({
    slug,
    source: "page.Slug.Dynamic.fetchPageData",
  })

  if (!bluePrint) {
    return;
  }

  return renderPage(bluePrint)
}

export async function generateStaticParams() {
  setupSite()
  log.trace(`${logPrefix()} Slug Dynamic static params loading`)
  const routes: Path[] = await fetchStaticParams()
  // Remove "/" from the list of slugs
  const filteredRoutes = routes.filter(
    (route) =>
      route.slug.length > 0 && route.slug[0] !== "" && route.slug[0] !== "/"
  )
  return filteredRoutes
}

export async function generateMetadata(props: { params: tParams }) {
  setupSite()
  const { slug } = await props.params
  log.trace(`${logPrefix()} generateMetadata for Slug Dynamic ${slug}`)
  return await fetchMetadata({ slug })
}
