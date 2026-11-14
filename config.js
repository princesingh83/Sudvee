/* SUDVEE – all editable content lives here. Use plain text (no HTML tags).
   Put your own images in assets/images/ and reference them like "assets/images/hero-1.jpg". */
window.SUDVEE_CONFIG = {
  brand: {
    // name: "SUDVEE",
    logo: "images/finallogo1.png", // replace with e.g. "assets/images/logo.png"
    footerLogo: "images/footerlogo.png", // footer ka alag logo. Khali chhodoge to header wala logo (white) dikhega
    
  },

  

  navigation: [ // "page" must match <body data-page="..."> to highlight the active link
    { label: "Home", href: "index.html", page: "home" },
    { label: "About Us", href: "about.html", page: "about" },
    { label: "Products", href: "products.html", page: "products" },
    { label: "Recipes", href: "recipes.html", page: "recipes" }
    
  ],
  contactButton: { label: "Contact", href: "#contact" },
    footerLinks: [
    { label: "About Us", href: "about.html" },
    { label: "Products", href: "products.html" },
    { label: "Recipes", href: "recipes.html" }
  ],

  contact: { // placeholders – replace
    email: "sudvee@gmail.com",
    phone: "+91-91207776776,\n+91-7459879960",
    address: "Bhagwant Nagar,\nUnnao,\nUttar Pradesh,\nPIN - 209864"
  },
  social: [
    { name: "Instagram", icon: "instagram", url: "https://instagram.com/sudveepantry" },
    { name: "Facebook", icon: "facebook", url: "https://facebook.com/sudveepantry" },
    { name: "YouTube", icon: "youtube", url: "https://youtube.com/sudveepantry" },
    { name: "X", icon: "x", url: "https://x.com/sudveepantry" }
  ],
  legal: { text: "All Rights Reserved.", developer: " Maa Sankata Enterprises IT Dept", developerUrl: "" },

  hero: {
    slideCount: 4,      // how many of the slides below are shown
    autoplay: true,
    intervalMs: 5500,

   slides: [
  { image: "images/s2.png",     mobileImage: "images/ritik2.webp", alt: "Heritage spices and grains"},
  { image: "images/haldi.png",  mobileImage: "images/s2.png",  alt: "Stone grinder with whole spices"},
  { image: "images/pasta.png",  mobileImage: "images/s2.png",  alt: "Clay pot of simmering curry sauce"},
  { image: "images/noodles.png", mobileImage: "images/s2.png", alt: "Bowl of artisanal millet noodles"}
]
  },

  featureBanner: {
    autoplay: true,
    intervalMs: 5000,
    slides: [
        {
            image: "rimages/rajma.webp",
            alt: "SUDVEE pantry",
            eyebrow: "From Farm to Jar",
            title: "Grown slowly. Ground fresh."
        },
        {
            image: "rimages/matarpaneer.webp",
            alt: "Traditional Indian ingredients",
            eyebrow: "Pure Ingredients",
            title: "Naturally Good. Always."
        }
    ]
},

featureBanner2: {
    autoplay: true,
    intervalMs: 5000,
    slides: [
        {
            image: "images/mirchi.png",
            alt: "Fresh spices",
            eyebrow: "Our Ingredients",
            title: "Tradition in Every Jar."
        },
        {
            image: "images/dhaniya.png",
            alt: "Artisanal pantry products",
            eyebrow: "Our Promise",
            title: "Honest. Authentic. Delicious."
        }
    ]
},
aboutStats: { // Home page "About + numbers" section. Remove this whole block to hide the section.
    eyebrow: "About SUDVEE",
    title: "Suddh Soach,   ",
    accent: "Asli Swaad",           // coloured part of the heading (leave "" for none)
    text: "From everyday essentials to delightful culinary creations,SUDVEE celebrates the joy of good food with a diverse range of quality products inspired by authentic taste and the richness of Indian kitchens.",
    video: {                            // different video for computer and phone
      desktop: "videos/product2.mp4",
      mobile: "videos/product2.mp4",
      poster: "images/s2.png",          // image shown until the video loads (computer)
      mobilePoster: "images/mobilephoto.png" // (phone)
    },
    caption: "Rooted in the traditions of Indian kitchens, SUDVEE brings together the flavours of heritage and the possibilities of modern cooking, making every meal a celebration of taste and togetherness.",
    link: { label: "Know More", href: "about.html" },

    stats: [                            // replace with your real numbers. Any text works as a value.
      { value: "01",    suffix: "", label: "A new beginning." },
      { value: "100%",    suffix: "", label: "Quality commitment" },
      { value: "∞",   suffix: "", label: "Endless possibilities of authentic taste" },
      { value: "India", suffix: "",  label: "Indian food heritage se inspiration" }
    ]
  },
  pillars: [
    { icon: "eco", title: "Single-Origin Provenance", text: "Direct partnerships with multi-generational spice cultivators across Kerala, Karnataka & Rajasthan." },
    { icon: "grain", title: "Stone-Ground & Cold-Tempered", text: "Preserving delicate essential oils, aromas, and micronutrients without artificial machine heat." },
    { icon: "workspace_premium", title: "Zero Refined Additives", text: "Strictly zero palm oil, preservatives, MSG, synthetic flavourings, or refined white flours." }
  ],

  arrivalsSpeed: 50, // pixels per second. Higher = faster, 0 = stopped

  productButton: { label: "Enquire Now", href: "#contact" }, // a product's own "href" overrides this
  products: [ // newArrival: true → shown in the Home carousel. All items show on the Products page.


    { title: "Vegetable Noodles", category: "Noodles", tag: "Stone-Milled", size: "75g Packet", 
      notes: "Wholesome grain noodles crafted for a delicious and satisfying meal.", image: "images/noodles.png", newArrival: true },

    { title: "Durum Wheat Pasta ", category: "Pasta", tag: "Stone-Milled", size: "500g Packet", 
      notes: "Premium durum wheat pasta crafted for a firm texture and delicious, authentic Italian-inspired meals.", image: "images/pasta.png", newArrival: true },

    { title: "Slow-Cooked Tomato Sauce", category: "Sauce", tag: "Small-Batch", size: "350g glass jar", 
      notes: "Rich, slow-cooked tomato sauce crafted for a deep, naturally sweet flavour. Perfect for pasta, pizza and everyday meals..", image: "images/tomato sauce.png", newArrival: true },
      
    { title: "Sun-Dried Millet Ramen & Curry Noodles", category: "Ancient Grains", tag: "Small Batch", size: "200g artisanal box", 
      notes: "Crafted with foxtail millet and Emmer khapli wheat, slow air-dried.", image: "images/noodles.png", newArrival: true },

    { title: "Kashmiri Kahwa Whole Spice Blend", category: "Botanical Infusions", tag: "Single-Estate", size: "100g heritage tin", 
      notes: "Pampore saffron strands, green cardamom pods, and Ceylon cinnamon.", image: "images/noodles.png", newArrival: true },

    { title: "Slow-Tempered Kokum & Coconut Simmer Sauce", category: "Slow Sauces", tag: "Zero Preservatives", size: "250ml glass bottle", 
      notes: "Wild Konkan kokum infused with stone-pressed coconut cream.", image: "images/noodles.png", newArrival: true },

    { title: "Cold-Pressed Yellow Mustard & Fenugreek Oil", category: "Kachi Ghani Oils", tag: "First Harvest", size: "500ml amber bottle", 
      notes: "Rajasthan yellow mustard seeds slow-crushed in wooden churners.", image: "images/noodles.png", newArrival: true }
  ],

  recipeBanner: {
    image: "images/s2.png",
    alt: "SUDVEE recipes banner"
  },

  homeRecipes: {
  eyebrow: "Flavours That Inspire",
  title: "Signature Recipes with",
  accent: "SUDVEE",              // heading ka coloured word, khali chhodo to koi accent nahi
  text: "Everyday meals to festive delicacies, bring home bold taste and culinary creativity with SUDVEE products.",
  limit: 3,                      // laptop/desktop par kitni recipes
  mobileLimit: 2                 // phone/tablet par kitni recipes (uske baad View All button)
},
  recipesPage: { title: "Hot Meals, Cool Kitchen" },


  recipes: [ // add/remove recipes freely – tabs 1/2/3… are generated

  {
  title: "Kadhai Paneer",image: "images/kadhaipaneer.webp",time: "25 Mins",description: "For the paneer and veggie prep, cut the paneer into uniform bite-sized cubes, and dice the onions and bell peppers into large squares. Lightly pan-sear the paneer cubes until golden-brown and soak them in warm water for a few minutes to keep them soft, then drain completely before tossing them into the gravy",
  prep: "10 minutes",cook: "15 minutes", total: "25 minutes",servings: "2",diet: "Veg",cuisine: "Indian",
  ingredientGroups: [
  { title: "For Seasoning", items: [ "2 tbsp SUDVEE Kadhai Paneer Masala","1/2 tsp turmeric powder","Salt to taste","1 tsp kasuri methi","Fresh coriander for garnish"] },
  { title: "For Serving",  items: ["Fresh cream (optional)","Naan, roti or paratha"]}
],
  steps: ["Heat oil or butter in a kadhai. Add cumin seeds and let them splutter.",
  "Add chopped onions and sauté until golden brown.",
  "Add ginger-garlic paste and cook until the raw smell disappears.",
  "Add tomato puree, turmeric, red chilli powder, coriander powder and salt. Cook until the masala thickens.",
  "Add diced capsicum and cook for 2-3 minutes until slightly tender.",
  "Add paneer cubes, garam masala and crushed kasuri methi. Mix gently and simmer for 3-4 minutes.",
  "Garnish with fresh coriander and serve hot with naan, roti or paratha."],
  showOnHome: true
},


{
  title: "Gobhi Mataar",image: "rimages/matarpaneer.webp",time: "30 Mins",description: "Prepare the cauliflower by washing it thoroughly and cutting it into evenly sized florets. Bring a pot of water to a boil with a little turmeric. Add the florets and cook for a few minutes until partially tender. Drain the water completely and keep them aside.",
  prep: "15 minutes",
  cook: "15 minutes", total: "30 minutes",servings: "3",diet: "Veg",cuisine: "Indian",
  ingredientGroups: [
  { title: "For Seasoning", items: [
  "1 medium cauliflower, cut into florets",
  "½ cup green peas",
  "1 tsp SUDVEE Turmeric Powder (for boiling)",
  "2 tbsp oil",
  "1 tsp cumin seeds",
  "1 bay leaf",
  "1 tbsp ginger-garlic paste",
  "½ cup curd",
  "1½ tsp SUDVEE Coriander Powder",
  "1 tsp SUDVEE Red Chilli Powder",
  "1 tsp SUDVEE Kitchen King Masala",
  "½ tsp SUDVEE Garam Masala",
  "Salt to taste",
  "¼ cup water",
  "2 tbsp fresh cream or malai"
] }, 
{ title: "Tempering",  items: [
  "1 tbsp butter or oil",
  "½ tsp cumin seeds",
  "2 green chillies, split lengthwise"
]},
{ title: "Garnishing",  items: 
  [
  "Fresh coriander leaves, finely chopped",
  "Fresh cream for drizzling"

]}
  ],
  steps: [
  "Wash the cauliflower thoroughly and cut it into evenly sized florets.",
  "Bring water to a boil with SUDVEE Turmeric Powder. Add the cauliflower florets and cook for a few minutes until partially tender. Drain and set aside.",
  "In a bowl, combine curd, SUDVEE Coriander Powder, SUDVEE Red Chilli Powder, SUDVEE Garam Masala, salt and a little water. Mix until smooth.",
  "Heat oil in a kadhai. Add cumin seeds and bay leaf, allowing them to release their aroma.",
  "Add ginger-garlic paste and sauté until the raw smell disappears.",
  "Lower the flame and add the prepared curd mixture. Stir continuously until the masala is cooked and oil begins to separate.",
  "Add water and fresh cream or malai. Mix well to create a smooth gravy.",
  "Add the parboiled cauliflower florets and green peas. Sprinkle SUDVEE Kitchen King Masala and mix gently.",
  "Cover and simmer for 5-7 minutes until the vegetables become tender and absorb the flavours of the gravy.",
  "Heat butter or oil separately, add cumin seeds and split green chillies, and pour the tempering over the curry.",
  "Garnish with freshly chopped coriander leaves and a drizzle of cream. Serve hot with roti, naan or paratha."
],
  showOnHome: true
},


{
  title: "Rajma",image: "rimages/rajma.webp",time: "40 Mins",description: "Enjoy a comforting bowl of rajma made with slowly cooked kidney beans until soft and tender. Prepared in a rich ghee-based gravy with finely blended onions, ginger, garlic and fresh tomatoes, then flavoured with SUDVEE Kashmiri Red Chilli Powder and Rajma Masala. Simmered until thick and creamy, this classic North Indian dish pairs perfectly with steamed rice.",
  prep: "15 minutes",
  cook: "25 minutes", total: "40 minutes",servings: "4",diet: "Veg",cuisine: "Indian (Punjabi)",
  ingredientGroups:
  {ingredients: [
    {
      title: "For Seasoning",
      items: [
        "2 cups boiled rajma",
        "3 tbsp ghee",
        "2 onions, finely pureed",
        "1 tbsp ginger-garlic paste",
        "2 tomatoes, pureed",
        "1 tsp cumin seeds",
        "1 bay leaf",
        "2 tsp SUDVEE Rajma Masala",
        "1 tsp SUDVEE Kashmiri Red Chilli Powder",
        "½ tsp SUDVEE Turmeric Powder",
        "Salt to taste"
      ]
    },
    {
      title: "Garnishing",
      items: [
        "Fresh coriander leaves, finely chopped",
        "Raw onion slices",
        "Lemon wedges"
      ]
    }
  ],
  steps: [
    "Wash and soak rajma overnight or for at least 8 hours.",
    "Pressure cook the soaked rajma with water, a bay leaf and salt for 5-6 whistles or until completely soft and tender.",
    "Heat ghee in a deep kadhai or heavy-bottomed pot. Add cumin seeds and let them splutter.",
    "Add pureed onions and cook on medium heat until golden brown.",
    "Add ginger-garlic paste and sauté until the raw smell disappears.",
    "Pour in the tomato puree and cook until the masala thickens and ghee begins to separate.",
    "Add SUDVEE Kashmiri Red Chilli Powder, SUDVEE Turmeric Powder, SUDVEE Rajma Masala and salt. Mix well.",
    "Add the boiled rajma along with its cooking water. Stir gently to combine with the masala.",
    "Mash a few rajma beans with the back of a spoon to give the gravy a thick and creamy texture.",
    "Bring the curry to a boil, then cover and simmer on low heat for 15 minutes until the gravy becomes rich and thick.",
    "Garnish with freshly chopped coriander leaves and serve hot with steamed basmati rice, onion slices and lemon wedges."
  ]
},
  showOnHome: true
},


{
  title: "Slow-Simmered",image: "images/haldi.png",time: "25 Mins",description: "hfkfjljldj",prep: "10 minutes",
  cook: "15 minutes", total: "25 minutes",servings: "2",diet: "Veg",cuisine: "Indian",
  ingredientGroups: [
  { title: "Ingredients", items: ["Slow-Simmere"] }
  ],
  steps: [],
  showOnHome: true
},

{
  title: "Slow-Simmered",image: "images/haldi.png",time: "25 Mins",description: "hfkfjljldj",prep: "10 minutes",
  cook: "15 minutes", total: "25 minutes",servings: "2",diet: "Veg",cuisine: "Indian",
  ingredientGroups: [
  { title: "Ingredients", items: ["Slow-Simmere"] }
  ],
  steps: [],
  showOnHome: true
},

{
  title: "Slow-Simmered",image: "images/haldi.png",time: "25 Mins",description: "hfkfjljldj",prep: "10 minutes",
  cook: "15 minutes", total: "25 minutes",servings: "2",diet: "Veg",cuisine: "Indian",
  ingredientGroups: [
  { title: "Ingredients", items: ["Slow-Simmere"] }
  ],
  steps: [],
  showOnHome: true
},
  ]
};
