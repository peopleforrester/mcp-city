// ABOUTME: Entry for /search/. Mounts the search page into the shared shell.
// ABOUTME: Content lives in src/pages/Search.tsx; the index in src/data/searchIndex.ts.

import { mountPage } from "../pages/mount";
import { SearchPage } from "../pages/Search";

mountPage(<SearchPage />);
