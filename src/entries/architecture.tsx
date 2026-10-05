// ABOUTME: Entry for /architecture/. Mounts the page into the shared shell.
// ABOUTME: Content lives in src/pages; this file only wires the route.

import { mountPage } from "../pages/mount";
import { ArchitecturePage } from "../pages/Architecture";

mountPage(<ArchitecturePage />);
