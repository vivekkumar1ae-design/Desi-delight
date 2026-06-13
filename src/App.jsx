import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

// ============================================================
// SUPABASE CLIENT
// ============================================================
const supabase = createClient(
  "https://tamofyzunjjukdixkoft.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRhbW9meXp1bmpqdWtkaXhrb2Z0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyODg4MTIsImV4cCI6MjA5Njg2NDgxMn0.IX0MQNcCK0W94pxp0WkpuN2v3mdQNc6AVJ19HWsxDAo"
);

// ============================================================
// THEME TOKENS — Black / Dark Brown / Gold
// ============================================================
const T = {
  black:     "#0A0806",
  obsidian:  "#111009",
  brown:     "#1E1208",
  brownMid:  "#2E1A0A",
  brownLight:"#3D2210",
  gold:      "#C8972A",
  goldLight: "#E2B94B",
  goldPale:  "#F0D080",
  cream:     "#F5ECD7",
  muted:     "#7A6A55",
  white:     "#FFFFFF",
};

// ============================================================
// MENU DATA — 30 items, real Google Photos images
// ============================================================
const MENU = [
  // Starters
  { id:1,  cat:"Starters",    name:"Paneer Tikka",         price:399, desc:"Smoky grilled paneer with aromatic spices & mint chutney",       img:"https://lh3.googleusercontent.com/pw/AP1GczNP9xi0ATP2ZAQVQdmFtZSar_LyrW214V2jsEoERhff8rBtmIAsmmnyXhZBuc0fAXwDHQij_MRc3lEor6hjaste7cknyjw9464x3x53VwpF0N3shg=w600-h315-p-k", veg:true },
  { id:2,  cat:"Starters",    name:"Samosa (2 pcs)",       price:99,  desc:"Crispy golden pastry filled with spiced potato & peas",          img:"https://lh3.googleusercontent.com/pw/AP1GczMwv-ZRPCeb7flgQCWQWMKSG8h1L9BLFYaKsdZkWXNxy6j2MNls_zvKu0GEvMJxVN-BMlCOOM-X1w0sRzOOCMHmPwt9d_tgwwzmsjIhEyaYANAssg=w600-h315-p-k", veg:true },
  { id:3,  cat:"Starters",    name:"Dahi Bhalla",          price:199, desc:"Soft lentil dumplings in chilled yogurt with tamarind drizzle",   img:"https://lh3.googleusercontent.com/pw/AP1GczPSjooajX3dxDR147D6tGQS71_c7mJmkheo7oK28Gtiq200E39Icxhq8IjdVA1siPcxM-wRew27riSoKWIAIN-re_Vvt-fox8fm4XsYVg4FeXm_wWk=w600-h315-p-k", veg:true },
  { id:4,  cat:"Starters",    name:"Momos",                price:249, desc:"Steamed Himalayan dumplings with spicy red chilli dip",           img:"https://lh3.googleusercontent.com/pw/AP1GczN4t499MyIr6F--0WD7U6gbgW0dqgV8IhJtdU6dVq67rPYV3bYEmVVlKjTQxal2sPMmG0USfrTDrs8LPX7xbUp63ciWpKZMdXpHwQjAl_sDpvbOyuk=w600-h315-p-k", veg:true },
  { id:5,  cat:"Starters",    name:"Red Chilli Momos",     price:299, desc:"Fiery tossed momos in our secret red chilli sauce",              img:"https://lh3.googleusercontent.com/pw/AP1GczM2D_2-_YtM95_w132u2ljLQCfc3goQhZcDl91zwryGKX-QiVmfvJPBwcbTzUT3d-BH6h6agSod877bD2-PUkUP5ofIGNV-Y5PVpyK_BfYTCXCRg_8=w600-h315-p-k", veg:true },
  // Main Course
  { id:6,  cat:"Main Course", name:"Handi Chicken",        price:599, desc:"Slow-cooked chicken in a rich handi with whole spices",          img:"https://lh3.googleusercontent.com/pw/AP1GczMGgHdG4xIMdBFGkXKRzkMLS-5mEGQVdHVZY6rDzVlXDS150fWDvsP_K0x2SHJ_5xJDOHtZX-oDoBV67l4BBexv0mn72BuVAqSyTWn-b_GMk9F5zg=w600-h315-p-k", veg:false },
  { id:7,  cat:"Main Course", name:"Fried Chicken Leg Piece", price:349, desc:"Crispy golden fried chicken legs with house spice blend",    img:"https://lh3.googleusercontent.com/pw/AP1GczOJ4NRUOurJ9szrESAqb3i0OAw0EsWOVVvd3T-3WyraHM4bCbcT1LbvNuz5ixB6fbZh0w4MoW1bu2px4T16Drr_fVUVHymAicjqeBoHAaQNiF3V6Q=w600-h315-p-k", veg:false },
  { id:8,  cat:"Main Course", name:"Butter Chicken",       price:699, desc:"Velvety tomato-butter gravy with tender chicken — a classic",    img:"https://lh3.googleusercontent.com/pw/AP1GczNN4_UgTzrN-PEM9gyjxK0FFt7ipa1iEpGNWY6tJVo5j9_Fzj7SePyjcKCeZ_1hVl9GugX0IWLPQgWzZkSWRAz0d1cczVL64uVqnMRkZdv5z-vRkA=w600-h315-p-k", veg:false },
  { id:9,  cat:"Main Course", name:"Butter Paneer Masala", price:499, desc:"Silky paneer cubes in a luscious butter-tomato gravy",           img:"https://lh3.googleusercontent.com/pw/AP1GczMkxx2Jl1AakLpIVrpNJgem9pZqinVOG-zYqkrMGX77z3-X7yOLfkkhyl_UhOdtsvXOQs8ZMsWXI9qtUAbyEZNWCzGVeOF-mKwVn1m198AXJQRCKw=w600-h315-p-k", veg:true },
  { id:10, cat:"Main Course", name:"Dal Makhani",          price:449, desc:"Black lentils simmered overnight in butter & cream",             img:"https://lh3.googleusercontent.com/pw/AP1GczMHJFzmgwrcsTbPZ6wD2RwKWst8Nwvd-AtYGDucDAL7duOGeOQffXvml63Sp2T2RPBpODC11HTRqWfPxqzkWnVKCzB4l3olPGafqrqwzgang5MxuQ=w600-h315-p-k", veg:true },
  { id:11, cat:"Main Course", name:"Mutton Curry",         price:799, desc:"Tender mutton slow-braised in bold Bihari masala",               img:"https://lh3.googleusercontent.com/pw/AP1GczPGRu4PDO8LPDlgC5yyM0Q0wrtdSNoCHS_eQ5nISxADAuwF7spcHIDlDQTr-1fnudtiO1oVXX39PS2JcYIqIhupU0-1-1AIl6TpqOK8Vr9Oc2_11g=w600-h315-p-k", veg:false },
  { id:12, cat:"Main Course", name:"Palak Paneer",         price:499, desc:"Fresh spinach puree with golden paneer cubes & cream",           img:"https://lh3.googleusercontent.com/pw/AP1GczMhL0J19-WhKQKZkD4wlKtchKRVhWiCqqZindnuioNoKVVqYtNe0h13jHmog3SEt9xm5qImiojH83wrBTh_wGA9Io9e0R6W1KdPg02dEVpuZDp5MQ=w600-h315-p-k", veg:true },
  // Biryani
  { id:13, cat:"Biryani",     name:"Chicken Biryani",      price:499, desc:"Fragrant basmati layered with spiced chicken & saffron",         img:"https://lh3.googleusercontent.com/pw/AP1GczN2L6WAh_ApVFXeqKkAdJUaO7EGiUXwZSgo9c0aiB5hFzWxNseQBlaw3SIKKFFjPhmp-2werIwiPjYZ2sDEjgmMO4cw6mSkzBZ9I4vJI72XaWbASA=w600-h315-p-k", veg:false },
  { id:14, cat:"Biryani",     name:"Veg Biryani",          price:399, desc:"Aromatic basmati with seasonal vegetables & whole spices",       img:"https://lh3.googleusercontent.com/pw/AP1GczOdn0R0k-E5PWsJMmP9EFdNG-993-Kj9Ur31x13u4nqXFrQq_Kqg5FornetmbuEuSgVFACke92Jg0l1jifZbsJxnnodBfJ8vTYb5f8AUAEwoH_VoN8=w600-h315-p-k", veg:true },
  { id:15, cat:"Biryani",     name:"Mutton Biryani",       price:699, desc:"Royal dum biryani with fall-off-the-bone mutton pieces",         img:"https://lh3.googleusercontent.com/pw/AP1GczMh5tLVZVy98ajvPAQCvULPSuHWb67SA6MEAs4HsOdRBz4CWl2qvMVFIXZnjKHNdVGYxayH7l4Z7htnpoTNVdl8mGNkrKUewlevFcV1waKBA4Fm090=w600-h315-p-k", veg:false },
  // Breads & More
  { id:16, cat:"Breads & More", name:"Tandoori Roti",      price:45,  desc:"Whole wheat flatbread baked fresh in the tandoor",               img:"https://lh3.googleusercontent.com/pw/AP1GczNy8uwKdsgrrWV5F-TLlexf-AybXrNchh15Dwwp7ThhkYg5eFzN0RKMkespW5h0E6LXBPWI4_YsePXrfvfeOQXyh5vyM6OlhTBuUKWekUGgCheO1dI=w600-h315-p-k", veg:true },
  { id:17, cat:"Breads & More", name:"Chole Bhature",      price:249, desc:"Fluffy deep-fried bhature with spiced chickpea curry",           img:"https://lh3.googleusercontent.com/pw/AP1GczMA_vqP3SHhTY-lmVK8rtAv0s9nXkQUuEEKw-ecdrlsUjWaqDJ9xctx_ugVXQB0AFvlxs83xFCvbTLY34QYle06nbxQBBSH1wG0GEDtBNEMHXYt-qk=w600-h315-p-k", veg:true },
  { id:18, cat:"Breads & More", name:"Chole Kulche",       price:229, desc:"Soft kulcha bread with tangy chickpea masala",                   img:"https://lh3.googleusercontent.com/pw/AP1GczOyo0DxeraCk2kqfJT_HjBsIi4E7aycFujeOthl3EOMzqj60U6GqzZu4XAsUpW_tBrsWI_kp-X-JVAXvzyGf0kUlh0Oo1sKtokcNT6OlfHtPBzW1eY=w600-h315-p-k", veg:true },
  { id:19, cat:"Breads & More", name:"Idli Sambar",        price:199, desc:"Steamed rice cakes with piping hot lentil sambar & chutneys",    img:"https://lh3.googleusercontent.com/pw/AP1GczOPfAub2KO3ULrr9neZvz2CdfLZv4PxZOeYQ5dOLlcSppu5IFkc9vic9CO8RMMDUQjIvgosGQC0VgHABIv8Iqw4WYuxyj-ywI0kQWwJjihUiXZi_dM=w600-h315-p-k", veg:true },
  { id:20, cat:"Breads & More", name:"Masala Dosa",        price:299, desc:"Crispy rice crepe with spiced potato filling & sambar",          img:"https://lh3.googleusercontent.com/pw/AP1GczNxU7bR2kqB0Lhlh3LKwp5lOCUxbzMl00024OD_KkLeU2OizTTUCwRXo887X94dKThgiVtJnhh0QTZpowK6_4Ftxh9k_2palvs6m_lkSkc9etTrNmE=w600-h315-p-k", veg:true },
  // Chinese
  { id:21, cat:"Chinese",     name:"Chicken Fried Rice",   price:120, desc:"Wok-tossed basmati rice with chicken, egg & soy glaze",          img:"https://lh3.googleusercontent.com/pw/AP1GczOj2TUDDk7TfPwZphUBOeWhf3QRFte9ZcRgNniSR2qdHDe434MvzYotZJGLWpIYSu60Dv-ezdxl5xRRvy9wahIMBM4T91adwEKcX4a1FbVqCJ-BruY=w600-h315-p-k", veg:false },
  { id:22, cat:"Chinese",     name:"Burger",               price:90,  desc:"Juicy patty with fresh veggies in a toasted sesame bun",         img:"https://lh3.googleusercontent.com/pw/AP1GczNwmW8Zea2gpFBdfKpV1kRdeMLFyw877iis7FZf2MVyeimmGi3CTF9nKzBmQdU6A7NPSQR7EvQ5CCvf2aAxJ-ORVL_gf0Ykbk5e6F7isk-g3x4vzdk=w600-h315-p-k", veg:false },
  // Drinks
  { id:23, cat:"Drinks",      name:"Lassi",                price:199, desc:"Thick chilled yogurt drink — sweet & refreshing",                img:"https://lh3.googleusercontent.com/pw/AP1GczOZezhYPu_G3jt9gc3d93FZjou_tVlCplLINItM-EZ10yjB46iraUsGkbEK1PTr-VxfMDvqbXTihUkH62oLpO22zHfzttD8jnkajmbFjYpt8BbuWWg=w600-h315-p-k", veg:true },
  { id:24, cat:"Drinks",      name:"Masala Chai",          price:99,  desc:"Spiced Indian tea with ginger, cardamom & fresh milk",           img:"https://lh3.googleusercontent.com/pw/AP1GczPh5YUdrqlZjUkEDLRrc32ZFpP8zMPFossgSDasVeeY2Gdq9nDpT0aAVltCGWpQpSYvS4sf9ra7opB5hVmW2ldTZvLi1566oEmu_ar0xrGumjSURwU=w600-h315-p-k", veg:true },
  { id:25, cat:"Drinks",      name:"Thandai",              price:249, desc:"Chilled milk blended with nuts, rose & cooling spices",          img:"https://lh3.googleusercontent.com/pw/AP1GczNq9e1-o-dTJM9Ji4Xljkv05ferVC9Q2JU6mw86apyn_P7JrNVgnKn6W132skmCEuQeqSJ8iDRH2rr50AgBiyFlXKrIh07jQaZAaQcGiZW4TWQOQqw=w600-h315-p-k", veg:true },
  { id:26, cat:"Drinks",      name:"Aam Panna",            price:179, desc:"Raw mango cooler with cumin & mint — summer's finest",           img:"https://lh3.googleusercontent.com/pw/AP1GczN-BAZaGF4jL_PfI-lMFWFMts11TBJAP_AAgVHu8UVABR5NW3EmF-OkJTDjPLJObdDfnj9vvaPXBI2dNEiDxRcDvpPtEQD1DB29xagjTgUy4MagCDs=w600-h315-p-k", veg:true },
  // Desserts
  { id:27, cat:"Desserts",    name:"Malai Kulfi",          price:249, desc:"Frozen cream dessert with cardamom & saffron — old Delhi style", img:"https://lh3.googleusercontent.com/pw/AP1GczN-_DZbsBunC_b0QGkP3kF6DVQiQH6Ej4-6y_oHKKrG2cDPoJ0I8yXCadgvUIyEggLNBmPjKgasH8Bxa13FnRHnZMpjy9hdLsNpDJNMyKT5D549PXM=w600-h315-p-k", veg:true },
  { id:28, cat:"Desserts",    name:"Rasmalai",             price:299, desc:"Soft chenna discs soaked in saffron-cardamom rabri",             img:"https://lh3.googleusercontent.com/pw/AP1GczNUCz9_zthv6r4dziABMth2TMru_D0ilG19-b54bNKLzC_LcMu90TzSXGNwLH6tDmHpI6z9f4SSJ27VU3JLdsSmMOhUiLOIwLQHDvv1S4n94KV-Dbc=w600-h315-p-k", veg:true },
  { id:29, cat:"Desserts",    name:"Gulab Jamun (2 pcs)",  price:199, desc:"Melt-in-mouth milk dumplings drenched in rose-cardamom syrup",   img:"https://lh3.googleusercontent.com/pw/AP1GczMccE78SKOB-Eb7nfvIK1BM_IV9kWGtzdUDqu4JavJ5X2u2TC_Wprhz9rn1aMECC-BAmmpI2F7p6JyvTVOzqCeHOllHpYaGG8eiCcRd2hPHpTT9lss=w600-h315-p-k", veg:true },
  { id:30, cat:"Desserts",    name:"Rabri Kheer",          price:299, desc:"Slow-simmered rice pudding topped with thickened rabri cream",   img:"https://lh3.googleusercontent.com/pw/AP1GczNZqZAdnyEO2MsmZzgDG4EIozJYquWp_3qQ8PYshn6J1haXFATxPV3XtSoyXrMRUc8qOE1mbLIjqqKZ-yB4Ik8VYkjuFOLmfy0XTAk2QHxcB5MfaXU=w600-h315-p-k", veg:true },
];

