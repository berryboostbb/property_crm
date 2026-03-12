import { useEffect } from "react";

export default function Leads() {
  useEffect(() => {
    document.title = "Leads — Property CRM";
    window.scroll(0, 0);
  });
  return (
    <p className="w-full text-2xl font-medium md:w-max text-heading">Leads</p>
  );
}
