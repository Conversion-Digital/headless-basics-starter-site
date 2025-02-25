# Headless Basics - Detailed Developer Overview

Headless Basics is a Next.js starter kit designed for multi-CMS support and advanced component-based architecture. Built with flexibility in mind, it abstracts away CMS-specific implementations to keep your frontend code lean, testable, and portable across any platform.

## What Does It Do?

1. **Multi-CMS Architecture**  
   This project supports different CMS systems (e.g., Umbraco Heartcore, Sanity, etc.) by providing an abstraction layer in `@/@conversiondigital/headless-basics-data`. This allows you to change or extend the CMS without rewriting the entire frontend.

2. **Modular Component Structure**  
   With a folder-based, component-driven approach, Headless Basics encourages code reuse, testability, and clarity. The code is laid out so that each “theme component” or “site component” can be individually tested, consumed, or replaced.

3. **SEO and Metadata**  
   SEO is handled by dedicated components (e.g., the `SEO` directory) and metadata methods from `@/@conversiondigital/headless-basics-data`. This ensures pages and sub-components can automatically pull in or override relevant SEO fields from the CMS (title, description, canonical URL, etc.).

4. **Breadth of UI Components**  
   The core includes hero blocks, rich text blocks, CTA lists, exploration sliders, product listings, sitemaps, and more, all designed to be flexible so that each one can adapt to different fields or data from the underlying CMS schema.

5. **Security and Best Practices**  
   - `Content-Security-Policy` headers in `next.config.mjs`
   - Rate limiters and IP filters in `middleware.ts`
   - A robust approach to reCAPTCHA V3 scripts, ensuring minimal friction for form submissions while staying secure.

---

## Project Structure

The Next.js application structure is split into distinct folders and modules, each serving a specific purpose:

- **`app/`**  
  Holds Next.js route handlers. This includes dynamic routes (e.g., `[...slug]/page.tsx`) and supporting code like `layout.tsx` or custom error pages. There's also an API folder (`app/api/subscribeUser`) for Mailchimp subscriptions.

- **`sites/`**  
  Houses site-specific components or logic that might differ per brand or region. For instance, a site might have a specialized navigation layout or subscription popups.

- **`theme/`**  
  Contains the “theme components,” which define how individual blocks or sections appear. Each subfolder (e.g., `hero`, `ctalist`, `gallery`) includes:
  - `mapping.ts`: How the data from the CMS is mapped into the component’s props.
  - `query.ts`: GraphQL queries used to fetch the raw data.
  - `variables.ts`: Variables or arguments for the GraphQL queries.
  - `view.tsx` and a `components` folder: The actual React UI code.

- **`utils/`**  
  Shared utilities for reCAPTCHA logic, color conversions, etc. The `getSectionBackgroundColour.ts` file is a good example of how small logic is encapsulated for reusability.

- **`.editorconfig, .eslintrc.json, .prettierignore, .prettier.config.js, tailwind.config.js`**  
  Various configuration files for code formatting, linting, and Tailwind CSS. These ensure consistent code style and developer experience.

---

## How To Get Started

1. **Clone and Install**  
   `git clone <url>`, then `pnpm install`. Create your `.env.local` with your environment variables:



2. **Develop**  
Run `pnpm run dev`. Your local dev environment is at `http://localhost:3000`.

3. **CMS Integration**  
- Adjust `@/@conversiondigital/headless-basics-data` or environment variables to point to your actual CMS endpoints.
- Modify or create new `mapping.ts` and `query.ts` files in any theme subfolder to support newly introduced fields or content types.

4. **Add/Modify Components**  
If you introduce new sections or blocks (like a “feature card” or “promo banner”), replicate the approach in existing theme components: create a subfolder with `mapping.ts`, `query.ts`, and a `view.tsx`.

5. **Deploy**  
- Typically use Vercel or any Node-compatible hosting.  
- Make sure your environment variables are set in production.

---

## Developer Notes

- **Data Flow**  
A single “page blueprint” object is assembled from multiple smaller GraphQL queries. Each block (like a hero or CTA) has its own query + data mapping, merged into the blueprint for easy rendering.

- **Global vs. Local Components**  
Some components are global (like footers or sticky nav), others are site-specific. This allows you to have multiple brand or language variations without duplicating too much code.

- **Performance**  
- Tailwind CSS for consistent, atomic styling  
- Automatic code splitting by Next.js.  
- Optional prefetch logic for Next.js routes.

- **Security**  
- reCAPTCHA V3 integrated to block spam form submissions.  
- IP filtering (through environment variables) to block or allow certain addresses.  

---

## Examples

- **Hero**: Found in `theme/components/hero`. By changing `selectableVariant` (e.g., “FadedInformationHero,” “HeroCTAButtons”), you can produce different hero layouts for each page.

---

## Contributing

1. **Issue or Feature Request**  
Create a GitHub issue describing the problem or feature you want.
2. **Fork & Pull**  
- Fork the repo
- Implement changes
- Submit a PR with a good title, description, and optional screenshots or references

---

## License

Headless Basics is licensed under the MIT License. See `LICENSE` for more information.
