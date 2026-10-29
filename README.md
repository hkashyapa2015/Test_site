# Crumb & Co. — take-away ordering site (demo)

A static multipage site: no build step, no backend. Upload the folder to any static host (Netlify, Vercel, GitHub Pages, S3, your own server) and open `index.html`.

## Pages
- `index.html` — home, categories, bestsellers
- `menu.html` — menu with search, category chips, veg filter, size/add-on dialog
- `outlets.html` — 4 dummy Hyderabad outlets, open/closed status, pick outlet
- `cart.html` — quantities, remove, coupon codes (CRUMB10, FIRST50), GST and packaging
- `checkout.html` — customer details, outlet, pickup slots, payment option (demo)
- `confirmation.html` — order number and receipt

## Replace the dummy content
Everything lives in `data.js`: brand name, outlets, categories, menu items (prices, veg flag, sizes, add-ons), coupons, GST rate, packaging fee and prep time. Colours are CSS variables at the top of `styles.css`. Item emojis stand in for photos; swap the `.thumb` block in `menu.html` for `<img>` tags when you have real photography.

## Before going live
- Cart and orders are stored in the browser's localStorage only. Orders are not sent anywhere.
- To take real orders, send the order object in `placeOrder()` (in `checkout.html`) to your backend, WhatsApp, email or a Google Sheet, and add a payment gateway such as Razorpay.
- Prices and totals are calculated in the browser; recompute them on your server before charging anyone.
