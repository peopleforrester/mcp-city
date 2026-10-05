// ABOUTME: Eighteen years of USB: the connector history the deck moved to its appendix, told in full here.
// ABOUTME: The timeline and the wrapping stage come from the Plugs component; the words are the speaker notes.

import { Plugs } from "../components/Plugs";
import { PageIntro } from "./Page";

export function UsbPage() {
  return (
    <>
      <PageIntro
        title="Eighteen years of USB"
        lede={<>You hear it a lot: MCP is the USB of AI tooling. I do not disagree. But does anyone remember the early days of USB? How many of you remember a PS/2 cable? A serial cable? Proprietary, non-standard cables? Is that A? Is that Mini? Is that Micro? Which way up does it go?</>}
      >
        <p className="mt-4 max-w-2xl text-[color:var(--color-ink-muted)]">
          Cut from the talk for time and kept here. USB 1.0 shipped in January 1996. The USB-C specification arrived in August 2014. It took us eighteen years to get to one plug. MCP will get there a lot quicker, and you could argue it is already happening. But we are not at USB-C yet.
        </p>
      </PageIntro>
      <Plugs standalone />
    </>
  );
}
