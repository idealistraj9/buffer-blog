export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Next.js + NextUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
  ],
  navMenuItems: [
    {
      label: "Create New Post",
      href: "/write/new",
    },
    {
      label: "My Blogs",
      href: "/user/blogs",
    },
  ],
  
};
