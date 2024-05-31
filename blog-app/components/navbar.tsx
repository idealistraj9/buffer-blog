"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export const Navbar = () => {

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <span className="text-[25px]">💡 </span>
            <p className="text-[23px] font-extralight text-black">Buffer</p>
          </NextLink>
        </NavbarBrand>
        <div className="hidden lg:inline-block md:inline-block">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
        <Link href="/write/new" className="text-secondary hidden lg:inline-block md:inline-block">Create New Post</Link>
        <Link href="/user/blogs" className="text-secondary hidden lg:inline-block md:inline-block">My Blogs</Link>
        <ul className="hidden lg:flex gap-4 justify-start ml-2 ">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href} className="">
              <NextLink
                className={clsx(
                  linkStyles({ color: "secondary" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium  text-2xl",
                )}
                color="black"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2 bg-transparent text-black p-2 rounded-xl" >
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="pl-5">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
        <div className="mx-4 mt-2 flex flex-col gap-2 text-secondary">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                href={item.href}
              >
                <span className="text-lg">
                  {item.label}
                </span>
              </Link>
            </NavbarMenuItem>

          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
