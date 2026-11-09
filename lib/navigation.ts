import { navigation } from "@/content/company";
import { visiblePosts } from "@/content/blog";

export type NavItem = { label: string; href: string };

/**
 * The primary navigation, with "Journal" added once there is something in it
 * to read. In production that means the first published post; in development
 * and previews, drafts count.
 *
 * Built on the server and passed down to the header. The header is a client
 * component, and whether drafts show is decided by server-only environment
 * variables, so working it out there would disagree with the server render.
 */
export function primaryNav(): NavItem[] {
  const items: NavItem[] = [...navigation];
  if (visiblePosts().length > 0) {
    // Before Contact, which stays last.
    items.splice(items.length - 1, 0, { label: "Journal", href: "/blog" });
  }
  return items;
}
