// Openly licensed photographs from Wikimedia Commons used until the owner supplies the company's own.
// CC BY / CC BY-SA require naming the author, the licence and the source; shown in the footer.
export type PhotoCredit = {
  subject: string;
  creator: string;
  license: string;
  licenseUrl: string;
  page: string;
};

export const photoCredits: PhotoCredit[] = [
  {
    subject: "Europabrücke, Brenner",
    creator: "Rolf Kranz",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    page: "https://commons.wikimedia.org/wiki/File:Europabr%C3%BCcke_(Brenner_Autobahn_A13).jpg",
  },
  {
    subject: "Dřevní štěpka",
    creator: "Acabashi",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    page: "https://commons.wikimedia.org/wiki/File:Pine_wood_chips_at_Hatfield_Broad_Oak,_Essex,_England.jpg",
  },
  {
    subject: "Piliny",
    creator: "Robert Ashworth",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0",
    page: "https://commons.wikimedia.org/wiki/File:Sawdust_pile_at_BBQ_charcoal_factory_in_Springfield,_OR._(15108977618).jpg",
  },
  {
    subject: "Pelety",
    creator: "Amaza",
    license: "CC0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/deed.en",
    page: "https://commons.wikimedia.org/wiki/File:Holzpellets.jpg",
  },
  {
    subject: "Kulatina",
    creator: "Radomianin",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    page: "https://commons.wikimedia.org/wiki/File:Pine_log_cross-sections,_Teutendorf,_2016-09-17.jpg",
  },
];
