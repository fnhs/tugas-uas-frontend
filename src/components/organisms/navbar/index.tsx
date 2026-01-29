import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { clearAuth } from "@/lib/token";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HugeiconsIcon } from "@hugeicons/react";
import { Notification03Icon, Search01Icon } from "@hugeicons/core-free-icons";
import { FileText } from "lucide-react";

export const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        clearAuth();
        toast.success("Logged out successfully");
        navigate("/auth/signin");
    };

    return (
        <header className="px-4 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="container flex h-16 items-center gap-4">
                <Link to="/" className="mr-4 flex items-center space-x-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                        <FileText size={16} />
                    </div>
                    <span className="hidden text-lg font-bold sm:inline-block">
                        App - Document
                    </span>
                </Link>
                <div className="flex-1" />
                <div className="relative hidden w-full max-w-sm md:flex items-center">
                    <HugeiconsIcon
                        icon={Search01Icon}
                        size={16}
                        className="absolute left-3 text-muted-foreground"
                    />
                    <Input
                        type="search"
                        placeholder="Search for something..."
                        className="h-9 w-full rounded-full bg-muted/50 pl-9 focus-visible:bg-background"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="relative rounded-full">
                        <HugeiconsIcon icon={Notification03Icon} size={20} />
                        <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-600 ring-2 ring-background" />
                        <span className="sr-only">Notifications</span>
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                                <Avatar className="h-10 w-10 border">
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end" forceMount>
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">Sahar Rezazadeh</p>
                                    <p className="text-xs leading-none text-muted-foreground">
                                        m@example.com
                                    </p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => navigate("/profile")}>
                                Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                Settings
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
};
