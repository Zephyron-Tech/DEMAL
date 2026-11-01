// URL slugs of the wood commodity pages. Kept free of image imports so src/proxy.ts can use it.
export const materialSlugs = ["stepka", "piliny", "pelety", "vedlejsi-produkty"] as const;

export type MaterialSlug = (typeof materialSlugs)[number];
