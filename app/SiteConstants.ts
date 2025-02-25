import { COMPONENT_PRODUCT_DETAILS } from "@conversiondigital/cd-headless-data";

import { SiteSettings, SiteComponents } from "@conversiondigital/cd-headless-data/src/interfaces";
import { CountryCode } from "@conversiondigital/cd-headless-data/src/cms/constants";

const languageSites = JSON.parse(process.env.SITE_LANGUAGE_SITES);

export const MySiteSettings: SiteSettings = {
    name: process.env.SITE_NAME || "Showcase",
    id: process.env.SITE_ID || "showcase",
    description: process.env.SITE_DESCRIPTION || "Showcase site for Headless Basices",
    logo: {
        description: "Next.js",
        image: "/landify/static/playground_assets/logotype-dark.svg",
        width: 100,
        height: 100,
        title: "Next.js",
    },
    mainSiteLanguage: (process.env.SITE_MAIN_LANGUAGE_SITE as CountryCode) || "en",
    languageSites: languageSites || `[
        {
            "countryCode": "us",
            "homepageSlugPrefix": "/us-homepage",
            "shouldLanguageCodeBeAddedToNav": false
        },
        {
            "countryCode": "au",
            "homepageSlugPrefix": "/au-homepage",
            "shouldLanguageCodeBeAddedToNav": true
        },
        {
            "countryCode": "nz",
            "homepageSlugPrefix": "/nz-homepage",
            "shouldLanguageCodeBeAddedToNav": true
        }
    ]`,
    extraPageTypes: [
        {
            identifier: "homepage",
            frontEndSlug: "",
            backEndSlug: "",
            pageVariant: "homepage",
            cmsType: "homepage",
            isFixedLayout: true,
        },
    ],
    // hideStoreButtons: true,
    siteConfig: {
        links: {
            twitter: "https://twitter.com/shadcn",
            github: "https://github.com/shadcn/ui",
            docs: "https://ui.shadcn.com",
            accordion: "/components/accordion",
            alert: "/components/alert-dialog",
            subMenu: "/components/subMenu",
            linksList: "/components/linkslist2",
            globalNavigation: "/components/globalNavigation",
            avatar: "/components/avatar",
            button: "/components/button",
            checkbox: "/components/checkbox",
            collapsible: "/components/collapsible",
            code: "/components/code",
            contextMenu: "/components/contextMenu",
            dialog: "/components/dialog",
            dropDown: "/components/dropDown",
            hoverCard: "/components/hoverCard",
            input: "/components/input",
            label: "/components/label",
            menuBar: "/components/menuBar",
            popover: "/components/popover",
            progress: "/components/progress",
            radioGroup: "/components/radioGroup",
            scrollArea: "/components/scrollArea",
            select: "/components/select",
            separator: "/components/separator",
            slider: "/components/slider",
            tabs: "/components/tabs",
            textarea: "/components/textarea",
            carousel: "/components/carousel",
            promotion: "/components/contentBlocks/promotion",
            breadcrumb: "/components/breadcrumb",
            cards: "/components/cards",
            badge: "/components/badge",
            chatBubble: "/components/chatBubble",
            countdown: "/components/countdown",
            kbd: "/components/kbd",
            radialProgress: "/components/radialProgress",
            stats: "/components/stats",
            ctaSectionTwoColumn: "/components/contentBlocks/ctaSectionTwoColumn",
            ctaSectionThreeColumn: "/components/contentBlocks/ctaSectionThreeColumn",
            range: "/components/range",
            rating: "/components/rating",
            footer: "/components/footer",
            table: "/components/table",
            mask: "/components/mask",
            hero: "/components/hero",
            mediaLogos: "/components/mediaLogos",
            featureSection: "/components/contentBlocks/featureSection",
        },
        // footerLocation: `/global-components/us/us-footer`,
        // stickyNavLocation: `/global-components/us/us-top-sticky-nav`
        footerLocation: (process.env.FOOTER_LOCATION_SLUG as string) || "/global-components/us/us-footer",
        stickyNavLocation: (process.env.STICKY_NAV_LOCATION_SLUG as string) || "/global-components/us/us-top-sticky-nav",
    },
    // ecommerceSettings: {
    //     hasProducts: true,
    // },
    deepSearchNavigation: true,
    fixedLayouts: {
        layouts: [
            {
                identifier: "productPage",
                components: [COMPONENT_PRODUCT_DETAILS],
            },
        ],
    },
    getSiteComponents(): SiteComponents {
        return this.fixedLayouts;
    },
    getSiteSettings(): SiteSettings {
        return this;
    },
    shouldRenderAllPages(): boolean {
        return this.pageSettings?.shouldRenderAllPages || true;
    },
    shouldAbortPageDataCollection(): boolean {
        return this.pageSettings?.abortPageDataCollection || false;
    },
    hideStoreButtons: false
}
