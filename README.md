This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Project Structure and Components

This project is organized as follows:

### src/

#### app/

- **page.tsx**: The landing page. Introduces the app, its features, and allows users to select a report type.
- **layout.tsx**: The root layout, applies global styles, fonts, and theme provider. Includes the main header.
- **not-found.tsx**: Custom 404 page for invalid report types.
- **globals.css**: Global styles using Tailwind CSS and custom properties for theming.
- **favicon.ico**: App favicon.

##### app/\_components/

- **report-form.tsx**: Form for entering details for a selected report type. Handles form state and submission.
- **custom-report-form.tsx**: Form for creating a fully custom report, including title, recipient, body, and author.
- **report-preview.tsx**: Displays a live preview of the selected report type, showing how the generated document will look.
- **report-selector.tsx**: UI for selecting a report type or custom report, with both dropdown and card-based selection.

###### app/\_components/ui/

- **header.tsx**: The main app header, includes branding and theme toggle.
- **main.tsx**: Wrapper for main content, applies layout and background.
- **toggle-theme.tsx**: Theme toggle button (light/dark/system), using a dropdown menu.
- **theme-provider.tsx**: Provides theme context to the app using next-themes.

####### app/\_components/ui/shadcn/

- **button.tsx**: Reusable button component with multiple variants and sizes.
- **card.tsx**: Card component with header, content, footer, and other subcomponents.
- **dropdown-menu.tsx**: Dropdown menu component, used for theme toggle and other menus.
- **input.tsx**: Styled input component for forms.
- **label.tsx**: Accessible label component for form fields.
- **select.tsx**: Select/dropdown component for choosing options.
- **textarea.tsx**: Styled textarea component for multi-line input.

##### app/create-report/

- **[type]/page.tsx**: Dynamic route for creating a report of a specific type. Renders the appropriate form and preview.
- **custom/page.tsx**: Page for creating a fully custom report using the custom report form.

##### app/download/

- **page.tsx**: Download page shown after report generation. Allows the user to download the generated PDF and return home or create a new report.

#### lib/

- **utils.ts**: Utility functions, including `cn` (class name merging) and `capitalizeString` (for formatting report type names).

---

Each component is designed for reusability and accessibility, leveraging Radix UI and shadcn/ui patterns. The app uses Tailwind CSS for styling and supports light/dark themes.

For more details on each component, see the source files in `src/app/_components/` and `src/app/_components/ui/shadcn/`.
