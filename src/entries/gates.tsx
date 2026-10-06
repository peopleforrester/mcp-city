// ABOUTME: Entry for /gates/. Mounts the gates page into the shared shell.
// ABOUTME: Content lives in src/pages/GatesPage.tsx; the gate wording in src/data/gates.ts.

import { mountPage } from "../pages/mount";
import { GatesPage } from "../pages/GatesPage";

mountPage(<GatesPage />);
