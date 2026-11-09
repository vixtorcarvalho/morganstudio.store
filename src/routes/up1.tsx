import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/up1")({
  head: () => ({
    meta: [
      { title: "Netflix Previewer - Special Offer" },
      {
        name: "description",
        content: "Special offer for Netflix Previewer members.",
      },
      { property: "og:title", content: "Netflix Previewer - Special Offer" },
      {
        property: "og:description",
        content: "Special offer for Netflix Previewer members.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
    ],
  }),
  component: UpsellPage,
});

function UpsellPage() {
  const [search, setSearch] = useState<string | null>(null);

  useEffect(() => {
    setSearch(window.location.search);
  }, []);

  if (search === null) return null;

  return (
    <iframe
      src={`/sp/up1/index.html${search}`}
      title="Oferta Especial"
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
