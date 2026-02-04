export interface BakeryCategory {
  id: string;
  name: string;
  subName: string;
  price: string;
  description: string;
  folderPath: string;
  themeColor: string;
  gradient: string;
  features: string[];
  stats: { label: string; val: string }[];
  section1: { title: string; subtitle: string };
  section2: { title: string; subtitle: string };
  section3: { title: string; subtitle: string };
  section4: { title: string; subtitle: string };
  detailsSection: { title: string; description: string; imageAlt: string };
  freshnessSection: { title: string; description: string };
  buyNowSection: {
    price: string;
    unit: string;
    processingParams: string[];
    deliveryPromise: string;
    returnPolicy: string;
  };
}

export const bakeryCategories: BakeryCategory[] = [
  {
    id: "breads",
    name: "Artisan Breads",
    subName: "Crusty perfection.",
    price: "Rs. 280",
    description: "Stone-baked daily - No preservatives - Traditional recipes",
    folderPath: "/images/breads",
    themeColor: "#D4A574",
    gradient: "linear-gradient(135deg, #D4A574 0%, #8B6914 100%)",
    features: ["Stone-baked", "No preservatives", "Traditional recipes"],
    stats: [{ label: "Rise Time", val: "24h" }, { label: "Crust", val: "Crispy" }, { label: "Organic", val: "100%" }],
    section1: { title: "Artisan Breads.", subtitle: "Crusty perfection." },
    section2: { title: "Slow-fermented excellence.", subtitle: "24-hour natural fermentation for deep, complex flavors." },
    section3: { title: "Stone-baked tradition.", subtitle: "Each loaf kissed by flames in our heritage stone oven." },
    section4: { title: "From grain to golden crust.", subtitle: "" },
    detailsSection: {
      title: "The Art of Bread",
      description: "Our master bakers rise before dawn to craft each loaf by hand. Using locally-sourced organic flour and a 100-year-old sourdough starter, we create bread that nourishes body and soul. The golden crust crackles as you break it, revealing a soft, airy interior that's simply irresistible.",
      imageAlt: "Artisan Bread Details"
    },
    freshnessSection: {
      title: "Fresh Every Morning",
      description: "We believe bread should be eaten fresh. That's why we bake in small batches throughout the day, ensuring you always get bread that's still warm from the oven. No day-old bread, no compromises."
    },
    buyNowSection: {
      price: "Rs. 280",
      unit: "per loaf",
      processingParams: ["Stone Baked", "24h Fermented", "No Additives"],
      deliveryPromise: "Fresh delivery within 2 hours. Wrapped warm from our ovens.",
      returnPolicy: "Not crusty enough? Full replacement guaranteed."
    }
  },
  {
    id: "burger",
    name: "Gourmet Burgers",
    subName: "Flame-grilled glory.",
    price: "Rs. 480",
    description: "Premium patties - House-baked buns - Secret sauce",
    folderPath: "/images/burger",
    themeColor: "#E74C3C",
    gradient: "linear-gradient(135deg, #E74C3C 0%, #FF6B35 100%)",
    features: ["Premium beef", "Brioche buns", "Secret sauce"],
    stats: [{ label: "Char", val: "Perfect" }, { label: "Juice", val: "100%" }, { label: "Patty", val: "200g" }],
    section1: { title: "Gourmet Burgers.", subtitle: "Flame-grilled glory." },
    section2: { title: "Seared to perfection.", subtitle: "Each patty kissed by open flames for that smoky char." },
    section3: { title: "Stack of legends.", subtitle: "Premium ingredients layered for the ultimate bite." },
    section4: { title: "From grill to your hands.", subtitle: "" },
    detailsSection: {
      title: "The Perfect Stack",
      description: "We source our beef from local farms, grinding it fresh daily. Our brioche buns are baked in-house, brushed with butter and toasted to golden perfection. Add our signature secret sauce, crisp lettuce, and ripe tomatoes—this is burger excellence.",
      imageAlt: "Gourmet Burger Details"
    },
    freshnessSection: {
      title: "Made to Order",
      description: "Every burger is assembled fresh upon ordering. We never pre-make or warm up. From the sizzle of the grill to the wrap of the paper, your burger is crafted specifically for you."
    },
    buyNowSection: {
      price: "Rs. 480",
      unit: "per burger",
      processingParams: ["Made Fresh", "Premium Beef", "Hot Delivery"],
      deliveryPromise: "Delivered hot and ready. Special insulated packaging.",
      returnPolicy: "Cold burger? Immediate replacement."
    }
  },
  {
    id: "cookies",
    name: "Gooey Cookies",
    subName: "Warm centers, golden edges.",
    price: "Rs. 360",
    description: "Belgian chocolate - Brown butter - Sea salt finish",
    folderPath: "/images/cookies",
    themeColor: "#8B4513",
    gradient: "linear-gradient(135deg, #8B4513 0%, #D2691E 100%)",
    features: ["Belgian chocolate", "Brown butter", "Sea salt"],
    stats: [{ label: "Center", val: "Gooey" }, { label: "Edge", val: "Crisp" }, { label: "Chips", val: "72%" }],
    section1: { title: "Gooey Cookies.", subtitle: "Warm centers, golden edges." },
    section2: { title: "Chocolate in every bite.", subtitle: "Generous chunks of Belgian chocolate melting at the core." },
    section3: { title: "Brown butter magic.", subtitle: "Nutty, caramel notes from perfectly browned butter." },
    section4: { title: "Baked, not manufactured.", subtitle: "" },
    detailsSection: {
      title: "Cookie Perfection",
      description: "Our cookies are baked in small batches to achieve the perfect texture—crispy edges that give way to a warm, gooey center. We use 72% Belgian dark chocolate chunks, brown butter for depth, and a finishing sprinkle of flaky sea salt.",
      imageAlt: "Cookie Details"
    },
    freshnessSection: {
      title: "Fresh from the Oven",
      description: "We bake cookies every hour. When you order, you're getting cookies that were in the oven minutes ago. That's our freshness promise."
    },
    buyNowSection: {
      price: "Rs. 360",
      unit: "per cookie",
      processingParams: ["Baked Fresh", "Belgian Chocolate", "Hand-Crafted"],
      deliveryPromise: "Delivered warm in insulated packaging.",
      returnPolicy: "Not gooey? Full refund."
    }
  },
  {
    id: "cupcakes",
    name: "Dreamy Cupcakes",
    subName: "Fluffy clouds of joy.",
    price: "Rs. 290",
    description: "Swiss meringue - Real vanilla - Seasonal flavors",
    folderPath: "/images/cupcakes",
    themeColor: "#FF69B4",
    gradient: "linear-gradient(135deg, #FF69B4 0%, #FF1493 100%)",
    features: ["Swiss meringue", "Real vanilla", "Seasonal flavors"],
    stats: [{ label: "Frosting", val: "Whipped" }, { label: "Cake", val: "Moist" }, { label: "Love", val: "100%" }],
    section1: { title: "Dreamy Cupcakes.", subtitle: "Fluffy clouds of joy." },
    section2: { title: "Swirled with love.", subtitle: "Each frosting peak a masterpiece of buttercream artistry." },
    section3: { title: "Light as air.", subtitle: "Our secret recipe creates the fluffiest cake base." },
    section4: { title: "Happiness, baked in.", subtitle: "" },
    detailsSection: {
      title: "Cupcake Dreams",
      description: "Our cupcakes feature a moist, tender crumb topped with silky Swiss meringue buttercream. We use real Madagascar vanilla, fresh seasonal fruits, and premium Belgian chocolate. Each cupcake is a miniature celebration.",
      imageAlt: "Cupcake Details"
    },
    freshnessSection: {
      title: "Baked with Care",
      description: "We bake our cupcakes in small batches throughout the day. The frosting is piped fresh, never day-old. Each cupcake is a tiny work of art."
    },
    buyNowSection: {
      price: "Rs. 290",
      unit: "per cupcake",
      processingParams: ["Fresh Baked", "Swiss Buttercream", "Artisan Crafted"],
      deliveryPromise: "Carefully packaged to preserve every swirl.",
      returnPolicy: "Damaged in transit? Instant replacement."
    }
  },
  {
    id: "desserts",
    name: "Signature Desserts",
    subName: "Sweet sophistication.",
    price: "Rs. 650",
    description: "Patisserie craft - Single-origin cocoa - Seasonal fruits",
    folderPath: "/images/desserts",
    themeColor: "#9B59B6",
    gradient: "linear-gradient(135deg, #9B59B6 0%, #8E44AD 100%)",
    features: ["Patisserie craft", "Single-origin cocoa", "Seasonal fruits"],
    stats: [{ label: "Layers", val: "7" }, { label: "Finish", val: "Mirror" }, { label: "Art", val: "100%" }],
    section1: { title: "Signature Desserts.", subtitle: "Sweet sophistication." },
    section2: { title: "Layers of luxury.", subtitle: "Multiple textures harmonizing in every spoonful." },
    section3: { title: "Patisserie precision.", subtitle: "French techniques, local ingredients, unforgettable taste." },
    section4: { title: "Dessert as art.", subtitle: "" },
    detailsSection: {
      title: "Dessert Excellence",
      description: "Our pastry chefs trained in Paris bring European patisserie techniques to every creation. From mirror-glazed entremets to delicate tarts, each dessert is a symphony of flavors and textures—crispy, creamy, fruity, and indulgent.",
      imageAlt: "Dessert Details"
    },
    freshnessSection: {
      title: "Crafted Daily",
      description: "Our desserts are made fresh daily. We source seasonal fruits and single-origin chocolate to ensure every component is at its peak. No freezing, no shortcuts."
    },
    buyNowSection: {
      price: "Rs. 650",
      unit: "per serving",
      processingParams: ["French Techniques", "Premium Ingredients", "Made Fresh"],
      deliveryPromise: "Cold chain delivery maintains perfect texture.",
      returnPolicy: "100% satisfaction guaranteed."
    }
  },
  {
    id: "pasta",
    name: "Fresh Pasta",
    subName: "Hand-rolled comfort.",
    price: "Rs. 820",
    description: "Semolina durum - Farm eggs - Chef's sauces",
    folderPath: "/images/pasta",
    themeColor: "#F5DEB3",
    gradient: "linear-gradient(135deg, #F5DEB3 0%, #DEB887 100%)",
    features: ["Fresh semolina", "Farm eggs", "Chef's sauces"],
    stats: [{ label: "Made", val: "Fresh" }, { label: "Eggs", val: "Free Range" }, { label: "Al Dente", val: "Perfect" }],
    section1: { title: "Fresh Pasta.", subtitle: "Hand-rolled comfort." },
    section2: { title: "Silky strands of joy.", subtitle: "Each ribbon hand-cut for that perfect sauce grip." },
    section3: { title: "Egg-rich perfection.", subtitle: "Free-range eggs for golden, silky pasta." },
    section4: { title: "Simplicity, elevated.", subtitle: "" },
    detailsSection: {
      title: "Pasta Tradition",
      description: "Our pasta is made fresh daily using premium semolina flour and free-range eggs. Hand-rolled and hand-cut, each strand has the perfect texture to hold our house-made sauces. This is pasta the way nonna made it.",
      imageAlt: "Pasta Details"
    },
    freshnessSection: {
      title: "Made This Morning",
      description: "We make our pasta fresh every morning. No dried pasta, no shortcuts. The difference is in every bite—silky, toothsome, and full of eggy richness."
    },
    buyNowSection: {
      price: "Rs. 820",
      unit: "per portion",
      processingParams: ["Fresh Made", "Hand Rolled", "Free Range Eggs"],
      deliveryPromise: "Delivered hot with sauce on the side.",
      returnPolicy: "Not al dente? We'll replace it."
    }
  },
  {
    id: "pastries",
    name: "French Pastries",
    subName: "Buttery layers of bliss.",
    price: "Rs. 520",
    description: "Pure butter - 72 layers - Paris-trained chefs",
    folderPath: "/images/pastries",
    themeColor: "#FFD700",
    gradient: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
    features: ["Pure butter", "72 layers", "Paris-trained"],
    stats: [{ label: "Butter", val: "100%" }, { label: "Layers", val: "72" }, { label: "Flaky", val: "Yes" }],
    section1: { title: "French Pastries.", subtitle: "Buttery layers of bliss." },
    section2: { title: "Shatter and melt.", subtitle: "Delicate layers that shatter into golden flakes." },
    section3: { title: "Paris in every bite.", subtitle: "Techniques honed in the finest French boulangeries." },
    section4: { title: "Laminated perfection.", subtitle: "" },
    detailsSection: {
      title: "Laminated Excellence",
      description: "Our croissants and Danish pastries are made with pure French butter, folded 72 times to create impossibly flaky layers. Our chef trained at Ladurée in Paris and brings that expertise to every buttery creation.",
      imageAlt: "Pastry Details"
    },
    freshnessSection: {
      title: "Baked at Dawn",
      description: "We start laminating at 3 AM to have fresh pastries by opening. The butter must be cold, the technique precise. The result? Golden, flaky layers that shatter at the touch."
    },
    buyNowSection: {
      price: "Rs. 520",
      unit: "per piece",
      processingParams: ["Pure Butter", "72 Layers", "Fresh Baked"],
      deliveryPromise: "Best enjoyed within 2 hours. We deliver fast.",
      returnPolicy: "Not flaky enough? We'll replace it."
    }
  },
  {
    id: "pizza",
    name: "Wood-Fired Pizza",
    subName: "900°F of flavor.",
    price: "Rs. 1350",
    description: "48hr dough - San Marzano - Wood-fired oven",
    folderPath: "/images/pizza",
    themeColor: "#FF6347",
    gradient: "linear-gradient(135deg, #FF6347 0%, #FFD700 100%)",
    features: ["48hr dough", "San Marzano", "Wood-fired"],
    stats: [{ label: "Temp", val: "900°F" }, { label: "Time", val: "90s" }, { label: "Char", val: "Leopard" }],
    section1: { title: "Wood-Fired Pizza.", subtitle: "900°F of flavor." },
    section2: { title: "Blistered perfection.", subtitle: "Leopard-spotted crust from our imported Italian oven." },
    section3: { title: "San Marzano magic.", subtitle: "DOP tomatoes crushed by hand for authentic sauce." },
    section4: { title: "Naples to your table.", subtitle: "" },
    detailsSection: {
      title: "Neapolitan Soul",
      description: "Our pizza dough ferments for 48 hours, developing complex flavors and an airy, chewy texture. We top with DOP San Marzano tomatoes, fresh mozzarella, and extra virgin olive oil. Then, 90 seconds in our 900°F wood-fired oven creates magic.",
      imageAlt: "Pizza Details"
    },
    freshnessSection: {
      title: "Straight from the Flames",
      description: "Pizza waits for no one. We fire your pizza only when your order comes in. The blistered crust, melty cheese, and bubbling sauce arrive at your door minutes after leaving our oven."
    },
    buyNowSection: {
      price: "Rs. 1350",
      unit: "per 12\" pizza",
      processingParams: ["Wood-Fired", "48hr Dough", "DOP Tomatoes"],
      deliveryPromise: "Insulated box keeps heat. Delivered within 30 mins.",
      returnPolicy: "Cold pizza? Full refund."
    }
  },
  {
    id: "snacks",
    name: "Savory Snacks",
    subName: "Crunchy satisfaction.",
    price: "Rs. 250",
    description: "House-made - Bold spices - Addictively good",
    folderPath: "/images/snacks",
    themeColor: "#FF8C00",
    gradient: "linear-gradient(135deg, #FF8C00 0%, #8B4513 100%)",
    features: ["House-made", "Bold spices", "No MSG"],
    stats: [{ label: "Crunch", val: "Max" }, { label: "Spice", val: "Custom" }, { label: "Fresh", val: "Daily" }],
    section1: { title: "Savory Snacks.", subtitle: "Crunchy satisfaction." },
    section2: { title: "Bold, unapologetic flavor.", subtitle: "Spiced to perfection with our secret blends." },
    section3: { title: "Crunch you can hear.", subtitle: "Texture that satisfies from first bite to last." },
    section4: { title: "Snacking, elevated.", subtitle: "" },
    detailsSection: {
      title: "Snack Science",
      description: "Our savory snacks are crafted in-house using premium ingredients and bold spice blends. From crispy samosas to spiced nuts, every bite delivers maximum crunch and flavor without any artificial additives.",
      imageAlt: "Snack Details"
    },
    freshnessSection: {
      title: "Made Fresh Daily",
      description: "We fry and bake our snacks fresh throughout the day. No stale bags, no week-old batches. Just peak crunch and flavor in every serving."
    },
    buyNowSection: {
      price: "Rs. 250",
      unit: "per portion",
      processingParams: ["Made Fresh", "No MSG", "Bold Spices"],
      deliveryPromise: "Hot and crispy, packaged to preserve crunch.",
      returnPolicy: "Not crunchy? We'll replace it."
    }
  }
];

export default bakeryCategories;
