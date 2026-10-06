// ABOUTME: The newsletter contract from MRF-website#101: where the form posts, the consent text stored with each row, the thanks query.
// ABOUTME: Kept apart from the form component so that file exports only components.

export const ACTION = "https://michaelrishiforrester.com/api/newsletter/subscribe";

/** Stored with the subscriber's row, so it must stay word for word what MRF-website#101 specifies. */
export const CONSENT = "Yes, email me about these talks and future writing. One list, no sharing, and every email carries an unsubscribe link.";

export function subscribed(search: string): boolean {
  return new URLSearchParams(search).get("subscribed") === "1";
}
