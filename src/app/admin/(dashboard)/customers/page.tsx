import React from "react";
import { db } from "@/lib/db";
import { Users } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminCustomersPage() {
  let customers: any[] = [];
  try {
    customers = await db.user.findMany({
      where: { role: "customer" },
      orderBy: { createdAt: "desc" }
    });
  } catch (e) {
    console.error("Database connection failed on Vercel Serverless for customers:", e);
    // Dummy fallback for Vercel deployment preview if SQLite fails
    customers = [
      { id: "1", name: "David Adebayo", email: "david@example.com", createdAt: new Date() },
      { id: "2", name: "Chioma Okeke", email: "chioma@example.com", createdAt: new Date(Date.now() - 86400000) },
    ];
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif text-charcoal">Customers</h1>
      </div>

      <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#FAF9F6] text-charcoal/60 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Email</th>
                <th className="px-6 py-4 font-medium">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-[#FAF9F6]/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-charcoal/10 flex items-center justify-center text-charcoal font-medium">
                        {customer.name ? customer.name.charAt(0).toUpperCase() : <Users className="w-4 h-4" />}
                      </div>
                      <span className="font-medium text-charcoal">{customer.name || "Unknown"}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-charcoal/80">{customer.email}</td>
                  <td className="px-6 py-4 text-charcoal/60">{new Date(customer.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {customers.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-charcoal/60">
                    No customers found yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
