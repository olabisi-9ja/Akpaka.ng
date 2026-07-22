import React from "react";
import { db } from "@/lib/db";
import ProductForm from "./ProductForm";

export const dynamic = "force-dynamic";

export default async function AdminProductEditPage({
  params,
}: {
  params: { id: string };
}) {
  const isNew = params.id === "new";
  
  let product = null;
  if (!isNew) {
    product = await db.product.findUnique({
      where: { id: params.id },
    });
  }

  return (
    <div>
      <h1 className="text-3xl font-serif text-charcoal mb-8">
        {isNew ? "Add New Product" : "Edit Product"}
      </h1>
      
      <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-border p-6">
        <ProductForm initialData={product} />
      </div>
    </div>
  );
}