const CATS = ["All", ...Array.from(new Set(MENU.map(i => i.cat)))];

const TRACKING_STEPS = ["Order Placed", "Confirmed", "Preparing", "Out for Delivery", "Delivered"];

const SAMPLE_REVIEWS = [
  { id:1, name:"Rahul Singh",  rating:5, comment:"Best biryani in Chhapra! Mutton was fall-off-the-bone tender. Will order again!", date:"10 Jun 2026" },
  { id:2, name:"Priya Sharma", rating:5, comment:"The butter chicken is heavenly. Premium experience at great value.", date:"8 Jun 2026" },
  { id:3, name:"Amit Kumar",   rating:4, comment:"Momos are absolutely delicious. Fast delivery too!", date:"5 Jun 2026" },
];

// ============================================================
// GLOBAL STYLES
// ============================================================
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Inter:wght@300;400;500;600&family=DM+Sans:wght@300;400;500&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --black:      #0A0806;
      --obsidian:   #111009;
      --brown:      #1E1208;
      --brownMid:   #2E1A0A;
      --brownLight: #3D2210;
      --gold:       #C8972A;
      --goldLight:  #E2B94B;
      --goldPale:   #F0D080;
      --cream:      #F5ECD7;
      --muted:      #7A6A55;
      --white:      #FFFFFF;
    }

    html { scroll-behavior: smooth; }

    body {
      background: var(--black);
      color: var(--cream);
      font-family: 'DM Sans', sans-serif;
      font-weight: 300;
      line-height: 1.6;
      overflow-x: hidden;
    }

    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: var(--brown); }
    ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 2px; }

    .display { font-family: 'Playfair Display', serif; }
    .serif { font-family: 'Playfair Display', serif; }

    .gold { color: var(--gold); }
    .gold-light { color: var(--goldLight); }
    .muted { color: var(--muted); }
    .cream { color: var(--cream); }

    /* Gold divider line */
    .gold-line {
      width: 60px; height: 1px;
      background: linear-gradient(90deg, transparent, var(--gold), transparent);
      margin: 0 auto;
    }

    /* Shimmer animation for skeleton */
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }

    /* Fade in up */
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .fade-in { animation: fadeInUp 0.6s ease both; }

    /* Gold glow button */
    .btn-gold {
      background: linear-gradient(135deg, var(--gold), var(--goldLight));
      color: var(--black);
      border: none;
      font-family: 'DM Sans', sans-serif;
      font-weight: 600;
      font-size: 14px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: 12px 28px;
      border-radius: 2px;
      cursor: pointer;
      transition: all 0.25s ease;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    .btn-gold:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(200,151,42,0.35);
    }
    .btn-gold:active { transform: translateY(0); }

    .btn-outline {
      background: transparent;
      color: var(--gold);
      border: 1px solid var(--gold);
      font-family: 'DM Sans', sans-serif;
      font-weight: 500;
      font-size: 13px;
      letter-spacing: 0.06em;
      padding: 10px 22px;
      border-radius: 2px;
      cursor: pointer;
      transition: all 0.25s ease;
    }
    .btn-outline:hover {
      background: var(--gold);
      color: var(--black);
    }

    .btn-ghost {
      background: transparent;
      color: var(--muted);
      border: none;
      font-family: 'DM Sans', sans-serif;
      font-size: 13px;
      cursor: pointer;
      padding: 8px 16px;
      border-radius: 2px;
      transition: color 0.2s;
    }
    .btn-ghost:hover { color: var(--cream); }

    /* Card base */
    .card {
      background: var(--brown);
      border: 1px solid rgba(200,151,42,0.12);
      border-radius: 4px;
      overflow: hidden;
      transition: all 0.3s ease;
    }
    .card:hover {
      border-color: rgba(200,151,42,0.35);
      transform: translateY(-3px);
      box-shadow: 0 12px 32px rgba(0,0,0,0.5);
    }

    /* Input */
    .input {
      width: 100%;
      background: var(--brownMid);
      border: 1px solid rgba(200,151,42,0.2);
      color: var(--cream);
      font-family: 'DM Sans', sans-serif;
      font-size: 14px;
      padding: 12px 16px;
      border-radius: 2px;
      outline: none;
      transition: border-color 0.2s;
    }
    .input:focus { border-color: var(--gold); }
    .input::placeholder { color: var(--muted); }

    /* Toast */
    .toast {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--brownLight);
      border: 1px solid var(--gold);
      color: var(--cream);
      padding: 12px 24px;
      border-radius: 2px;
      font-size: 14px;
      z-index: 9999;
      animation: fadeInUp 0.3s ease both;
    }

    /* Nav */
    nav {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 100;
      background: rgba(10,8,6,0.92);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(200,151,42,0.15);
    }

    /* Section spacing */
    .section { padding: 80px 24px; max-width: 1100px; margin: 0 auto; }
    @media (max-width: 640px) { .section { padding: 56px 16px; } }

    /* Grid */
    .menu-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 20px;
    }
    @media (max-width: 480px) {
      .menu-grid { grid-template-columns: 1fr 1fr; gap: 12px; }
    }

    /* Star */
    .star { color: var(--gold); font-size: 14px; }
    .star.empty { color: var(--muted); }

    /* Badge */
    .badge-veg {
      display: inline-block;
      width: 12px; height: 12px;
      border: 1.5px solid #22c55e;
      border-radius: 1px;
      position: relative;
    }
    .badge-veg::after {
      content: '';
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%,-50%);
      width: 6px; height: 6px;
      background: #22c55e;
      border-radius: 50%;
    }
    .badge-nonveg {
      display: inline-block;
      width: 12px; height: 12px;
      border: 1.5px solid #ef4444;
      border-radius: 1px;
      position: relative;
    }
    .badge-nonveg::after {
      content: '';
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%,-50%);
      width: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-bottom: 8px solid #ef4444;
      margin-top: -4px;
    }

    /* Tracking bar */
    .track-bar {
      display: flex;
      align-items: center;
      gap: 0;
      width: 100%;
      margin: 24px 0;
    }
    .track-step {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1;
      position: relative;
    }
    .track-dot {
      width: 24px; height: 24px;
      border-radius: 50%;
      border: 2px solid var(--muted);
      background: var(--brown);
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      transition: all 0.4s ease;
    }
    .track-dot.active {
      border-color: var(--gold);
      background: var(--gold);
      color: var(--black);
      box-shadow: 0 0 12px rgba(200,151,42,0.5);
    }
    .track-dot.done {
      border-color: var(--gold);
      background: var(--brownLight);
      color: var(--gold);
    }
    .track-line {
      position: absolute;
      top: 12px;
      left: 50%;
      width: 100%;
      height: 1px;
      background: var(--muted);
    }
    .track-line.done { background: var(--gold); }
    .track-label {
      font-size: 10px;
      color: var(--muted);
      margin-top: 6px;
      text-align: center;
      line-height: 1.2;
    }
    .track-label.active { color: var(--goldLight); }

    /* Admin table */
    table { width: 100%; border-collapse: collapse; }
    th { text-align: left; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--gold); padding: 10px 12px; border-bottom: 1px solid rgba(200,151,42,0.2); }
    td { padding: 10px 12px; font-size: 13px; border-bottom: 1px solid rgba(255,255,255,0.04); vertical-align: middle; }
    tr:hover td { background: rgba(200,151,42,0.04); }

    /* Category pills */
    .pill {
      background: transparent;
      border: 1px solid rgba(200,151,42,0.25);
      color: var(--muted);
      font-size: 12px;
      letter-spacing: 0.06em;
      padding: 6px 16px;
      border-radius: 100px;
      cursor: pointer;
      transition: all 0.2s;
      white-space: nowrap;
      font-family: 'DM Sans', sans-serif;
    }
    .pill:hover { border-color: var(--gold); color: var(--cream); }
    .pill.active { background: var(--gold); border-color: var(--gold); color: var(--black); font-weight: 600; }

    /* Scrollable pills */
    .pills-row {
      display: flex;
      gap: 8px;
      overflow-x: auto;
      padding-bottom: 4px;
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    .pills-row::-webkit-scrollbar { display: none; }

    /* Cart badge */
    .cart-badge {
      position: absolute;
      top: -6px; right: -6px;
      background: var(--gold);
      color: var(--black);
      font-size: 10px;
      font-weight: 700;
      width: 18px; height: 18px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Qty controls */
    .qty-ctrl {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .qty-btn {
      width: 28px; height: 28px;
      background: var(--brownLight);
      border: 1px solid rgba(200,151,42,0.3);
      color: var(--gold);
      font-size: 16px;
      border-radius: 2px;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: background 0.2s;
    }
    .qty-btn:hover { background: var(--gold); color: var(--black); }

    /* Page animation */
    .page { animation: fadeInUp 0.4s ease both; }

    /* Hero */
    .hero {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      position: relative;
      overflow: hidden;
      background: radial-gradient(ellipse at 60% 40%, #2E1A0A 0%, #111009 50%, #0A0806 100%);
    }
    .hero::before {
      content: '';
      position: absolute;
      inset: 0;
      background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C8972A' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    }
    .hero-content { position: relative; z-index: 1; padding: 24px; }
    .hero-eyebrow {
      font-size: 11px;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: var(--gold);
      margin-bottom: 20px;
    }
    .hero-title {
      font-family: 'Playfair Display', serif;
      font-size: clamp(52px, 12vw, 96px);
      font-weight: 900;
      line-height: 0.95;
      color: var(--cream);
      margin-bottom: 8px;
    }
    .hero-title span {
      display: block;
      color: var(--gold);
      font-style: italic;
      font-size: clamp(36px, 8vw, 64px);
    }
    .hero-sub {
      font-size: 15px;
      color: var(--muted);
      margin: 24px 0 40px;
      letter-spacing: 0.04em;
    }
    .hero-cta { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }

    /* Floating gold orb */
    .orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      pointer-events: none;
    }
    .orb-1 { width: 300px; height: 300px; background: rgba(200,151,42,0.08); top: 10%; right: 5%; }
    .orb-2 { width: 200px; height: 200px; background: rgba(200,151,42,0.05); bottom: 15%; left: 5%; }
  `}</style>
);

// ============================================================
// HELPERS
// ============================================================
const Stars = ({ n }) => (
  <span>{[1,2,3,4,5].map(i => <span key={i} className={i<=n?"star":"star empty"}>★</span>)}</span>
);

const VegBadge = ({ veg }) => (
  <span className={veg ? "badge-veg" : "badge-nonveg"} title={veg?"Veg":"Non-veg"} />
);

// ============================================================
// COMPONENTS
// ============================================================

// NAV
function Nav({ page, setPage, cartCount }) {
  const [open, setOpen] = useState(false);
  const links = [
    { key:"home", label:"Home" },
    { key:"menu", label:"Menu" },
    { key:"reserve", label:"Reserve" },
    { key:"track", label:"Track Order" },
    { key:"reviews", label:"Reviews" },
    { key:"admin", label:"Admin" },
  ];
  return (
    <nav>
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"0 24px", display:"flex", alignItems:"center", justifyContent:"space-between", height:64 }}>
        {/* Logo */}
        <button onClick={()=>setPage("home")} style={{ background:"none", border:"none", cursor:"pointer", textAlign:"left", display:"flex", alignItems:"center", gap:10 }}>
          {/* SVG Logo */}
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="19" cy="19" r="18" stroke="#C8972A" strokeWidth="1.2"/>
            <circle cx="19" cy="19" r="14" stroke="#C8972A" strokeOpacity="0.3" strokeWidth="0.6"/>
            {/* Thali plate */}
            <ellipse cx="19" cy="20" rx="9" ry="7" stroke="#C8972A" strokeWidth="1"/>
            {/* Spoon */}
            <path d="M13 12 Q11 15 13 17" stroke="#C8972A" strokeWidth="1.2" strokeLinecap="round"/>
            {/* Fork */}
            <path d="M25 12 L25 17 M23 12 L23 14 M25 12 L25 14 M27 12 L27 14" stroke="#C8972A" strokeWidth="1" strokeLinecap="round"/>
            {/* Star accent */}
            <path d="M19 8 L19.5 9.5 L21 9.5 L20 10.5 L20.5 12 L19 11 L17.5 12 L18 10.5 L17 9.5 L18.5 9.5 Z" fill="#C8972A"/>
          </svg>
          <div>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:700, color:"var(--gold)", letterSpacing:"0.02em" }}>Desi Delight</div>
            <div style={{ fontSize:9, letterSpacing:"0.25em", textTransform:"uppercase", color:"var(--muted)", marginTop:1 }}>Chhapra • Est. 2024</div>
          </div>
        </button>

        {/* Desktop nav */}
        <div style={{ display:"flex", gap:4, alignItems:"center" }} className="desktop-nav">
          {links.map(l => (
            <button key={l.key} onClick={()=>setPage(l.key)} className="btn-ghost"
              style={{ color: page===l.key ? "var(--gold)" : undefined, fontWeight: page===l.key ? 500 : 300 }}>
              {l.label}
            </button>
          ))}
          <button onClick={()=>setPage("cart")} style={{ position:"relative", background:"none", border:"none", cursor:"pointer", padding:"8px 12px", color:"var(--cream)", fontSize:20 }}>
            🛒
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>

        {/* Mobile: cart + hamburger */}
        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          <button onClick={()=>setPage("cart")} style={{ position:"relative", background:"none", border:"none", cursor:"pointer", padding:"8px", color:"var(--cream)", fontSize:20 }}>
            🛒
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
          <button onClick={()=>setOpen(o=>!o)} style={{ background:"none", border:"none", cursor:"pointer", color:"var(--gold)", fontSize:22, padding:4 }}>
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div style={{ background:"var(--obsidian)", borderTop:"1px solid rgba(200,151,42,0.15)", padding:"16px 24px" }}>
          {links.map(l => (
            <button key={l.key} onClick={()=>{ setPage(l.key); setOpen(false); }}
              style={{ display:"block", width:"100%", textAlign:"left", padding:"12px 0", background:"none", border:"none", cursor:"pointer",
                color: page===l.key ? "var(--gold)" : "var(--cream)", fontFamily:"'DM Sans',sans-serif", fontSize:15,
                borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
              {l.label}
            </button>
          ))}
        </div>
      )}

      <style>{`
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }
    @media (max-width: 640px) { .about-grid { grid-template-columns: 1fr; gap: 32px; } .about-grid svg { width: 120px; height: 120px; } }

    .desktop-nav { display: none !important; }
        @media (min-width: 768px) { .desktop-nav { display: flex !important; } }
      `}</style>
    </nav>
  );
}

// HERO / HOME
function Home({ setPage }) {
  return (
    <div className="page">
      <div className="hero">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="hero-content fade-in">
          <p className="hero-eyebrow">✦ Fine Dining Experience ✦</p>
          <h1 className="hero-title display">
            Desi
            <span>Delight</span>
          </h1>
          <p className="hero-sub">Authentic Indian flavours, crafted with love · Chhapra, Bihar</p>
          <div className="hero-cta">
            <button className="btn-gold" onClick={()=>setPage("menu")}>View Menu</button>
            <button className="btn-outline" onClick={()=>setPage("reserve")}>Reserve a Table</button>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div style={{ background:"var(--brown)", borderTop:"1px solid rgba(200,151,42,0.12)", borderBottom:"1px solid rgba(200,151,42,0.12)" }}>
        <div style={{ maxWidth:1100, margin:"0 auto", padding:"32px 24px", display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16, textAlign:"center" }}>
          {[["30+","Menu Items"],["1000+","Happy Customers"],["4.9 ★","Average Rating"]].map(([n,l])=>(
            <div key={l}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:28, fontWeight:700, color:"var(--gold)" }}>{n}</div>
              <div style={{ fontSize:12, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--muted)", marginTop:4 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured items */}
      <div className="section">
        <p style={{ fontSize:11, letterSpacing:"0.25em", textTransform:"uppercase", color:"var(--gold)", textAlign:"center", marginBottom:8 }}>Our Signature</p>
        <h2 className="display" style={{ fontSize:36, fontWeight:700, textAlign:"center", marginBottom:8 }}>Chef's Selection</h2>
        <div className="gold-line" style={{ marginBottom:48 }} />
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:20 }}>
          {MENU.filter(i=>[8,11,15,27].includes(i.id)).map(item=>(
            <div key={item.id} className="card" onClick={()=>setPage("menu")} style={{ cursor:"pointer" }}>
              <img src={item.img} alt={item.name} loading="lazy"
                style={{ width:"100%", height:160, objectFit:"cover", display:"block" }} />
              <div style={{ padding:"16px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:8 }}>
                  <span style={{ fontFamily:"'Playfair Display',serif", fontSize:16, fontWeight:600, lineHeight:1.3 }}>{item.name}</span>
                  <VegBadge veg={item.veg} />
                </div>
                <div style={{ marginTop:8, color:"var(--gold)", fontWeight:600, fontSize:15 }}>₹{item.price}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign:"center", marginTop:40 }}>
          <button className="btn-gold" onClick={()=>setPage("menu")}>Explore Full Menu</button>
        </div>
      </div>

      {/* About Us Section */}
      <div style={{ background:"var(--obsidian)", borderTop:"1px solid rgba(200,151,42,0.1)" }}>
        <div className="section" style={{ maxWidth:900 }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:48, alignItems:"center" }} className="about-grid">
            {/* Left — Logo large */}
            <div style={{ textAlign:"center" }}>
              <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Outer ring */}
                <circle cx="90" cy="90" r="88" stroke="#C8972A" strokeWidth="1.5"/>
                <circle cx="90" cy="90" r="80" stroke="#C8972A" strokeOpacity="0.2" strokeWidth="0.8"/>
                {/* Inner decorative ring */}
                <circle cx="90" cy="90" r="68" stroke="#C8972A" strokeOpacity="0.15" strokeWidth="0.6" strokeDasharray="4 4"/>
                {/* Thali */}
                <ellipse cx="90" cy="95" rx="44" ry="34" stroke="#C8972A" strokeWidth="1.5"/>
                <ellipse cx="90" cy="95" rx="36" ry="27" stroke="#C8972A" strokeOpacity="0.4" strokeWidth="0.8"/>
                {/* Small bowls on thali */}
                <circle cx="74" cy="90" r="8" stroke="#C8972A" strokeWidth="1"/>
                <circle cx="106" cy="90" r="8" stroke="#C8972A" strokeWidth="1"/>
                <ellipse cx="90" cy="106" rx="10" ry="6" stroke="#C8972A" strokeWidth="1"/>
                {/* Center rice/food mound */}
                <ellipse cx="90" cy="88" rx="12" ry="8" fill="#C8972A" fillOpacity="0.15" stroke="#C8972A" strokeWidth="0.8"/>
                {/* Spoon left */}
                <path d="M52 55 Q46 68 52 76" stroke="#C8972A" strokeWidth="2" strokeLinecap="round"/>
                <ellipse cx="52" cy="52" rx="5" ry="7" stroke="#C8972A" strokeWidth="1.5"/>
                {/* Fork right */}
                <line x1="128" y1="48" x2="128" y2="76" stroke="#C8972A" strokeWidth="2" strokeLinecap="round"/>
                <line x1="122" y1="48" x2="122" y2="58" stroke="#C8972A" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="134" y1="48" x2="134" y2="58" stroke="#C8972A" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M122 58 Q128 62 134 58" stroke="#C8972A" strokeWidth="1.2"/>
                {/* Top star */}
                <path d="M90 18 L92.5 25 L100 25 L94 30 L96.5 37 L90 32.5 L83.5 37 L86 30 L80 25 L87.5 25 Z" fill="#C8972A"/>
                {/* Bottom decorative dots */}
                <circle cx="70" cy="155" r="2" fill="#C8972A" fillOpacity="0.6"/>
                <circle cx="90" cy="160" r="2.5" fill="#C8972A"/>
                <circle cx="110" cy="155" r="2" fill="#C8972A" fillOpacity="0.6"/>
                {/* Text arc — DD initials */}
                <text x="90" y="145" textAnchor="middle" fontFamily="serif" fontSize="11" letterSpacing="8" fill="#C8972A" fillOpacity="0.7">DESI DELIGHT</text>
              </svg>
            </div>

            {/* Right — Story */}
            <div>
              <p style={{ fontSize:11, letterSpacing:"0.25em", textTransform:"uppercase", color:"var(--gold)", marginBottom:8 }}>Our Story</p>
              <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:32, fontWeight:700, marginBottom:8, lineHeight:1.2 }}>Crafted with Love,<br/><span style={{ color:"var(--gold)", fontStyle:"italic" }}>Served with Soul</span></h2>
              <div className="gold-line" style={{ margin:"16px 0", marginLeft:0 }} />
              <p style={{ fontSize:14, color:"var(--muted)", lineHeight:1.9, marginBottom:16 }}>
                It began in a small kitchen in Chhapra — not with a grand plan, but with a simple belief: that every person deserves to eat food made with real love.
              </p>
              <p style={{ fontSize:14, color:"var(--muted)", lineHeight:1.9, marginBottom:16 }}>
                Desi Delight was born from the hands of a family that grew up knowing the difference between food cooked for profit and food cooked from the heart. The aromas of slow-cooked dal, freshly ground spices, and tandoor-baked bread were not recipes to us — they were rituals passed down through generations.
              </p>
              <p style={{ fontSize:14, color:"var(--muted)", lineHeight:1.9, marginBottom:20 }}>
                We don't believe in shortcuts. Our mutton simmers for hours. Our biryani is dum-cooked the old way. Our desserts are made fresh, every single day.
              </p>
              <p style={{ fontFamily:"'Playfair Display',serif", fontSize:16, color:"var(--gold)", fontStyle:"italic" }}>
                "Desi Delight is not just a restaurant. It is Chhapra's own little celebration of Indian food."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Info strip */}
      <div style={{ background:"var(--brown)", borderTop:"1px solid rgba(200,151,42,0.12)" }}>
        <div style={{ maxWidth:1100, margin:"0 auto", padding:"48px 24px", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:32, textAlign:"center" }}>
          {[["🕐","Open Daily","11:00 AM – 11:00 PM"],["📍","Location","Station Road, Chhapra"],["📱","Order & Enquiry","WhatsApp us anytime"],["🚚","Home Delivery","Within 5 km radius"]].map(([e,t,s])=>(
            <div key={t}>
              <div style={{ fontSize:28, marginBottom:8 }}>{e}</div>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:15, color:"var(--gold)", marginBottom:4 }}>{t}</div>
              <div style={{ fontSize:13, color:"var(--muted)" }}>{s}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div style={{ background:"var(--brown)", borderTop:"1px solid rgba(200,151,42,0.12)" }}>
        <div className="section" style={{ maxWidth:900 }}>
          <p style={{ fontSize:11, letterSpacing:"0.25em", textTransform:"uppercase", color:"var(--gold)", textAlign:"center", marginBottom:8 }}>Get In Touch</p>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:36, fontWeight:700, textAlign:"center", marginBottom:8 }}>Contact Us</h2>
          <div className="gold-line" style={{ marginBottom:48 }} />
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:24 }}>
            <div style={{ background:"var(--brownMid)", border:"1px solid rgba(200,151,42,0.15)", borderRadius:4, padding:28, textAlign:"center" }}>
              <div style={{ fontSize:32, marginBottom:12 }}>📞</div>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:13, color:"var(--gold)", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:10 }}>Phone</div>
              <a href="tel:+918540868095" style={{ color:"var(--cream)", fontSize:16, fontWeight:500, textDecoration:"none" }}>+91 85408 68095</a>
              <div style={{ fontSize:12, color:"var(--muted)", marginTop:6 }}>Mon – Sun · 11 AM – 11 PM</div>
            </div>
            <div style={{ background:"var(--brownMid)", border:"1px solid rgba(200,151,42,0.15)", borderRadius:4, padding:28, textAlign:"center" }}>
              <div style={{ fontSize:32, marginBottom:12 }}>💬</div>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:13, color:"var(--gold)", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:10 }}>WhatsApp</div>
              <a href="https://wa.me/918540868095" target="_blank" rel="noreferrer" style={{ color:"var(--cream)", fontSize:16, fontWeight:500, textDecoration:"none" }}>+91 85408 68095</a>
              <div style={{ fontSize:12, color:"var(--muted)", marginTop:6 }}>Quick replies within minutes</div>
            </div>
            <div style={{ background:"var(--brownMid)", border:"1px solid rgba(200,151,42,0.15)", borderRadius:4, padding:28, textAlign:"center" }}>
              <div style={{ fontSize:32, marginBottom:12 }}>✉️</div>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:13, color:"var(--gold)", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:10 }}>Email</div>
              <a href="mailto:vivekkumarg28samelan@gmail.com" style={{ color:"var(--cream)", fontSize:12, fontWeight:500, textDecoration:"none", wordBreak:"break-all" }}>vivekkumarg28samelan@gmail.com</a>
              <div style={{ fontSize:12, color:"var(--muted)", marginTop:6 }}>We reply within 24 hours</div>
            </div>
            <div style={{ background:"var(--brownMid)", border:"1px solid rgba(200,151,42,0.15)", borderRadius:4, padding:28, textAlign:"center" }}>
              <div style={{ fontSize:32, marginBottom:12 }}>📍</div>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:13, color:"var(--gold)", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:10 }}>Location</div>
              <div style={{ color:"var(--cream)", fontSize:15, fontWeight:500 }}>Station Road</div>
              <div style={{ fontSize:13, color:"var(--muted)", marginTop:4 }}>Chhapra, Bihar, India</div>
            </div>
          </div>
          <div style={{ textAlign:"center", marginTop:40 }}>
            <a href="https://wa.me/918540868095?text=Hello%20Desi%20Delight!%20I%20would%20like%20to%20place%20an%20order." target="_blank" rel="noreferrer" style={{ textDecoration:"none" }}>
              <button className="btn-gold" style={{ fontSize:15, padding:"14px 36px" }}>💬 Chat on WhatsApp</button>
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background:"var(--obsidian)", borderTop:"1px solid rgba(200,151,42,0.1)", padding:"32px 24px", textAlign:"center" }}>
        <svg width="40" height="40" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom:8 }}>
          <circle cx="19" cy="19" r="18" stroke="#C8972A" strokeWidth="1.2"/>
          <ellipse cx="19" cy="20" rx="9" ry="7" stroke="#C8972A" strokeWidth="1"/>
          <path d="M13 12 Q11 15 13 17" stroke="#C8972A" strokeWidth="1.2" strokeLinecap="round"/>
          <path d="M25 12 L25 17 M23 12 L23 14 M25 12 L25 14 M27 12 L27 14" stroke="#C8972A" strokeWidth="1" strokeLinecap="round"/>
          <path d="M19 8 L19.5 9.5 L21 9.5 L20 10.5 L20.5 12 L19 11 L17.5 12 L18 10.5 L17 9.5 L18.5 9.5 Z" fill="#C8972A"/>
        </svg>
        <div style={{ fontFamily:"'Playfair Display',serif", fontSize:22, color:"var(--gold)", marginBottom:4 }}>Desi Delight</div>
        <div style={{ fontSize:12, color:"var(--muted)" }}>Station Road, Chhapra, Bihar · © 2026</div>
      </footer>
    </div>
  );
}

// MENU PAGE
function MenuPage({ addToCart, cart }) {
  const [activeCat, setActiveCat] = useState("All");
  const [vegOnly, setVegOnly] = useState(false);
  const [search, setSearch] = useState("");

  const items = MENU.filter(i => {
    if (activeCat !== "All" && i.cat !== activeCat) return false;
    if (vegOnly && !i.veg) return false;
    if (search && !i.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const qtyInCart = (id) => cart.filter(c=>c.id===id).length;

  return (
    <div className="page" style={{ paddingTop:80 }}>
      <div className="section">
        <p style={{ fontSize:11, letterSpacing:"0.25em", textTransform:"uppercase", color:"var(--gold)", marginBottom:8 }}>Explore</p>
        <h1 className="display" style={{ fontSize:40, fontWeight:700, marginBottom:8 }}>Our Menu</h1>
        <div className="gold-line" style={{ margin:"0 0 32px 0" }} />

        {/* Search + veg toggle */}
        <div style={{ display:"flex", gap:12, marginBottom:20, flexWrap:"wrap" }}>
          <input className="input" placeholder="Search dishes..." value={search}
            onChange={e=>setSearch(e.target.value)} style={{ flex:1, minWidth:180 }} />
          <button onClick={()=>setVegOnly(v=>!v)}
            className={vegOnly ? "btn-gold" : "btn-outline"}
            style={{ whiteSpace:"nowrap", fontSize:12 }}>
            🌿 Veg Only
          </button>
        </div>

        {/* Category pills */}
        <div className="pills-row" style={{ marginBottom:32 }}>
          {CATS.map(c => (
            <button key={c} className={`pill ${activeCat===c?"active":""}`} onClick={()=>setActiveCat(c)}>{c}</button>
          ))}
        </div>

        {/* Grid */}
        {items.length === 0 ? (
          <div style={{ textAlign:"center", padding:"60px 0", color:"var(--muted)" }}>No items found</div>
        ) : (
          <div className="menu-grid">
            {items.map(item => {
              const qty = qtyInCart(item.id);
              return (
                <div key={item.id} className="card">
                  <div style={{ position:"relative" }}>
                    <img src={item.img} alt={item.name} loading="lazy"
                      style={{ width:"100%", height:160, objectFit:"cover", display:"block" }} />
                    <div style={{ position:"absolute", top:8, left:8 }}>
                      <VegBadge veg={item.veg} />
                    </div>
                    <div style={{ position:"absolute", top:8, right:8, background:"rgba(10,8,6,0.75)", backdropFilter:"blur(4px)", padding:"2px 8px", borderRadius:100, fontSize:11, color:"var(--gold)", fontWeight:600 }}>
                      {item.cat}
                    </div>
                  </div>
                  <div style={{ padding:"14px" }}>
                    <div style={{ fontFamily:"'Playfair Display',serif", fontSize:15, fontWeight:600, marginBottom:4, lineHeight:1.3 }}>{item.name}</div>
                    <div style={{ fontSize:12, color:"var(--muted)", marginBottom:12, lineHeight:1.5 }}>{item.desc}</div>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <span style={{ color:"var(--gold)", fontWeight:600, fontSize:16 }}>₹{item.price}</span>
                      {qty === 0 ? (
                        <button className="btn-gold" style={{ padding:"7px 16px", fontSize:12 }} onClick={()=>addToCart(item)}>+ Add</button>
                      ) : (
                        <div className="qty-ctrl">
                          <button className="qty-btn" onClick={()=>addToCart({...item, remove:true})}>−</button>
                          <span style={{ fontSize:14, fontWeight:600, color:"var(--gold)", minWidth:16, textAlign:"center" }}>{qty}</span>
                          <button className="qty-btn" onClick={()=>addToCart(item)}>+</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// CART
function Cart({ cart, setCart, setPage, showToast }) {
  const grouped = cart.reduce((acc, item) => {
    acc[item.id] = acc[item.id] ? { ...acc[item.id], qty: acc[item.id].qty + 1 } : { ...item, qty: 1 };
    return acc;
  }, {});
  const items = Object.values(grouped);
  const subtotal = cart.reduce((s,i)=>s+i.price, 0);
  const delivery = subtotal > 0 ? 40 : 0;
  const total = subtotal + delivery;

  const remove = (id) => setCart(c => { const idx = c.findLastIndex(x=>x.id===id); if(idx===-1) return c; return [...c.slice(0,idx), ...c.slice(idx+1)]; });
  const add = (item) => setCart(c=>[...c,item]);
  const clear = () => setCart([]);

  return (
    <div className="page" style={{ paddingTop:80 }}>
      <div className="section" style={{ maxWidth:680 }}>
        <p style={{ fontSize:11, letterSpacing:"0.25em", textTransform:"uppercase", color:"var(--gold)", marginBottom:8 }}>Your</p>
        <h1 className="display" style={{ fontSize:40, fontWeight:700, marginBottom:8 }}>Cart</h1>
        <div className="gold-line" style={{ margin:"0 0 32px 0" }} />

        {items.length === 0 ? (
          <div style={{ textAlign:"center", padding:"60px 0" }}>
            <div style={{ fontSize:48, marginBottom:16 }}>🛒</div>
            <div style={{ color:"var(--muted)", marginBottom:24 }}>Your cart is empty</div>
            <button className="btn-gold" onClick={()=>setPage("menu")}>Browse Menu</button>
          </div>
        ) : (
          <>
            {items.map(item => (
              <div key={item.id} style={{ display:"flex", gap:14, alignItems:"center", padding:"16px 0", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
                <img src={item.img} alt={item.name} loading="lazy" style={{ width:64, height:64, objectFit:"cover", borderRadius:2, flexShrink:0 }} />
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:15, marginBottom:2 }}>{item.name}</div>
                  <div style={{ color:"var(--gold)", fontSize:14 }}>₹{item.price} each</div>
                </div>
                <div className="qty-ctrl">
                  <button className="qty-btn" onClick={()=>remove(item.id)}>−</button>
                  <span style={{ fontWeight:600, color:"var(--gold)", minWidth:20, textAlign:"center" }}>{item.qty}</span>
                  <button className="qty-btn" onClick={()=>add(item)}>+</button>
                </div>
                <div style={{ fontWeight:600, color:"var(--cream)", minWidth:60, textAlign:"right" }}>₹{item.price * item.qty}</div>
              </div>
            ))}

            {/* Bill */}
            <div style={{ background:"var(--brown)", border:"1px solid rgba(200,151,42,0.15)", borderRadius:4, padding:20, marginTop:24 }}>
              <div style={{ fontSize:11, letterSpacing:"0.15em", textTransform:"uppercase", color:"var(--gold)", marginBottom:12 }}>Bill Summary</div>
              {[["Subtotal", `₹${subtotal}`],["Delivery", `₹${delivery}`]].map(([l,v])=>(
                <div key={l} style={{ display:"flex", justifyContent:"space-between", fontSize:13, color:"var(--muted)", marginBottom:8 }}>
                  <span>{l}</span><span>{v}</span>
                </div>
              ))}
              <div style={{ borderTop:"1px solid rgba(200,151,42,0.2)", paddingTop:12, display:"flex", justifyContent:"space-between", fontWeight:600, fontSize:16 }}>
                <span>Total</span><span style={{ color:"var(--gold)" }}>₹{total}</span>
              </div>
            </div>

            <div style={{ display:"flex", gap:12, marginTop:20, flexWrap:"wrap" }}>
              <button className="btn-gold" style={{ flex:1 }} onClick={()=>setPage("payment")}>Proceed to Pay ₹{total}</button>
              <button className="btn-ghost" onClick={()=>{ clear(); showToast("Cart cleared"); }}>Clear</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// PAYMENT
function Payment({ cart, setCart, setPage, setOrders, showToast }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paid, setPaid] = useState(false);
  const total = cart.reduce((s,i)=>s+i.price,0) + (cart.length>0?40:0);
  const upiId = "8540868095@fam";
  const whatsapp = "918540868095";

  const handleOrder = async () => {
    if (!name || !phone) { showToast("Please fill name & phone"); return; }
    const orderId = "DD" + Date.now().toString().slice(-6);
    const itemsData = Object.values(cart.reduce((a,i)=>{ a[i.id]={...i,qty:(a[i.id]?.qty||0)+1}; return a; },{}));
    const newOrder = {
      id: orderId,
      items: itemsData,
      total,
      name,
      phone,
      address,
      status: "Confirmed",
      time: new Date().toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"}),
      date: new Date().toLocaleDateString("en-IN"),
      trackStep: 1,
    };
    // Save to Supabase
    const { error } = await supabase.from("orders").insert({
      id: orderId,
      customer_name: name,
      phone,
      address,
      total,
      status: "Confirmed",
      track_step: 1,
      items: itemsData,
    });
    if (error) { showToast("Order failed! Try again."); console.error(error); return; }
    setOrders(o=>[newOrder,...o]);
    setPaid(true);
    setCart([]);
    // WhatsApp message
    const msg = encodeURIComponent(`🍽️ New Order from Desi Delight!\nOrder ID: ${orderId}\nCustomer: ${name}\nPhone: ${phone}\nTotal: ₹${total}\nItems: ${itemsData.map(i=>i.name+"×"+i.qty).join(", ")}`);
    setTimeout(()=>window.open(`https://wa.me/${whatsapp}?text=${msg}`,"_blank"), 500);
  };

  if (paid) return (
    <div className="page" style={{ paddingTop:80 }}>
      <div className="section" style={{ maxWidth:500, textAlign:"center" }}>
        <div style={{ fontSize:64, marginBottom:16 }}>✅</div>
        <h2 className="display" style={{ fontSize:32, color:"var(--gold)", marginBottom:8 }}>Order Placed!</h2>
        <p style={{ color:"var(--muted)", marginBottom:32 }}>Your order has been received. Track it in real time.</p>
        <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
          <button className="btn-gold" onClick={()=>setPage("track")}>Track Order</button>
          <button className="btn-outline" onClick={()=>setPage("menu")}>Order More</button>
        </div>
      </div>
    </div>
  );

  if (cart.length === 0) return (
    <div className="page" style={{ paddingTop:80 }}>
      <div className="section" style={{ textAlign:"center" }}>
        <p style={{ color:"var(--muted)", marginBottom:24 }}>No items in cart</p>
        <button className="btn-gold" onClick={()=>setPage("menu")}>Browse Menu</button>
      </div>
    </div>
  );

  return (
    <div className="page" style={{ paddingTop:80 }}>
      <div className="section" style={{ maxWidth:540 }}>
        <p style={{ fontSize:11, letterSpacing:"0.25em", textTransform:"uppercase", color:"var(--gold)", marginBottom:8 }}>Checkout</p>
        <h1 className="display" style={{ fontSize:40, fontWeight:700, marginBottom:8 }}>Payment</h1>
        <div className="gold-line" style={{ margin:"0 0 32px 0" }} />

        <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:24 }}>
          <input className="input" placeholder="Your Name *" value={name} onChange={e=>setName(e.target.value)} />
          <input className="input" placeholder="Phone Number *" value={phone} onChange={e=>setPhone(e.target.value)} />
          <input className="input" placeholder="Delivery Address" value={address} onChange={e=>setAddress(e.target.value)} />
        </div>

        {/* UPI box */}
        <div style={{ background:"var(--brown)", border:"1px solid rgba(200,151,42,0.2)", borderRadius:4, padding:20, marginBottom:24 }}>
          <div style={{ fontSize:11, letterSpacing:"0.15em", textTransform:"uppercase", color:"var(--gold)", marginBottom:12 }}>Pay via UPI</div>
          <div style={{ fontSize:13, color:"var(--muted)", marginBottom:8 }}>UPI ID:</div>
          <div style={{ fontFamily:"monospace", fontSize:16, color:"var(--cream)", background:"var(--brownMid)", padding:"10px 14px", borderRadius:2, letterSpacing:"0.05em" }}>{upiId}</div>
          <div style={{ marginTop:12, fontSize:12, color:"var(--muted)" }}>Pay ₹{total} via GPay, PhonePe, or any UPI app. Screenshot will be shared on WhatsApp.</div>
        </div>

        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", background:"var(--brownLight)", borderRadius:4, padding:"14px 18px", marginBottom:20 }}>
          <span style={{ fontSize:13, color:"var(--muted)" }}>Total Amount</span>
          <span style={{ fontFamily:"'Playfair Display',serif", fontSize:22, color:"var(--gold)", fontWeight:700 }}>₹{total}</span>
        </div>

        <button className="btn-gold" style={{ width:"100%", justifyContent:"center", fontSize:15, padding:"14px" }} onClick={handleOrder}>
          Confirm Order & Pay ₹{total}
        </button>
      </div>
    </div>
  );
}

