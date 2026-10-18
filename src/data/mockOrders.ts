import { Order } from "@/types";

export const MOCK_ORDERS: Order[] = [
  {
    id: "ord-98214",
    orderNumber: "SWD-2026-98214",
    date: "2026-03-24",
    items: [
      {
        productId: "prod-banarasi-katan-saree",
        productName: "Handwoven Banarasi Katan Pure Silk Saree",
        productImage:
          "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80",
        price: 18500,
        quantity: 1,
        selectedSize: "Free Size (5.5m + 0.8m Blouse Piece)",
        selectedColor: "Crimson Maroon",
        stateName: "Uttar Pradesh",
      },
      {
        productId: "prod-kolhapuri-leather-mojaris",
        productName: "Handcrafted T-Strap Antique Kolhapuri Leather Chappals",
        productImage:
          "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=400&q=80",
        price: 3200,
        quantity: 1,
        selectedSize: "UK 8",
        selectedColor: "Cognac Tan",
        stateName: "Maharashtra",
      },
    ],
    shippingAddress: {
      id: "addr-1",
      fullName: "Ananya Sharma",
      phone: "+91 98765 43210",
      street: "Flat 402, Nilgiri Heritage Heights, 12th Main Road, Indiranagar",
      landmark: "Near Defense Colony Club",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560038",
      addressType: "Home",
      isDefault: true,
    },
    paymentMethod: "UPI",
    subtotal: 21700,
    shippingFee: 0,
    discount: 2170, // SWADESH10 coupon
    total: 19530,
    status: "Shipped",
    trackingSteps: [
      { status: "Order Placed", date: "24 Mar 2026, 10:30 AM", completed: true },
      { status: "Confirmed", date: "24 Mar 2026, 11:15 AM", completed: true },
      { status: "Packed", date: "25 Mar 2026, 02:40 PM", completed: true },
      { status: "Shipped", date: "26 Mar 2026, 09:20 AM", completed: true, current: true },
      { status: "Out for Delivery", completed: false },
      { status: "Delivered", completed: false },
    ],
    trackingNumber: "SWD-EXP-78921045IN",
    carrier: "Artisan Express Logistics (Direct Loom Dispatch)",
    estimatedDelivery: "29 Mar 2026",
  },
  {
    id: "ord-97450",
    orderNumber: "SWD-2026-97450",
    date: "2026-02-18",
    items: [
      {
        productId: "prod-pashmina-kashmiri-shawl",
        productName: "Certified GI Pure Kashmiri Pashmina Sozni Shawl",
        productImage:
          "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=400&q=80",
        price: 29500,
        quantity: 1,
        selectedSize: "100cm x 200cm",
        selectedColor: "Natural Ivory",
        stateName: "Jammu and Kashmir",
      },
    ],
    shippingAddress: {
      id: "addr-1",
      fullName: "Ananya Sharma",
      phone: "+91 98765 43210",
      street: "Flat 402, Nilgiri Heritage Heights, 12th Main Road, Indiranagar",
      landmark: "Near Defense Colony Club",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560038",
      addressType: "Home",
      isDefault: true,
    },
    paymentMethod: "Credit / Debit Card",
    subtotal: 29500,
    shippingFee: 0,
    discount: 500,
    total: 29000,
    status: "Delivered",
    trackingSteps: [
      { status: "Order Placed", date: "18 Feb 2026, 04:12 PM", completed: true },
      { status: "Confirmed", date: "18 Feb 2026, 05:00 PM", completed: true },
      { status: "Packed", date: "19 Feb 2026, 11:30 AM", completed: true },
      { status: "Shipped", date: "20 Feb 2026, 08:45 AM", completed: true },
      { status: "Out for Delivery", date: "22 Feb 2026, 10:15 AM", completed: true },
      { status: "Delivered", date: "22 Feb 2026, 02:30 PM", completed: true, current: true },
    ],
    trackingNumber: "SWD-EXP-61245089IN",
    carrier: "Artisan Express Logistics",
    estimatedDelivery: "22 Feb 2026",
  },
];

export function getOrderById(id: string): Order | undefined {
  return MOCK_ORDERS.find((o) => o.id === id || o.orderNumber === id);
}
