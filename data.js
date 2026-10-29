/* ALL DUMMY DATA — replace with your real brand, outlets and menu. */
const BRAND = {
  name: "Crumb & Co.",
  tagline: "Fresh-baked, ready when you are.",
  phone: "+91 90000 00000",
  email: "hello@example.com"
};

const OUTLETS = [
  { id: "jh", name: "Jubilee Hills", address: "Plot 12, Road No. 36, Jubilee Hills, Hyderabad 500033", phone: "+91 90000 00001", open: "08:00", close: "22:30" },
  { id: "bh", name: "Banjara Hills", address: "Shop 4, Road No. 12, Banjara Hills, Hyderabad 500034", phone: "+91 90000 00002", open: "08:00", close: "23:00" },
  { id: "gc", name: "Gachibowli", address: "Ground Floor, Tech Park Plaza, Gachibowli, Hyderabad 500032", phone: "+91 90000 00003", open: "07:30", close: "22:00" },
  { id: "mp", name: "Madhapur", address: "Unit 7, Ayyappa Society Main Road, Madhapur, Hyderabad 500081", phone: "+91 90000 00004", open: "08:00", close: "22:30" }
];

const CATEGORIES = [
  { id: "cakes", name: "Cakes" },
  { id: "pastries", name: "Pastries" },
  { id: "breads", name: "Breads" },
  { id: "savouries", name: "Savouries" },
  { id: "cookies", name: "Cookies" },
  { id: "drinks", name: "Drinks" }
];

const SIZES_CAKE = [
  { name: "500 g", delta: 0 },
  { name: "1 kg", delta: 550 }
];
const SIZES_DRINK = [
  { name: "Regular", delta: 0 },
  { name: "Large", delta: 40 }
];

