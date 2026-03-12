import { useEffect } from "react";

export default function BusinessIntelligence() {
  useEffect(() => {
    document.title = "BI — Property CRM";
    window.scroll(0, 0);
  });
  return (
    <p className="w-full text-2xl font-medium md:w-max text-heading">
      Business Intelligence
    </p>
  );
}
