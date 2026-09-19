export function normalizeLinkHref(value?: string | null): string | undefined {
  if (!value) return undefined;

  const raw = value.trim();
  if (!raw || raw.startsWith('#')) {
    return undefined;
  }

  if (/^(mailto:|tel:|https?:\/\/|\/\/)/i.test(raw)) {
    return raw;
  }

  if (/^[\w.+-]+@[\w.-]+\.[a-z]{2,}$/i.test(raw)) {
    return `mailto:${raw}`;
  }

  if (
    /^(?:[a-z0-9-]+\.)+[a-z]{2,}(?:[/?#].*)?$/i.test(raw) ||
    raw.startsWith('www.') ||
    /^(?:github|linkedin)\.com\//i.test(raw)
  ) {
    return `https://${raw}`;
  }

  return raw;
}
