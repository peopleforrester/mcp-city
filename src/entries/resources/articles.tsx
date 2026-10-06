// ABOUTME: Entry for /resources/articles/. Mounts the index into the shared shell.
// ABOUTME: Content lives in src/pages/ArticlesIndex.tsx; the grouping in src/lib/sections.ts.

import { mountPage } from "../../pages/mount";
import { ArticlesIndexPage } from "../../pages/ArticlesIndex";

mountPage(<ArticlesIndexPage />);
