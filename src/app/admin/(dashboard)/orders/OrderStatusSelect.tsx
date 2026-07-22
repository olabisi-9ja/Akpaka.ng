"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const ORDER_STATUSES = ["pending", "confirmed", "processing", "shipped", "delivered"];

export default function OrderStatusSelect({ orderId, initialStatus }: { orderId: string, initialStatus: string }) {
  const router = useRouter();
  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    setLoading(true);

    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (res.ok) {
        router.refresh();
      } else {
        alert("Failed to update status");
        setStatus(initialStatus);
      }
    } catch (err) {
      alert("Failed to update status");
      setStatus(initialStatus);
    } finally {
      setLoading(false);
    }
  };

  return (
    <select 
      value={status} 
      onChange={handleChange}
      disabled={loading}
      className={`px-3 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider outline-none cursor-pointer border border-transparent hover:border-border transition-colors
        ${status === 'delivered' ? 'bg-green-100 text-green-700' : 
          status === 'shipped' ? 'bg-blue-100 text-blue-700' : 
          'bg-orange-100 text-orange-700'}`}
    >
      {ORDER_STATUSES.map(s => (
        <option key={s} value={s}>{s.replace("_", " ")}</option>
      ))}
    </select>
  );
}
