"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "../components/Sidebar";
import { Topbar } from "../components/Topbar";
import { Dashboard } from "../components/Dashboard";
import { Products } from "../components/Products";
import { ProductDetail } from "../components/ProductDetail";
import { ProductDrawer } from "../components/ProductDrawer";
import { Orders } from "../components/Orders";
import { Messages } from "../components/Messages";
import { Analytics } from "../components/Analytics";
import { useMarketplaceStore } from "../stores/useMarketplaceStore";

export function HomePage() {
  const [currentView, setCurrentView] = useState("dashboard");
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const { sidebarOpen } = useMarketplaceStore();

  const handleNavigate = (view: string, productId?: string) => {
    setCurrentView(view);
    if (productId) {
      setSelectedProductId(productId);
    } else {
      setSelectedProductId(null);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentView]);

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen overflow-hidden">
        <Sidebar currentView={currentView} onNavigate={handleNavigate} />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Topbar />

          <main className="flex-1 overflow-y-auto">
            <div className="container mx-auto px-6 py-8 max-w-7xl">
              {currentView === "dashboard" && <Dashboard />}
              {currentView === "products" && <Products onNavigate={handleNavigate} />}
              {currentView === "product-detail" && selectedProductId && (
                <ProductDetail productId={selectedProductId} onNavigate={handleNavigate} />
              )}
              {currentView === "orders" && <Orders />}
              {currentView === "messages" && <Messages />}
              {currentView === "analytics" && <Analytics />}
              {currentView === "settings" && (
                <div className="text-center py-16">
                  <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
                  <p className="text-muted-foreground">Settings page coming soon...</p>
                </div>
              )}
              {currentView === "profile" && (
                <div className="text-center py-16">
                  <h1 className="text-3xl font-bold text-foreground mb-2">Profile</h1>
                  <p className="text-muted-foreground">Profile page coming soon...</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      <ProductDrawer />
    </div>
  );
}
