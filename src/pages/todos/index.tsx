import { useEffect } from "react";

export default function Todos() {
  useEffect(() => {
    document.title = "Todos — Property CRM";
    window.scroll(0, 0);
  });
  return (
    <p className="w-full text-2xl font-medium md:w-max text-heading">Tasks</p>
  );
}
