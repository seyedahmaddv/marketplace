import { BellIcon, MenuIcon, SearchIcon } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { useMarketplaceStore } from '../stores/useMarketplaceStore';

export function Topbar() {
  const { toggleSidebar } = useMarketplaceStore();

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-border bg-card">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center gap-4 flex-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="bg-transparent text-foreground hover:bg-muted hover:text-foreground"
          >
            <MenuIcon className="w-5 h-5" strokeWidth={2} />
          </Button>
          <div className="relative flex-1 max-w-md">
            <SearchIcon
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
              strokeWidth={2}
            />
            <Input
              type="search"
              placeholder="SearchIcon products, orders..."
              className="pl-10 bg-background text-foreground border-border"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="relative bg-transparent text-foreground hover:bg-muted hover:text-foreground"
          >
            <BellIcon className="w-5 h-5" strokeWidth={2} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full bg-transparent hover:bg-muted"
              >
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-gradient-1 text-primary-foreground">
                    AD
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-popover text-popover-foreground">
              <DropdownMenuLabel className="text-popover-foreground">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-popover-foreground hover:bg-muted cursor-pointer">
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="text-popover-foreground hover:bg-muted cursor-pointer">
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-popover-foreground hover:bg-muted cursor-pointer">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
