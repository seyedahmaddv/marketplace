import { cn } from '../lib/utils';
import { useMarketplaceStore } from '../stores/useMarketplaceStore';
import { LayoutDashboardIcon, PackageIcon, ShoppingCartIcon, MessageSquareIcon, BarChart3Icon, SettingsIcon, UserIcon, LogOutIcon, XIcon } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export function Sidebar({ currentView, onNavigate }: SidebarProps) {
  const { sidebarOpen, toggleSidebar } = useMarketplaceStore();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboardIcon },
    { id: 'products', label: 'Products', icon: PackageIcon },
    { id: 'orders', label: 'Orders', icon: ShoppingCartIcon },
    { id: 'messages', label: 'Messages', icon: MessageSquareIcon },
    { id: 'analytics', label: 'Analytics', icon: BarChart3Icon },
  ];

  const bottomItems = [
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
    { id: 'profile', label: 'Profile', icon: UserIcon },
  ];

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-900/50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      <aside
        className={cn(
          'fixed left-0 top-0 z-50 h-full bg-card border-r border-border transition-all duration-200 ease-in-out',
          sidebarOpen ? 'w-64' : 'w-0 lg:w-20',
          'lg:relative lg:z-auto'
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-6 border-b border-border">
            {sidebarOpen && (
              <>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-1" />
                  <span className="font-bold text-lg text-foreground">Marketplace</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleSidebar}
                  className="lg:hidden bg-transparent text-foreground hover:bg-muted hover:text-foreground"
                >
                  <XIcon className="w-5 h-5" strokeWidth={2} />
                </Button>
              </>
            )}
          </div>

          <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    if (window.innerWidth < 1024) {
                      toggleSidebar();
                    }
                  }}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ease-in-out cursor-pointer',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted hover:text-foreground'
                  )}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" strokeWidth={2} />
                  {sidebarOpen && (
                    <span className="font-normal text-sm">{item.label}</span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="px-3 pb-6 space-y-2">
            <Separator className="mb-4" />
            {bottomItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-foreground hover:bg-muted hover:text-foreground transition-all duration-200 ease-in-out cursor-pointer"
                >
                  <Icon className="w-5 h-5 flex-shrink-0" strokeWidth={2} />
                  {sidebarOpen && (
                    <span className="font-normal text-sm">{item.label}</span>
                  )}
                </button>
              );
            })}
            <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-foreground hover:bg-muted hover:text-foreground transition-all duration-200 ease-in-out cursor-pointer">
              <LogOutIcon className="w-5 h-5 flex-shrink-0" strokeWidth={2} />
              {sidebarOpen && (
                <span className="font-normal text-sm">Logout</span>
              )}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
