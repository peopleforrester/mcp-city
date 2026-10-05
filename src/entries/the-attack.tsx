// ABOUTME: Entry for /the-attack/. Mounts the page into the shared shell.
// ABOUTME: Content lives in src/pages; this file only wires the route.

import { mountPage } from "../pages/mount";
import { AttackPage } from "../pages/Attack";

mountPage(<AttackPage />);