// TABLE RESERVATION
function Reserve({ showToast }) {
  const [form, setForm] = useState({ name:"", phone:"", date:"", time:"", guests:"2", note:"" });
  const [done, setDone] = useState(false);
  const set = (k,v) => setForm(f=>({...f,[k]:v}));
  const whatsapp = "918540868095";

  const submit = async () => {
    if (!form.name || !form.phone || !form.date || !form.time) { showToast("Please fill all required fields"); return; }
    // Save to Supabase
    const { error } = await supabase.from("reservations").insert({
      name: form.name, phone: form.phone, date: form.date,
      time: form.time, guests: form.guests, note: form.note || ""
    });
    if (error) { showToast("Booking failed! Try again."); return; }
    const msg = encodeURIComponent(`🍽️ Table Reservation – Desi Delight\nName: ${form.name}\nPhone: ${form.phone}\nDate: ${form.date}\nTime: ${form.time}\nGuests: ${form.guests}\nNote: ${form.note||"—"}`);
    window.open(`https://wa.me/${whatsapp}?text=${msg}`,"_blank");
    setDone(true);
  };

  if (done) return (
    <div className="page" style={{ paddingTop:80 }}>
      <div className="section" style={{ maxWidth:500, textAlign:"center" }}>
        <div style={{ fontSize:64, marginBottom:16 }}>🎉</div>
        <h2 className="display" style={{ fontSize:32, color:"var(--gold)", marginBottom:8 }}>Table Reserved!</h2>
        <p style={{ color:"var(--muted)" }}>We've received your request. Our team will confirm via WhatsApp shortly.</p>
      </div>
    </div>
  );

  return (
    <div className="page" style={{ paddingTop:80 }}>
      <div className="section" style={{ maxWidth:540 }}>
        <p style={{ fontSize:11, letterSpacing:"0.25em", textTransform:"uppercase", color:"var(--gold)", marginBottom:8 }}>Dine With Us</p>
        <h1 className="display" style={{ fontSize:40, fontWeight:700, marginBottom:8 }}>Reserve a Table</h1>
        <div className="gold-line" style={{ margin:"0 0 32px 0" }} />

        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <input className="input" placeholder="Full Name *" value={form.name} onChange={e=>set("name",e.target.value)} />
          <input className="input" placeholder="Phone Number *" value={form.phone} onChange={e=>set("phone",e.target.value)} />
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <input className="input" type="date" value={form.date} onChange={e=>set("date",e.target.value)} />
            <select className="input" value={form.time} onChange={e=>set("time",e.target.value)}>
              <option value="">Select Time</option>
              {["12:00","13:00","14:00","19:00","19:30","20:00","20:30","21:00","21:30"].map(t=><option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <select className="input" value={form.guests} onChange={e=>set("guests",e.target.value)}>
            {[1,2,3,4,5,6,7,8].map(n=><option key={n} value={n}>{n} {n===1?"Guest":"Guests"}</option>)}
          </select>
          <textarea className="input" placeholder="Special requests (optional)" rows={3} value={form.note} onChange={e=>set("note",e.target.value)} style={{ resize:"vertical" }} />
        </div>

        <button className="btn-gold" style={{ width:"100%", justifyContent:"center", marginTop:24, fontSize:15, padding:14 }} onClick={submit}>
          Confirm Reservation
        </button>
        <p style={{ textAlign:"center", fontSize:12, color:"var(--muted)", marginTop:12 }}>Reservation confirmed via WhatsApp · Open 11 AM – 11 PM</p>
      </div>
    </div>
  );
}

// ORDER TRACKING
function TrackOrder({ orders }) {
  const [orderId, setOrderId] = useState("");
  const [found, setFound] = useState(null);
  const [step, setStep] = useState(1);

  useEffect(()=>{
    if (orders.length > 0) { setFound(orders[0]); setStep(orders[0].trackStep); }
  },[orders]);

  // Demo: auto advance
  useEffect(()=>{
    if (!found) return;
    if (step >= 4) return;
    const t = setTimeout(()=>setStep(s=>s+1), 8000);
    return ()=>clearTimeout(t);
  },[found,step]);

  const search = () => {
    const o = orders.find(x=>x.id.toLowerCase()===orderId.toLowerCase());
    if (o) { setFound(o); setStep(o.trackStep); }
    else setFound(null);
  };

  return (
    <div className="page" style={{ paddingTop:80 }}>
      <div className="section" style={{ maxWidth:640 }}>
        <p style={{ fontSize:11, letterSpacing:"0.25em", textTransform:"uppercase", color:"var(--gold)", marginBottom:8 }}>Live</p>
        <h1 className="display" style={{ fontSize:40, fontWeight:700, marginBottom:8 }}>Track Your Order</h1>
        <div className="gold-line" style={{ margin:"0 0 32px 0" }} />

        <div style={{ display:"flex", gap:10, marginBottom:32 }}>
          <input className="input" placeholder="Enter Order ID (e.g. DD123456)" value={orderId} onChange={e=>setOrderId(e.target.value)} />
          <button className="btn-gold" onClick={search}>Track</button>
        </div>

        {orders.length > 0 && !found && (
          <div style={{ color:"var(--muted)", textAlign:"center", padding:"24px 0" }}>Order not found</div>
        )}

        {found && (
          <div className="card" style={{ padding:24 }}>
            <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:8, marginBottom:20 }}>
              <div>
                <div style={{ fontSize:11, letterSpacing:"0.15em", textTransform:"uppercase", color:"var(--muted)" }}>Order ID</div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:20, color:"var(--gold)" }}>{found.id}</div>
              </div>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontSize:11, letterSpacing:"0.15em", textTransform:"uppercase", color:"var(--muted)" }}>Status</div>
                <div style={{ color:"var(--goldLight)", fontWeight:600 }}>{TRACKING_STEPS[step]}</div>
              </div>
            </div>

            {/* Tracking bar */}
            <div className="track-bar">
              {TRACKING_STEPS.map((s,i)=>(
                <div key={s} className="track-step">
                  {i < TRACKING_STEPS.length-1 && <div className={`track-line ${i<step?"done":""}`} />}
                  <div className={`track-dot ${i===step?"active":i<step?"done":""}`}>
                    {i < step ? "✓" : i === step ? "●" : ""}
                  </div>
                  <div className={`track-label ${i===step?"active":""}`}>{s}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop:20, borderTop:"1px solid rgba(255,255,255,0.05)", paddingTop:16 }}>
              <div style={{ fontSize:12, color:"var(--muted)", marginBottom:8 }}>Items ordered:</div>
              {found.items.map(i=>(
                <div key={i.id} style={{ display:"flex", justifyContent:"space-between", fontSize:13, padding:"4px 0" }}>
                  <span>{i.name} × {i.qty}</span>
                  <span style={{ color:"var(--gold)" }}>₹{i.price*i.qty}</span>
                </div>
              ))}
              <div style={{ display:"flex", justifyContent:"space-between", fontWeight:600, borderTop:"1px solid rgba(200,151,42,0.15)", marginTop:8, paddingTop:8 }}>
                <span>Total</span><span style={{ color:"var(--gold)" }}>₹{found.total}</span>
              </div>
            </div>
          </div>
        )}

        {orders.length === 0 && (
          <div style={{ textAlign:"center", padding:"40px 0", color:"var(--muted)" }}>
            <div style={{ fontSize:40, marginBottom:12 }}>📦</div>
            No orders yet. Place an order to track it here.
          </div>
        )}
      </div>
    </div>
  );
}

