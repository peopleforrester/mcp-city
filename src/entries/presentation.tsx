// ABOUTME: Entry for /presentation/. Mounts the page into the shared shell.
// ABOUTME: Content lives in src/pages; this file only wires the route.

import { mountPage } from "../pages/mount";
import { PresentationPage } from "../pages/Presentation";

mountPage(<PresentationPage />);
