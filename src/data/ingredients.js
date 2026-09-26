export const INGREDIENT_CATEGORIES = [
  "All",
  "Vegetables",
  "Fruits",
  "Dairy & Eggs",
  "Protein",
  "Grains & Bakery",
  "Spices & Herbs",
  "Pantry"
];

// Curated ingredient catalog matching Scuccorese Food Dataset categories with real food photo CDN links
export const INGREDIENTS_CATALOG = [
  // Vegetables
  {
    id: "potato",
    name: "Potato",
    category: "Vegetables",
    defaultUnit: "g",
    defaultQty: 500,
    emoji: "🥔",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "onion",
    name: "Onion",
    category: "Vegetables",
    defaultUnit: "pcs",
    defaultQty: 2,
    emoji: "🧅",
    image: "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "tomato",
    name: "Tomato",
    category: "Vegetables",
    defaultUnit: "g",
    defaultQty: 300,
    emoji: "🍅",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "carrot",
    name: "Carrot",
    category: "Vegetables",
    defaultUnit: "pcs",
    defaultQty: 3,
    emoji: "🥕",
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "garlic",
    name: "Garlic",
    category: "Vegetables",
    defaultUnit: "pcs",
    defaultQty: 1,
    emoji: "🧄",
    image: "https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "broccoli",
    name: "Broccoli",
    category: "Vegetables",
    defaultUnit: "g",
    defaultQty: 250,
    emoji: "🥦",
    image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "spinach",
    name: "Spinach",
    category: "Vegetables",
    defaultUnit: "g",
    defaultQty: 200,
    emoji: "🥬",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "bell_pepper",
    name: "Bell Pepper",
    category: "Vegetables",
    defaultUnit: "pcs",
    defaultQty: 2,
    emoji: "🫑",
    image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "mushroom",
    name: "Mushroom",
    category: "Vegetables",
    defaultUnit: "g",
    defaultQty: 200,
    emoji: "🍄",
    image: "https://images.unsplash.com/photo-1504470695779-75300268aa0e?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "cucumber",
    name: "Cucumber",
    category: "Vegetables",
    defaultUnit: "pcs",
    defaultQty: 2,
    emoji: "🥒",
    image: "https://images.unsplash.com/photo-1447175008436-08417090ea76?auto=format&fit=crop&w=300&q=80"
  },

  // Dairy & Eggs
  {
    id: "egg",
    name: "Egg",
    category: "Dairy & Eggs",
    defaultUnit: "pcs",
    defaultQty: 4,
    emoji: "🥚",
    image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "cheese",
    name: "Cheddar Cheese",
    category: "Dairy & Eggs",
    defaultUnit: "g",
    defaultQty: 150,
    emoji: "🧀",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "milk",
    name: "Milk",
    category: "Dairy & Eggs",
    defaultUnit: "ml",
    defaultQty: 250,
    emoji: "🥛",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "paneer",
    name: "Paneer",
    category: "Dairy & Eggs",
    defaultUnit: "g",
    defaultQty: 200,
    emoji: "🧀",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "butter",
    name: "Butter",
    category: "Dairy & Eggs",
    defaultUnit: "g",
    defaultQty: 50,
    emoji: "🧈",
    image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "yogurt",
    name: "Greek Yogurt",
    category: "Dairy & Eggs",
    defaultUnit: "g",
    defaultQty: 200,
    emoji: "🥣",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=300&q=80"
  },

  // Protein
  {
    id: "chicken",
    name: "Chicken Breast",
    category: "Protein",
    defaultUnit: "g",
    defaultQty: 500,
    emoji: "🍗",
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "salmon",
    name: "Salmon Fillet",
    category: "Protein",
    defaultUnit: "g",
    defaultQty: 300,
    emoji: "🐟",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "tofu",
    name: "Tofu",
    category: "Protein",
    defaultUnit: "g",
    defaultQty: 250,
    emoji: "🧊",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "pork",
    name: "Bacon",
    category: "Protein",
    defaultUnit: "g",
    defaultQty: 150,
    emoji: "🥓",
    image: "https://images.unsplash.com/photo-1528607929212-2636ec44253e?auto=format&fit=crop&w=300&q=80"
  },

  // Fruits
  {
    id: "apple",
    name: "Apple",
    category: "Fruits",
    defaultUnit: "pcs",
    defaultQty: 2,
    emoji: "🍎",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "banana",
    name: "Banana",
    category: "Fruits",
    defaultUnit: "pcs",
    defaultQty: 3,
    emoji: "🍌",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "lemon",
    name: "Lemon",
    category: "Fruits",
    defaultUnit: "pcs",
    defaultQty: 2,
    emoji: "🍋",
    image: "https://images.unsplash.com/photo-1534531141161-e41d133a8979?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "avocado",
    name: "Avocado",
    category: "Fruits",
    defaultUnit: "pcs",
    defaultQty: 1,
    emoji: "🥑",
    image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=300&q=80"
  },

  // Grains & Bakery
  {
    id: "rice",
    name: "Basmati Rice",
    category: "Grains & Bakery",
    defaultUnit: "g",
    defaultQty: 300,
    emoji: "🍚",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "bread",
    name: "Sliced Bread",
    category: "Grains & Bakery",
    defaultUnit: "pcs",
    defaultQty: 4,
    emoji: "🍞",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "pasta",
    name: "Penne Pasta",
    category: "Grains & Bakery",
    defaultUnit: "g",
    defaultQty: 250,
    emoji: "🍝",
    image: "https://images.unsplash.com/photo-1621996346565-e3def616401c?auto=format&fit=crop&w=300&q=80"
  },

  // Spices & Herbs
  {
    id: "chili",
    name: "Green Chili",
    category: "Spices & Herbs",
    defaultUnit: "pcs",
    defaultQty: 2,
    emoji: "🌶️",
    image: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "coriander",
    name: "Coriander / Cilantro",
    category: "Spices & Herbs",
    defaultUnit: "g",
    defaultQty: 50,
    emoji: "🌿",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "ginger",
    name: "Ginger",
    category: "Spices & Herbs",
    defaultUnit: "g",
    defaultQty: 30,
    emoji: "🫚",
    image: "https://images.unsplash.com/photo-1615485290177-3e1e5509930f?auto=format&fit=crop&w=300&q=80"
  },

  // Pantry
  {
    id: "olive_oil",
    name: "Olive Oil",
    category: "Pantry",
    defaultUnit: "ml",
    defaultQty: 50,
    emoji: "🫒",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "soy_sauce",
    name: "Soy Sauce",
    category: "Pantry",
    defaultUnit: "tbsp",
    defaultQty: 2,
    emoji: "🧴",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=300&q=80"
  }
];

export const TASTE_PREFERENCES = [
  { id: "crispy", label: "Crispy", emoji: "🍟" },
  { id: "spicy", label: "Spicy", emoji: "🔥" },
  { id: "sweet", label: "Sweet", emoji: "🍯" },
  { id: "sour", label: "Sour", emoji: "🍋" },
  { id: "creamy", label: "Creamy", emoji: "🥛" },
  { id: "crunchy", label: "Crunchy", emoji: "🥨" },
  { id: "healthy", label: "Healthy", emoji: "🥗" }
];
