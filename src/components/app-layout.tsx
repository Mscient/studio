
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  CalendarCheck,
  FilePlus,
  Users,
  Menu,
  MessageSquare,
  Siren,
  QrCode,
  FileText,
  Stethoscope,
  Pill,
  Video,
  BrainCircuit,
  LogOut,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AppLogo } from "./app-logo";

type NavItem = {
  href: string;
  icon: React.ElementType;
  label: string;
};

type AppLayoutProps = {
  children: React.ReactNode;
};

const doctorNavItems: NavItem[] = [
  { href: "/doctor/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/doctor/appointments", icon: CalendarCheck, label: "Appointments" },
  { href: "/doctor/patients", icon: Users, label: "My Patients" },
  { href: "/doctor/write-prescription", icon: FilePlus, label: "Write Prescription" },
  { href: "/doctor/scan-qr", icon: QrCode, label: "Scan Patient QR" },
  { href: "/doctor/documents", icon: FileText, label: "Documents" },
  { href: "/doctor/community", icon: MessageSquare, label: "Community" },
  { href: "/doctor/emergency", icon: Siren, label: "Emergency" },
];

const patientNavItems: NavItem[] = [
    { href: "/patient/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/patient/appointments", icon: CalendarCheck, label: "My Appointments" },
    { href: "/patient/prescriptions", icon: Pill, label: "My Prescriptions" },
    { href: "/patient/health-records", icon: FileText, label: "Health Records" },
    { href: "/patient/documents", icon: FileText, label: "My Documents" },
    { href: "/patient/book-appointment", icon: Stethoscope, label: "Book Doctor" },
    { href: "/patient/consult-online", icon: Video, label: "Consult Online" },
    { href: "/patient/detailed-analysis", icon: BrainCircuit, label: "AI Analysis" },
];

const getUserData = (role: 'patient' | 'doctor') => {
    if (role === 'doctor') {
        return {
            name: "Dr. Evelyn Reed",
            role: "doctor",
            avatarHint: "doctor professional"
        }
    }
    return {
        name: "John Patient",
        role: "patient",
        avatarHint: "happy man"
    }
}

export function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  
  const userRole = pathname.startsWith('/doctor') ? 'doctor' : 'patient';
  const userData = getUserData(userRole);
  const navItems = userRole === "doctor" ? doctorNavItems : patientNavItems;

  const handleLogout = async () => {
    router.push('/');
  }

  const NavContent = ({ isMobile = false }) => (
    <nav className={`flex flex-col items-start gap-2 px-2 ${isMobile ? 'sm:py-5 w-full' : 'py-4'}`}>
      <TooltipProvider>
        {navItems.map((item) => (
          <Tooltip key={item.href} delayDuration={0}>
            <TooltipTrigger asChild>
              <Link
                href={item.href}
                className={`flex items-center gap-4 px-2.5 w-full justify-start h-9 rounded-lg transition-colors 
                ${pathname.startsWith(item.href)
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                  }`}
                onClick={() => isMobile && setIsMobileMenuOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                <span className={isMobile ? 'block' : 'sr-only'}>{item.label}</span>
              </Link>
            </TooltipTrigger>
            {!isMobile && <TooltipContent side="right">{item.label}</TooltipContent>}
          </Tooltip>
        ))}
      </TooltipProvider>
    </nav>
  );

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <div className="flex h-14 items-center justify-center border-b px-2">
            <Link
              href="/"
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            >
             <AppLogo className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">HealthVision</span>
            </Link>
        </div>
        <nav className="flex flex-col items-center gap-4 px-2 py-4">
             {navItems.map((item) => (
              <TooltipProvider key={item.href}>
                <Tooltip>
                    <TooltipTrigger asChild>
                    <Link
                        href={item.href}
                        className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8
                        ${pathname.startsWith(item.href)
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                        <item.icon className="h-5 w-5" />
                        <span className="sr-only">{item.label}</span>
                    </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">{item.label}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:justify-end sm:border-0 sm:bg-transparent sm:px-6">
          <div className="flex items-center gap-2">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="sm:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="sm:max-w-xs p-0">
                <div className="flex h-14 items-center justify-between border-b px-4">
                    <Link
                        href="/"
                        className="flex items-center gap-2 font-semibold"
                    >
                        <AppLogo className="h-6 w-6 text-primary" />
                        <span>HealthVision</span>
                    </Link>
                </div>
                <NavContent isMobile={true} />
              </SheetContent>
            </Sheet>
            <Link href="/" className="sm:hidden flex items-center gap-2 font-semibold">
                <AppLogo className="h-7 w-7 text-primary" />
                <h1 className="text-xl font-semibold text-primary">HealthVision</h1>
            </Link>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <Avatar>
                  <AvatarImage src={`https://placehold.co/32x32.png`} data-ai-hint={userData.avatarHint} alt="User Avatar" />
                  <AvatarFallback>{userData.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{userData.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                 <Link href={userRole === 'patient' ? '/patient/profile' : '#'}>
                    <User className="mr-2" /> Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
               <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 cursor-pointer">
                <LogOut /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-4">
          {children}
        </main>
      </div>
    </div>
  );
}
