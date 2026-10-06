// ABOUTME: Entry for the not-found page that Caddy serves with a 404 status.
// ABOUTME: Content lives in src/pages/NotFound.tsx.

import { mountPage } from "../pages/mount";
import { NotFoundPage } from "../pages/NotFound";

mountPage(<NotFoundPage />);
