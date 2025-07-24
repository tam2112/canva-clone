'use client';

import Link from 'next/link';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '../ui/sheet';
import Image from 'next/image';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { navLinks } from '@/constants';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';

export default function MobileNav() {
    const pathname = usePathname();

    return (
        <header className="header">
            <Link href={'/'} className="flex items-center gap-2 md:py-2">
                <Image src={'/assets/images/logo-text.svg'} alt="logo" width={180} height={28} />
            </Link>

            <nav className="flex gap-2">
                <SignedIn>
                    <UserButton afterSignOutUrl="/" />

                    <Sheet>
                        <SheetTrigger>
                            <Image
                                src={'/assets/icons/menu.svg'}
                                alt="menu"
                                width={32}
                                height={32}
                                className="cursor-pointer"
                            />
                        </SheetTrigger>
                        <SheetContent className="sheet-content sm:w-64">
                            <>
                                <SheetTitle className="mt-5 ml-5">
                                    <Image src={'/assets/images/logo-text.svg'} alt="logo" width={152} height={23} />
                                </SheetTitle>

                                <ul className="header-nav_elements">
                                    {navLinks.map((link) => {
                                        const isActive = link.route === pathname;

                                        return (
                                            <li
                                                key={link.label}
                                                className={`${
                                                    isActive && 'gradient-text'
                                                } flex p-1 whitespace-nowrap text-dark-700`}
                                            >
                                                <Link className="sidebar-link cursor-pointer" href={link.route}>
                                                    <Image src={link.icon} alt="icon" width={24} height={24} />
                                                    {link.label}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </>
                        </SheetContent>
                    </Sheet>
                </SignedIn>

                <SignedOut>
                    <Button asChild className="button bg-purple-gradient bg-cover">
                        <Link href={'/sign-in'}>Login</Link>
                    </Button>
                </SignedOut>
            </nav>
        </header>
    );
}
