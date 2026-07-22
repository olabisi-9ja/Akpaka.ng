import React from "react";
import Link from "next/link";
import { db } from "@/lib/db";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  let products: any[] = [];
  try {
    products = await db.product.findMany({
      orderBy: { createdAt: "desc" },
      include: { collection: true }
    });
  } catch (e) {
    console.error("Database connection failed on Vercel Serverless for products:", e);
    // Dummy fallback for Vercel deployment preview if SQLite fails
    products = [
      {
        id: "demo-1",
        name: "The Chief Executive Oxford",
        category: "shoes",
        price: 150000,
        currency: "NGN",
        stockStatus: "made-to-order",
        stockQuantity: null,
        images: "https://images.unsplash.com/photo-1614252339474-af3ec31d87f7?q=80&w=600",
        createdAt: new Date(),
      },
      {
        id: "demo-2",
        name: "Billionaire's Club Loafer",
        category: "shoes",
        price: 185000,
        currency: "NGN",
        stockStatus: "in-stock",
        stockQuantity: 4,
        images: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=600",
        createdAt: new Date(Date.now() - 86400000),
      }
    ];
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif text-charcoal">Products</h1>
        <Link href="/admin/products/new">
          <Button className="bg-charcoal text-white hover:bg-charcoal/90 flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Product
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#FAF9F6] text-charcoal/60 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-medium">Product Name</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium">Stock Status</th>
                <th className="px-6 py-4 font-medium">Quantity</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-[#FAF9F6]/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md bg-gray-200 overflow-hidden flex-shrink-0">
                        {product.images ? (
                          <img src={product.images.split(',')[0]} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-charcoal/10" />
                        )}
                      </div>
                      <span className="font-medium text-charcoal">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-charcoal/60 capitalize">{product.category}</td>
                  <td className="px-6 py-4 text-charcoal font-medium">
                    {new Intl.NumberFormat('en-NG', { style: 'currency', currency: product.currency }).format(product.price)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium uppercase tracking-wider
                      ${product.stockStatus === 'in-stock' ? 'bg-green-100 text-green-700' : 
                        product.stockStatus === 'made-to-order' ? 'bg-blue-100 text-blue-700' : 
                        'bg-orange-100 text-orange-700'}`}>
                      {product.stockStatus.replace(/-/g, " ")}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-charcoal/60">
                    {product.stockQuantity}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/products/${product.id}`}>
                        <button className="p-2 text-charcoal/60 hover:text-charcoal hover:bg-charcoal/5 rounded-md transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                      </Link>
                      <button className="p-2 text-red-500/60 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-charcoal/60">
                    No products found. Add your first product!
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
