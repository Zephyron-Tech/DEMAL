// A template remounts on every navigation within the site, so the page rises in each time it
// changes, the same way the hero does on first load. The header and footer stay in the layout.
export default function SiteTemplate({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-1 flex-col motion-safe:animate-page-in">{children}</div>;
}
