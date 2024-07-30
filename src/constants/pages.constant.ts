const PublicPages = {
    FLIGHTS: "/flights",
  };
  
  const ProtectedPages = {};
  
  export const PublicPagePathnames: string[] = Object.values(PublicPages);
  export const ProtectedPagePathnames: string[] = Object.values(ProtectedPages);
  
  export const Pages = Object.freeze({ ...PublicPages, ...ProtectedPages });
  export type PagesType = keyof typeof Pages;
  