"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ProductForm({ initialData }: { initialData: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    slug: initialData?.slug || "",
    description: initialData?.description || "",
    price: initialData?.price || 0,
    category: initialData?.category || "oxford",
    productType: initialData?.productType || "made-to-order",
    stockStatus: initialData?.stockStatus || "made-to-order",
    stockQuantity: initialData?.stockQuantity || 0,
    images: initialData?.images || "",
    baseLeather: initialData?.baseLeather || "",
    soleType: initialData?.soleType || "",
    published: initialData?.published ?? true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Auto-generate slug from name if creating a new product
    if (name === "name" && !initialData) {
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
      setFormData(prev => ({ ...prev, name: value, slug }));
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === "number" ? Number(value) : type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = initialData 
        ? `/api/admin/products/${initialData.id}` 
        : `/api/admin/products`;
      
      const method = initialData ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to save product");
      
      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Basic Info */}
        <div className="space-y-4">
          <h3 className="font-serif text-lg text-charcoal border-b border-border pb-2">Basic Details</h3>
          
          <div>
            <label className="block text-sm font-medium text-charcoal/80 mb-1.5">Product Name</label>
            <input name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2.5 rounded-lg border border-border outline-none text-charcoal bg-transparent" />
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal/80 mb-1.5">Slug (URL snippet)</label>
            <input name="slug" value={formData.slug} onChange={handleChange} required className="w-full px-4 py-2.5 rounded-lg border border-border outline-none text-charcoal/60 bg-gray-50" />
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal/80 mb-1.5">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required rows={4} className="w-full px-4 py-2.5 rounded-lg border border-border outline-none text-charcoal bg-transparent" />
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal/80 mb-1.5">Price (NGN)</label>
            <input name="price" type="number" min="0" value={formData.price} onChange={handleChange} required className="w-full px-4 py-2.5 rounded-lg border border-border outline-none text-charcoal bg-transparent" />
          </div>
        </div>

        {/* Inventory & Specs */}
        <div className="space-y-4">
          <h3 className="font-serif text-lg text-charcoal border-b border-border pb-2">Inventory & Category</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-charcoal/80 mb-1.5">Category</label>
              <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-border outline-none text-charcoal bg-transparent">
                <option value="oxford">Oxford</option>
                <option value="loafer">Loafer</option>
                <option value="boot">Boot</option>
                <option value="wedding">Wedding / Bridal</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal/80 mb-1.5">Stock Status</label>
              <select name="stockStatus" value={formData.stockStatus} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-border outline-none text-charcoal bg-transparent">
                <option value="in-stock">In Stock</option>
                <option value="made-to-order">Made to Order</option>
                <option value="bespoke-only">Bespoke Only</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal/80 mb-1.5">Stock Quantity</label>
            <input name="stockQuantity" type="number" min="0" value={formData.stockQuantity} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-border outline-none text-charcoal bg-transparent" />
            <p className="text-xs text-charcoal/50 mt-1">If "Made to Order", you can leave this at 0.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-charcoal/80 mb-1.5">Base Leather</label>
              <input name="baseLeather" value={formData.baseLeather} onChange={handleChange} placeholder="e.g. Calfskin" className="w-full px-4 py-2.5 rounded-lg border border-border outline-none text-charcoal bg-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal/80 mb-1.5">Sole Type</label>
              <input name="soleType" value={formData.soleType} onChange={handleChange} placeholder="e.g. Blake Stitched Leather" className="w-full px-4 py-2.5 rounded-lg border border-border outline-none text-charcoal bg-transparent" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal/80 mb-1.5">Image URLs (comma separated)</label>
            <input name="images" value={formData.images} onChange={handleChange} placeholder="/images/products/shoe1.jpg, /images/products/shoe2.jpg" className="w-full px-4 py-2.5 rounded-lg border border-border outline-none text-charcoal bg-transparent" />
          </div>

          <div className="flex items-center gap-3 pt-4">
            <input type="checkbox" id="published" name="published" checked={formData.published} onChange={handleChange} className="w-5 h-5 accent-gold cursor-pointer" />
            <label htmlFor="published" className="text-sm font-medium text-charcoal/80 cursor-pointer">Published to Store</label>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-8 border-t border-border">
        <Button type="button" onClick={() => router.push("/admin/products")} className="bg-transparent border border-border text-charcoal hover:bg-charcoal/5">
          Cancel
        </Button>
        <Button type="submit" disabled={loading} className="bg-charcoal text-white hover:bg-charcoal/90 px-8">
          {loading ? "Saving..." : initialData ? "Update Product" : "Create Product"}
        </Button>
      </div>
    </form>
  );
}
