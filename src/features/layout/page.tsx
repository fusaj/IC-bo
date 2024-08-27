import { ThemeProvider } from "@/components/theme/theme-provider";
import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import "./layout.css";
import { ModeToggle } from "@/components/theme/mode-toggle";
import UserNav from "./components/user-nav";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Sidebar from "./components/sidebar";

const Layout = () => {
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
          <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
            <Sidebar />
            <nav className="mt-auto flex  items-center gap-4 px-2 sm:py-4">
              <ModeToggle />
            </nav>
          </aside>
          <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            {/* <div className="lg:flex lg:items-center lg:justify-between">
            <div className="min-w-0 flex-1">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Back End Developer</h2>
            </div>
          </div>   */}

            <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
              {/* <Sheet>
                <SheetTrigger asChild> */}

              <div className="relative ml-auto flex-1 md:grow-0">
                <span
                  className="self-center text-4xl font-semibold whitespace-nowrap dark:text-white"
                  title="Ahora en React :D"
                >
                  Sistema Contable Integral
                </span>
              </div>

              {/* <Button size="icon" variant="outline" className="sm:hidden">
                    <PanelLeft className="size-5" />
                    <span className="sr-only">Toggle Menu</span>
                  </Button> */}
              {/* </SheetTrigger>
                <SheetContent side="left" className="sm:max-w-xs">
                  <nav className="grid gap-6 text-lg font-medium">
                    <Link
                      to="/"
                      className="group flex size-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                    >
                      <Landmark className="size-5 transition-all group-hover:scale-110" />
                      <span className="sr-only">Home</span>
                    </Link>
                    {navigationStart.map((item) => (
                      <Link
                        key={item.name}
                        to={item.to}
                        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                      >
                        {item.icon}
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet> */}
              {/* <Breadcrumb className="hidden md:flex">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to="/dashboard">Dashboard</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to="/tasks">Tasks</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Recent Tasks</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb> */}
              <div className="relative ml-auto flex-1 md:grow-0">
                {/* <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                /> */}
                <UserNav />
              </div>
            </header>
            <Outlet />
          </div>
        </div>
      </ThemeProvider>
      <ReactQueryDevtools buttonPosition="bottom-right" />
      <TanStackRouterDevtools position="bottom-left" />
    </>
  );
};

export default Layout;
