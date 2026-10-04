// ABOUTME: Entry for /usb/. Mounts the page into the shared shell.
// ABOUTME: Content lives in src/pages; this file only wires the route.

import { mountPage } from "../pages/Page";
import { UsbPage } from "../pages/Usb";

mountPage(<UsbPage />);
