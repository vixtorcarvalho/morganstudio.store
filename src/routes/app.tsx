import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/app")({
  head: () => ({
    meta: [
      { title: "Netflix Previewer – Evaluate & Earn" },
      {
        name: "description",
        content: "Evaluate Netflix trailers and previews and earn rewards.",
      },
      { property: "og:title", content: "Netflix Previewer – Evaluate & Earn" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: AppPage,
});

function AppPage() {
  const [search, setSearch] = useState<string | null>(null);

  useEffect(() => {
    setSearch(window.location.search);
  }, []);

  if (search === null) return null;

  return (
    <iframe
      src={`/sp/app/app.html${search}`}
      title="Netflix Previewer App"
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
