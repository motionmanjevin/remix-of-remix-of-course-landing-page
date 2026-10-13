# Punto Vivo

Punto Vivo connects waste reports, collection operations, and prediction for bulky waste management in Bogotá.

## Setup

You need Node.js and npm.

```sh
npm i
npm run dev
```

The app runs at http://localhost:8080.

Create a `.env` file in the project root before you use the contact form. The landing page and the UAESP dashboard load without it.

```sh
VITE_SUPABASE_URL="https://your-project.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="your-publishable-key"
VITE_SUPABASE_PROJECT_ID="your-project-id"
```

Other scripts:

```sh
npm run build    # production build
npm run preview  # serve the production build
npm run lint
```

## Pages

Open these paths in the browser, or use the links in the header and footer.

| Page | URL | How to open it |
| --- | --- | --- |
| Home | http://localhost:8080/ | Logo in the header |
| Plans | http://localhost:8080/plans | **Plans** in the desktop header, or the footer |
| UAESP dashboard | http://localhost:8080/uaesp | **UAESP Dashboard** in the desktop header, or the URL directly |
| Contact | http://localhost:8080/contact | **Contact** in the header, **Partner with us** on the home page, or the footer |
| Terms of Service | http://localhost:8080/terms-of-service | Footer |
| Privacy Policy | http://localhost:8080/privacy-policy | Footer |

On a narrow screen, the header menu lists the home sections and Contact. Plans and the UAESP dashboard stay available by URL, and Plans is also in the footer.

### Home

The header links scroll to sections on the home page:

- **System** — reporting, collection requests, and prediction
- **Operations** — how a collection is assigned and tracked
- **Intelligence** — hotspot prediction
- **Workflow** — how completed collections feed the model

### UAESP dashboard

http://localhost:8080/uaesp is the operations view for UAESP field teams. It uses demo data.

- Search by name, worker ID, or locality.
- Filter by Collector, Driver, Recycler, Inspector, or Supervisor.
- Select a worker in the list or on the map to open their profile.
- **Change status** cycles that worker through Active, On break, and Off duty.
- The map shows active workers, workers on break or off duty, large waste generators, and the route to a destination.
- The arrow next to the logo returns to the home page.

### Plans and contact

**Plans** lists Punto Vivo Community, Business, and Enterprise. Each plan links to the contact form.

**Contact** is the sales form. Sending it needs the Supabase values in `.env`.