// ORDER HISTORY
function OrderHistory({ orders, setPage }) {
  return (
    <div className="page" style={{ paddingTop:80 }}>
      <div className="section">
        <p style={{ fontSize:11, letterSpacing:"0.25em", textTransform:"uppercase", color:"var(--gold)", marginBottom:8 }}>Your</p>
        <h1 className="display" style={{ fontSize:40, fontWeight:700, marginBottom:8 }}>Order History</h1>
        <div className="gold-line" style={{ margin:"0 0 32px 0" }} />
        {orders.length === 0 ? (
          <div style={{ textAlign:"center", padding:"60px 0" }}>
            <div style={{ fontSize:40, marginBottom:12 }}>🍽️</div>
            <p style={{ color:"var(--muted)", marginBottom:24 }}>No orders yet</p>
            <button className="btn-gold" onClick={()=>setPage("menu")}>Order Now</button>
          </div>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            {orders.map(o=>(
              <div key={o.id} className="card" style={{ padding:20 }}>
                <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:8, marginBottom:12 }}>
                  <div>
                    <div style={{ fontFamily:"'Playfair Display',serif", fontSize:16, color:"var(--gold)" }}>{o.id}</div>
                    <div style={{ fontSize:12, color:"var(--muted)" }}>{o.date} · {o.time}</div>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <div style={{ fontSize:18, fontWeight:700, color:"var(--cream)" }}>₹{o.total}</div>
                    <div style={{ fontSize:12, color:"var(--goldLight)" }}>{TRACKING_STEPS[o.trackStep]}</div>
                  </div>
                </div>
                <div style={{ fontSize:13, color:"var(--muted)" }}>{o.items.map(i=>i.name+"×"+i.qty).join(", ")}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// REVIEWS
function Reviews({ showToast }) {
  const [reviews, setReviews] = useState(SAMPLE_REVIEWS);
  const [form, setForm] = useState({ name:"", rating:5, comment:"" });
  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  const submit = async () => {
    if (!form.name || !form.comment) { showToast("Please fill name & review"); return; }
    const { error } = await supabase.from("reviews").insert({
      name: form.name, rating: form.rating, comment: form.comment
    });
    if (error) { showToast("Review failed! Try again."); return; }
    setReviews(r=>[{ id:Date.now(), ...form, date: new Date().toLocaleDateString("en-IN") }, ...r]);
    setForm({ name:"", rating:5, comment:"" });
    showToast("Review submitted!");
  };

  const avg = (reviews.reduce((s,r)=>s+Number(r.rating),0)/reviews.length).toFixed(1);

  return (
    <div className="page" style={{ paddingTop:80 }}>
      <div className="section" style={{ maxWidth:680 }}>
        <p style={{ fontSize:11, letterSpacing:"0.25em", textTransform:"uppercase", color:"var(--gold)", marginBottom:8 }}>What People Say</p>
        <h1 className="display" style={{ fontSize:40, fontWeight:700, marginBottom:8 }}>Reviews</h1>
        <div className="gold-line" style={{ margin:"0 0 16px 0" }} />
        <div style={{ display:"flex", alignItems:"baseline", gap:12, marginBottom:40 }}>
          <span style={{ fontFamily:"'Playfair Display',serif", fontSize:48, color:"var(--gold)", fontWeight:700 }}>{avg}</span>
          <div>
            <Stars n={Math.round(Number(avg))} />
            <div style={{ fontSize:12, color:"var(--muted)" }}>{reviews.length} reviews</div>
          </div>
        </div>

        {/* Write review */}
        <div style={{ background:"var(--brown)", border:"1px solid rgba(200,151,42,0.15)", borderRadius:4, padding:20, marginBottom:32 }}>
          <div style={{ fontSize:12, letterSpacing:"0.12em", textTransform:"uppercase", color:"var(--gold)", marginBottom:16 }}>Write a Review</div>
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            <input className="input" placeholder="Your Name" value={form.name} onChange={e=>set("name",e.target.value)} />
            <div style={{ display:"flex", gap:4 }}>
              {[1,2,3,4,5].map(n=>(
                <button key={n} onClick={()=>set("rating",n)}
                  style={{ background:"none", border:"none", cursor:"pointer", fontSize:24, color: n<=form.rating ? "var(--gold)":"var(--muted)", transition:"color 0.15s" }}>★</button>
              ))}
            </div>
            <textarea className="input" placeholder="Share your experience..." rows={3} value={form.comment} onChange={e=>set("comment",e.target.value)} style={{ resize:"vertical" }} />
            <button className="btn-gold" onClick={submit} style={{ alignSelf:"flex-start" }}>Submit Review</button>
          </div>
        </div>

        {/* Reviews list */}
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          {reviews.map(r=>(
            <div key={r.id} className="card" style={{ padding:18 }}>
              <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:8, marginBottom:8 }}>
                <span style={{ fontFamily:"'Playfair Display',serif", fontSize:15 }}>{r.name}</span>
                <span style={{ fontSize:11, color:"var(--muted)" }}>{r.date}</span>
              </div>
              <Stars n={Number(r.rating)} />
              <p style={{ marginTop:8, fontSize:13, color:"var(--muted)", lineHeight:1.6 }}>{r.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ADMIN DASHBOARD
function Admin({ orders, setOrders, showToast }) {
  const [loading, setLoading] = useState(false);

  // Fetch orders from Supabase on mount
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) {
        const mapped = data.map(o => ({
          id: o.id,
          name: o.customer_name,
          phone: o.phone,
          address: o.address,
          total: o.total,
          status: o.status,
          trackStep: o.track_step,
          items: o.items || [],
          date: new Date(o.created_at).toLocaleDateString("en-IN"),
          time: new Date(o.created_at).toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"}),
        }));
        setOrders(mapped);
      }
      setLoading(false);
    };
    fetchOrders();
  }, []);

  const revenue = orders.reduce((s,o)=>s+o.total,0);
  const statusColor = { "Order Placed":"var(--muted)", "Confirmed":"var(--goldLight)", "Preparing":"#f59e0b", "Out for Delivery":"#3b82f6", "Delivered":"#22c55e" };

  const advance = async (id) => {
    const order = orders.find(o=>o.id===id);
    if (!order) return;
    const next = Math.min(order.trackStep+1, 4);
    // Update Supabase
    await supabase.from("orders").update({ track_step: next, status: TRACKING_STEPS[next] }).eq("id", id);
    setOrders(prev => prev.map(o => {
      if (o.id!==id) return o;
      showToast(`Order ${id} → ${TRACKING_STEPS[next]}`);
      return {...o, trackStep:next, status:TRACKING_STEPS[next]};
    }));
  };

  return (
    <div className="page" style={{ paddingTop:80 }}>
      <div className="section">
        <p style={{ fontSize:11, letterSpacing:"0.25em", textTransform:"uppercase", color:"var(--gold)", marginBottom:8 }}>Owner Panel</p>
        <h1 className="display" style={{ fontSize:40, fontWeight:700, marginBottom:8 }}>Admin Dashboard</h1>
        <div className="gold-line" style={{ margin:"0 0 32px 0" }} />

        {/* Stats */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:16, marginBottom:40 }}>
          {[
            ["Total Orders", orders2.length, "📦"],
            ["Revenue", `₹${revenue}`, "💰"],
            ["Pending", orders.filter(o=>o.trackStep<4).length, "⏳"],
            ["Delivered", orders.filter(o=>o.trackStep===4).length, "✅"],
          ].map(([l,v,e])=>(
            <div key={l} style={{ background:"var(--brown)", border:"1px solid rgba(200,151,42,0.15)", borderRadius:4, padding:20, textAlign:"center" }}>
              <div style={{ fontSize:28 }}>{e}</div>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:26, color:"var(--gold)", fontWeight:700 }}>{v}</div>
              <div style={{ fontSize:11, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--muted)", marginTop:4 }}>{l}</div>
            </div>
          ))}
        </div>

        {/* Orders table */}
        <div style={{ background:"var(--brown)", border:"1px solid rgba(200,151,42,0.12)", borderRadius:4, overflowX:"auto" }}>
          <div style={{ padding:"16px 20px", borderBottom:"1px solid rgba(200,151,42,0.12)", fontSize:12, letterSpacing:"0.12em", textTransform:"uppercase", color:"var(--gold)" }}>
            Recent Orders
          </div>
          {orders.length === 0 ? (
            <div style={{ padding:"40px", textAlign:"center", color:"var(--muted)" }}>No orders yet</div>
          ) : (
            <table>
              <thead>
                <tr><th>Order ID</th><th>Customer</th><th>Items</th><th>Amount</th><th>Status</th><th>Action</th></tr>
              </thead>
              <tbody>
                {orders.map(o=>(
                  <tr key={o.id}>
                    <td style={{ color:"var(--gold)", fontFamily:"monospace" }}>{o.id}</td>
                    <td>
                      <div style={{ fontWeight:500 }}>{o.name}</div>
                      <div style={{ fontSize:11, color:"var(--muted)" }}>{o.phone}</div>
                    </td>
                    <td style={{ color:"var(--muted)", fontSize:12, maxWidth:180 }}>{o.items.map(i=>i.name+"×"+i.qty).join(", ")}</td>
                    <td style={{ color:"var(--gold)", fontWeight:600 }}>₹{o.total}</td>
                    <td><span style={{ color: statusColor[TRACKING_STEPS[o.trackStep]] || "var(--muted)", fontSize:12 }}>{TRACKING_STEPS[o.trackStep]}</span></td>
                    <td>
                      {o.trackStep < 4 ? (
                        <button className="btn-outline" style={{ fontSize:11, padding:"5px 12px" }} onClick={()=>advance(o.id)}>
                          Advance →
                        </button>
                      ) : (
                        <span style={{ fontSize:12, color:"#22c55e" }}>✓ Done</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// ROOT APP
// ============================================================
export default function App() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(()=>setToast(null), 2800);
  };

  const addToCart = (item) => {
    if (item.remove) {
      setCart(c => { const idx = c.findLastIndex(x=>x.id===item.id); if(idx===-1) return c; return [...c.slice(0,idx),...c.slice(idx+1)]; });
    } else {
      setCart(c=>[...c,item]);
      showToast(`${item.name} added to cart`);
    }
  };

  const pages = { home, menu:"menu", cart:"cart", payment:"payment", reserve:"reserve", track:"track", history:"history", reviews:"reviews", admin:"admin" };

  return (
    <>
      <GlobalStyle />
      <Nav page={page} setPage={setPage} cartCount={cart.length} />
      {toast && <div className="toast">✦ {toast}</div>}

      {page === "home"    && <Home setPage={setPage} />}
      {page === "menu"    && <MenuPage addToCart={addToCart} cart={cart} />}
      {page === "cart"    && <Cart cart={cart} setCart={setCart} setPage={setPage} showToast={showToast} />}
      {page === "payment" && <Payment cart={cart} setCart={setCart} setPage={setPage} setOrders={setOrders} showToast={showToast} />}
      {page === "reserve" && <Reserve showToast={showToast} />}
      {page === "track"   && <TrackOrder orders={orders} />}
      {page === "history" && <OrderHistory orders={orders} setPage={setPage} />}
      {page === "reviews" && <Reviews showToast={showToast} />}
      {page === "admin"   && <Admin orders={orders} setOrders={setOrders} showToast={showToast} />}
    </>
  );
}
