import React from "react"
import { buildMegaMenu } from "@conversiondigital/headless-basics-components/src/theme/default/structures/MegaMenu"
import { HeadlessLayout } from "@conversiondigital/headless-basics-components/src/theme/default/structures/views/headlessLayout"
import { renderComponentContent } from "@conversiondigital/headless-basics-components/src/theme/default/structures/services/components/pageComponentRenderService"
import { getLogger, logPrefix, PageSubComponents } from "@conversiondigital/headless-basics-data";

import { PageBlueprint } from "@conversiondigital/headless-basics-data/src/interfaces";
const log = getLogger("page.renderPageContents")

export function renderPage(
  bluePrint: PageBlueprint
): JSX.Element {
  log.trace(`${logPrefix()} renderPage for Slug Dynamic - ${bluePrint?.pageData?.preliminarySlug}`)
  const megaMenuMenu = buildMegaMenu(
    bluePrint?.navItems,
    bluePrint?.stickyNavItems,
    bluePrint?.pageData?.languageSite
  )

  return (
    <HeadlessLayout
      className={"flex w-full flex-col items-center"}
      bluePrint={bluePrint}
      isMegamenu={true}
      megaMenuMenu={megaMenuMenu}
    >
      <div className={"mx-auto"}>
        <>
          <PageSubComponents
            bluePrint={bluePrint}
            location="Top"
          />
          {renderComponentContent(bluePrint)}
          <PageSubComponents
            bluePrint={bluePrint}
            location="Bottom"
          />
        </>
      </div>
    </HeadlessLayout>
  )
}