const ITEMS = [
  // Cakes
  { id: "c1", cat: "cakes", name: "Dark Chocolate Truffle Cake", desc: "Layers of moist cocoa sponge and silky ganache.", price: 650, veg: true, emoji: "🍫", best: true, variants: SIZES_CAKE, addons: [{ name: "Eggless", price: 50 }, { name: "Candles & knife", price: 20 }], message: true },
  { id: "c2", cat: "cakes", name: "Red Velvet Cake", desc: "Cream cheese frosting over velvety red sponge.", price: 720, veg: true, emoji: "❤️", variants: SIZES_CAKE, addons: [{ name: "Eggless", price: 50 }, { name: "Candles & knife", price: 20 }], message: true },
  { id: "c3", cat: "cakes", name: "Pineapple Gateau", desc: "Light vanilla sponge, fresh cream and pineapple.", price: 560, veg: true, emoji: "🍍", variants: SIZES_CAKE, addons: [{ name: "Eggless", price: 50 }], message: true },
  { id: "c4", cat: "cakes", name: "Blueberry Cheesecake Slice", desc: "Baked New York style with blueberry compote.", price: 220, veg: true, emoji: "🫐" },
  // Pastries
  { id: "p1", cat: "pastries", name: "Butter Croissant", desc: "Flaky, golden, laminated 27 layers.", price: 120, veg: true, emoji: "🥐", best: true, addons: [{ name: "Warm it up", price: 0 }] },
  { id: "p2", cat: "pastries", name: "Almond Croissant", desc: "Filled with frangipane, topped with toasted almonds.", price: 160, veg: true, emoji: "🥐" },
  { id: "p3", cat: "pastries", name: "Chocolate Éclair", desc: "Choux pastry, vanilla custard, dark glaze.", price: 140, veg: true, emoji: "🍫" },
  { id: "p4", cat: "pastries", name: "Fruit Tart", desc: "Buttery shell, custard and seasonal fruit.", price: 180, veg: true, emoji: "🍓" },
  // Breads
  { id: "b1", cat: "breads", name: "Sourdough Loaf", desc: "48-hour ferment, crackly crust, tangy crumb.", price: 240, veg: true, emoji: "🍞", best: true, variants: [{ name: "Whole", delta: 0 }, { name: "Sliced", delta: 10 }] },
  { id: "b2", cat: "breads", name: "Multigrain Bread", desc: "Seven grains and seeds, no maida.", price: 130, veg: true, emoji: "🌾" },
  { id: "b3", cat: "breads", name: "Garlic Focaccia", desc: "Olive oil, roasted garlic and rosemary.", price: 150, veg: true, emoji: "🥖" },
  { id: "b4", cat: "breads", name: "Soft Dinner Rolls (6)", desc: "Pillowy butter rolls, perfect with curries.", price: 110, veg: true, emoji: "🥯" },
  // Savouries
  { id: "s1", cat: "savouries", name: "Chicken Puff", desc: "Crisp puff pastry with spiced chicken filling.", price: 90, veg: false, emoji: "🥟", best: true },
  { id: "s2", cat: "savouries", name: "Paneer Tikka Puff", desc: "Smoky paneer in flaky pastry.", price: 85, veg: true, emoji: "🥟" },
  { id: "s3", cat: "savouries", name: "Veg Sandwich", desc: "Grilled with cheese, pesto and crunchy veggies.", price: 160, veg: true, emoji: "🥪", addons: [{ name: "Extra cheese", price: 30 }] },
  { id: "s4", cat: "savouries", name: "Chicken Mayo Sandwich", desc: "Shredded chicken, herb mayo, lettuce.", price: 190, veg: false, emoji: "🥪", addons: [{ name: "Extra cheese", price: 30 }] },
  // Cookies
  { id: "k1", cat: "cookies", name: "Choco Chip Cookie", desc: "Chewy centre, crisp edges, big chocolate chunks.", price: 70, veg: true, emoji: "🍪", best: true },
  { id: "k2", cat: "cookies", name: "Oatmeal Raisin Cookie", desc: "Wholesome oats and plump raisins.", price: 65, veg: true, emoji: "🍪" },
  { id: "k3", cat: "cookies", name: "Cookie Box (6)", desc: "Assorted box of our favourite cookies.", price: 380, veg: true, emoji: "🎁" },
  { id: "k4", cat: "cookies", name: "Brownie", desc: "Fudgy walnut brownie, dusted with cocoa.", price: 110, veg: true, emoji: "🟫" },
  // Drinks
  { id: "d1", cat: "drinks", name: "Cappuccino", desc: "Double shot, velvety steamed milk.", price: 150, veg: true, emoji: "☕", variants: SIZES_DRINK, addons: [{ name: "Extra shot", price: 40 }, { name: "Oat milk", price: 50 }] },
  { id: "d2", cat: "drinks", name: "Cold Coffee", desc: "Blended, creamy and lightly sweet.", price: 170, veg: true, emoji: "🧋", variants: SIZES_DRINK, addons: [{ name: "Ice cream scoop", price: 40 }] },
  { id: "d3", cat: "drinks", name: "Masala Chai", desc: "Slow-simmered with ginger and cardamom.", price: 80, veg: true, emoji: "🫖" },
  { id: "d4", cat: "drinks", name: "Fresh Lime Soda", desc: "Sweet, salted or mixed.", price: 90, veg: true, emoji: "🍋", variants: [{ name: "Sweet", delta: 0 }, { name: "Salted", delta: 0 }, { name: "Mixed", delta: 0 }] }
];

const COUPONS = {
  CRUMB10: { type: "pct", value: 10, min: 300, max: 100, label: "10% off (up to ₹100) on orders above ₹300" },
  FIRST50: { type: "flat", value: 50, min: 250, label: "₹50 off on orders above ₹250" }
};

const GST_RATE = 0.05;      // dummy 5% GST
const PACKAGING_FEE = 10;   // flat per order
const PREP_MINUTES = 25;    // minimum prep time for ASAP pickup
