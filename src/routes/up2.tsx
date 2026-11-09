import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/up2")({
  head: () => ({
    meta: [
      { title: "Netflix Previewer - Access Confirmed" },
      {
        name: "description",
        content:
          "Your Netflix Previewer access is confirmed. Open your dashboard to withdraw your balance.",
      },
      { property: "og:title", content: "Netflix Previewer - Access Confirmed" },
      {
        property: "og:description",
        content:
          "Your Netflix Previewer access is confirmed. Open your dashboard to withdraw your balance.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
    ],
  }),
  component: ThankYouPage,
});

function ThankYouPage() {
  const [search, setSearch] = useState<string | null>(null);

  useEffect(() => {
    setSearch(window.location.search);
  }, []);

  if (search === null) return null;

  return (
    <iframe
      src={`/sp/up2/index.html${search}`}
      title="Netflix Previewer - Access Confirmed"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        border: "none",
      }}
    />
  );
}
