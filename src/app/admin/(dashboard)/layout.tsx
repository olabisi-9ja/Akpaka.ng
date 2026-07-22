import React from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut } from "lucide-react";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any).role !== "admin") {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-charcoal text-white/80 hidden md:flex flex-col fixed inset-y-0 z-50">
        <div className="p-6">
          <Link href="/admin" className="font-serif text-2xl tracking-[0.1em] text-white">
            Akpaka.NG
          </Link>
          <div className="mt-1 text-xs text-gold/80 uppercase tracking-widest">Admin Portal</div>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-8">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 hover:text-white transition-colors">
            <LayoutDashboard className="w-5 h-5 text-gold" />
            <span>Dashboard</span>
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 hover:text-white transition-colors">
            <Package className="w-5 h-5 text-gold" />
            <span>Products</span>
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 hover:text-white transition-colors">
            <ShoppingCart className="w-5 h-5 text-gold" />
            <span>Orders & Commissions</span>
          </Link>
          <Link href="/admin/customers" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 hover:text-white transition-colors">
            <Users className="w-5 h-5 text-gold" />
            <span>Customers</span>
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 hover:text-white transition-colors">
            <Settings className="w-5 h-5 text-gold" />
            <span>Settings</span>
          </Link>
        </nav>

        <div className="p-4 mt-auto">
          <Link href="/api/auth/signout" className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/60 hover:bg-white/10 hover:text-white transition-colors">
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
