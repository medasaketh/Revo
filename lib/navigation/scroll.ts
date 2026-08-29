export function scrollToDashboardSection(sectionId: string) {
  const element = document.getElementById(sectionId);
  if (!element) return;

  element.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.replaceState(null, "", `/dashboard#${sectionId}`);
}

export function parseNavHref(href: string): { path: string; hash: string | null } {
  const [path, hash] = href.split("#");
  return { path, hash: hash || null };
}
