import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const cookieData = [
  {
    name: "Chocolate Chip Cookies",
    ingredients: [
      "1 cup butter",
      "1 cup white sugar",
      "2 cups flour",
      "2 eggs",
      "1 tsp vanilla extract",
      "2 cups chocolate chips",
    ],
    alternatives: {
      butter: "Use coconut oil as a vegan alternative",
      eggs: "Use flax eggs (1 tbsp flaxseed + 2.5 tbsp water per egg)",
    },
    process:
      "Preheat oven to 180°C. Cream butter and sugar. Add eggs and vanilla. Mix in flour and then fold in chocolate chips. Scoop onto tray and bake 10–12 minutes.",
    rating: 4.8,
    reviews: [
      "Absolutely delicious and easy to make!",
      "My kids loved these! Will bake again."
    ]
  },
  {
    name: "Oatmeal Raisin Cookies",
    ingredients: [
      "1 cup butter",
      "1 cup brown sugar",
      "2 eggs",
      "1.5 cups flour",
      "2 cups rolled oats",
      "1 cup raisins",
      "1 tsp cinnamon",
    ],
    alternatives: {
      raisins: "Use chopped dates or cranberries",
      butter: "Substitute with margarine or vegan butter",
    },
    process:
      "Preheat oven to 180°C. Cream butter and sugar. Add eggs. Stir in flour, oats, cinnamon, then raisins. Bake for 12–15 minutes until golden brown.",
    rating: 4.6,
    reviews: [
      "Super chewy and flavorful!",
      "Perfect with a glass of milk."
    ]
  },
];

export default function CookieWebsite() {
  const [selected, setSelected] = useState(0);
  const [search, setSearch] = useState("");
  const [dark, setDark] = useState(true);
  const [cart, setCart] = useState([]);
  const [newReview, setNewReview] = useState("");

  const filteredCookies = cookieData.filter((cookie) =>
    cookie.name.toLowerCase().includes(search.toLowerCase())
  );

  const theme = dark ? 'bg-gradient-to-br from-neutral-900 to-neutral-800 text-white' : 'bg-white text-black';

  const toggleTheme = () => setDark(!dark);

  const addToCart = (cookieName) => {
    if (!cart.includes(cookieName)) {
      setCart([...cart, cookieName]);
    }
  };

  const handleAddReview = () => {
    if (newReview.trim() !== "") {
      cookieData[selected].reviews.push(newReview);
      setNewReview("");
    }
  };

  return (
    <div className={`min-h-screen ${theme} px-6 py-10 font-sans transition duration-500`}>
      <header className="flex flex-col sm:flex-row justify-between items-center mb-8 border-b pb-4 border-neutral-600">
        <h1 className="text-4xl font-extrabold tracking-tight font-serif">🍪 Cookie Kingdom</h1>
        <div className="flex gap-3 items-center mt-4 sm:mt-0">
          <input
            type="text"
            placeholder="Search cookies..."
            className="px-4 py-2 rounded-lg bg-neutral-700 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button onClick={toggleTheme} className="bg-black hover:bg-neutral-700 text-white px-4 py-2 rounded-xl">
            {dark ? "☀️ Light" : "🌙 Dark"}
          </Button>
        </div>
      </header>

      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {filteredCookies.map((cookie, idx) => (
          <Button
            key={idx}
            className={`bg-black hover:bg-neutral-700 transition-all duration-300 rounded-2xl px-6 py-2 text-lg font-medium shadow-md ${
              selected === idx ? 'ring-2 ring-white' : ''
            }`}
            onClick={() => setSelected(idx)}
          >
            {cookie.name}
          </Button>
        ))}
      </div>

      {filteredCookies.length > 0 && (
        <motion.div
          key={selected}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="shadow-2xl rounded-3xl max-w-5xl mx-auto overflow-hidden bg-opacity-90 bg-neutral-800 text-white">
            <CardContent className="p-6 md:p-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-3xl font-semibold font-serif">{filteredCookies[selected].name}</h2>
                <span className="text-yellow-400 text-lg">⭐ {filteredCookies[selected].rating}/5</span>
              </div>
              <Button onClick={() => addToCart(filteredCookies[selected].name)} className="mb-6 bg-black hover:bg-neutral-700 text-white px-4 py-2 rounded-xl">
                Add to Cart 🛒
              </Button>

              <h3 className="text-2xl font-semibold mb-4 font-serif border-b pb-2">Ingredients</h3>
              <ul className="list-disc list-inside space-y-2 mb-8 text-lg">
                {filteredCookies[selected].ingredients.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h3 className="text-2xl font-semibold mb-4 font-serif border-b pb-2">Process</h3>
              <p className="mb-8 text-lg leading-relaxed text-neutral-300">
                {filteredCookies[selected].process}
              </p>

              <h3 className="text-2xl font-semibold mb-4 font-serif border-b pb-2">Alternatives</h3>
              <ul className="list-disc list-inside space-y-2 text-lg text-neutral-300 mb-8">
                {Object.entries(filteredCookies[selected].alternatives).map(
                  ([key, value], idx) => (
                    <li key={idx}>
                      <strong className="capitalize text-white">{key}:</strong> {value}
                    </li>
                  )
                )}
              </ul>

              <h3 className="text-2xl font-semibold mb-4 font-serif border-b pb-2">Reviews</h3>
              <ul className="space-y-3 text-neutral-400 mb-4">
                {filteredCookies[selected].reviews.map((review, idx) => (
                  <li key={idx} className="border-b border-neutral-600 pb-2 italic">“{review}”</li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Add your review..."
                  className="flex-1 px-4 py-2 rounded-lg bg-neutral-700 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-white"
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                />
                <Button onClick={handleAddReview} className="bg-black hover:bg-neutral-700 text-white px-4 py-2 rounded-xl">
                  Post
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {cart.length > 0 && (
        <div className="max-w-3xl mx-auto mt-10 bg-neutral-800 p-6 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-semibold mb-4">🛍️ Your Cart</h3>
          <ul className="list-disc list-inside text-lg text-neutral-300 space-y-1 mb-4">
            {cart.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-lg font-bold">
            Buy Now 💸
          </Button>
        </div>
      )}

      {filteredCookies.length === 0 && (
        <p className="text-center text-neutral-400 mt-20 text-xl">No cookies found 🍪</p>
      )}
    </div>
  );
}
