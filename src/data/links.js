import { asset } from "../basePath.js";

/* Contact details and outbound links — taken from the résumé. */

export const profile = {
  name: "Yedida Sai Ram",
  shortName: "Sai Ram",
  role: "Unity / C# Game Developer",
  location: "Hyderabad, India",
  relocation: "Open to Bangalore / Pune",
  email: "sairamyedidaoffl@gmail.com",
  phone: "+91 6309641235",
  // Works today with the .docx you sent. Export a PDF into /public and switch
  // this to the .pdf path before you start applying — recruiters prefer PDF.
  cv: asset("SaiRam_Yedida_Unity_Developer_Resume.docx"),
  availability: "Open to Unity developer roles — full-time or contract.",
};

export const socials = [
  { name: "GitHub", url: "https://github.com/sairamyedida06", handle: "sairamyedida06" },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/sairam-yedida-9b367a253/",
    handle: "sairam-yedida",
  },
  {
    name: "Google Play",
    url: "https://play.google.com/store/apps/developer?id=Rash+Gaming+Studios",
    handle: "Rash Gaming Studios",
  },
  { name: "YouTube", url: "https://youtube.com/@GameDevTeluguOffl", handle: "Game Dev Telugu" },
  { name: "itch.io", url: "[insert itch.io URL]", handle: "[insert handle]" },
];
