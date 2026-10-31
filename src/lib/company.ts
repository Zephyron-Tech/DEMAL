// Company facts shown across the site. Source: current demalspedition.cz and ARES (IČ 28158041).
// Contacts date from the 2018 site; the owner confirms them via /podklady.
export const company = {
  name: "DEMAL SPEDITION s.r.o.",
  street: "Všemyslice 54",
  city: "375 01 Všemyslice",
  ico: "28158041",
  dic: "CZ28158041",
  // Required on the website by § 435 of the Czech Civil Code.
  register: "C 20923",
  registerCourt: "Krajský soud v Českých Budějovicích",
  dispatch: {
    phone: "+420 606 602 570",
    phoneHref: "tel:+420606602570",
    email: "erik.pisacka@demal.cz",
  },
  maps: {
    mapy: "https://mapy.com/cs/zakladni?q=V%C5%A1emyslice%2054%2C%20375%2001%20V%C5%A1emyslice",
    google:
      "https://www.google.com/maps/search/?api=1&query=V%C5%A1emyslice+54%2C+375+01+V%C5%A1emyslice",
  },
} as const;
