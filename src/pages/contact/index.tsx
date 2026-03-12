import { useEffect } from "react";

export default function Contact() {
  useEffect(() => {
    document.title = "Contact — Property CRM";
    window.scroll(0, 0);
  });
  return (
    <p className="w-full text-2xl font-medium md:w-max text-heading">Contact</p>
  );
}
