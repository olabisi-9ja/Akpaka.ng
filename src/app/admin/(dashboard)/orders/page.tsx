import React from "react";
import { db } from "@/lib/db";
import { Package, Search, ExternalLink } from "lucide-react";
import Link from "next/link";
import OrderStatusSelect from "./OrderStatusSelect";
import CommissionStatusSelect from "./CommissionStatusSelect";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  let orders: any[] = [];
  let commissions: any[] = [];
  try {
    const data = await Promise.all([
      db.order.findMany({
        orderBy: { createdAt: "desc" },
        include: { user: true, items: { include: { product: true } }, payment: true }
      }),
      db.commission.findMany({
        orderBy: { createdAt: "desc" },
        include: { user: true, product: true }
      })
    ]);
    orders = data[0];
    commissions = data[1];
  } catch (e) {
    console.error("Database connection failed on Vercel Serverless for orders:", e);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif text-charcoal">Orders & Commissions</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Direct Orders Table */}
        <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-border overflow-hidden">
          <div className="p-6 border-b border-border bg-[#FAF9F6]">
            <h2 className="text-xl font-serif text-charcoal">Standard Orders</h2>
            <p className="text-sm text-charcoal/60 mt-1">Ready-to-wear and in-stock purchases</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#FAF9F6] text-charcoal/60 border-b border-border">
                <tr>
                  <th className="px-6 py-4 font-medium">Order Details</th>
                  <th className="px-6 py-4 font-medium">Customer</th>
                  <th className="px-6 py-4 font-medium">Amount</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#FAF9F6]/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-charcoal">
                        {order.items.map(i => `${i.quantity}x ${i.product.name}`).join(", ")}
                      </div>
                      <div className="text-xs text-charcoal/50 mt-1">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-charcoal">{order.customerName}</div>
                      <div className="text-xs text-charcoal/60">{order.customerEmail}</div>
                    </td>
                    <td className="px-6 py-4 text-charcoal font-medium">
                      {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(order.totalAmount)}
                    </td>
                    <td className="px-6 py-4">
                      <OrderStatusSelect orderId={order.id} initialStatus={order.status} />
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-charcoal/60">
                      No standard orders yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Commissions Table */}
        <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-border overflow-hidden">
          <div className="p-6 border-b border-border bg-[#FAF9F6]">
            <h2 className="text-xl font-serif text-charcoal">Bespoke Commissions</h2>
            <p className="text-sm text-charcoal/60 mt-1">Made-to-order and custom designs</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#FAF9F6] text-charcoal/60 border-b border-border">
                <tr>
                  <th className="px-6 py-4 font-medium">Commission Info</th>
                  <th className="px-6 py-4 font-medium">Customer</th>
                  <th className="px-6 py-4 font-medium">Stage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {commissions.map((comm) => (
                  <tr key={comm.id} className="hover:bg-[#FAF9F6]/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-charcoal">
                        {comm.product?.name || "Custom Design"}
                      </div>
                      <div className="text-xs text-charcoal/50 mt-1 flex gap-2 items-center">
                        {new Date(comm.createdAt).toLocaleDateString()}
                        {comm.depositPaid && <span className="text-green-600 font-medium bg-green-50 px-1.5 rounded">Deposit Paid</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-charcoal">{comm.customerName}</div>
                      <div className="text-xs text-charcoal/60">{comm.customerEmail}</div>
                      <div className="text-xs text-charcoal/60">{comm.customerPhone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <CommissionStatusSelect commissionId={comm.id} initialStatus={comm.status} />
                    </td>
                  </tr>
                ))}
                {commissions.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-charcoal/60">
                      No commissions yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
