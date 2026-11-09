import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Streaming Income Foundations — A Practical Course for Independent Artists" },
      {
        name: "description",
        content:
          "Learn how music distribution, royalties, release planning and audience growth work in a practical online course for independent artists.",
      },
      { property: "og:title", content: "Streaming Income Foundations" },
      {
        property: "og:description",
        content:
          "A practical online course about music distribution, royalties and sustainable audience growth.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DynamicRenderer,
});

function DynamicRenderer() {
  const [search, setSearch] = useState<string | null>(null);

  useEffect(() => {
    setSearch(window.location.search);
  }, []);

  if (search === null) return null;

  return (
    <iframe
      src={`/w/index.html${search}`}
      title="Streaming Income Foundations"
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
