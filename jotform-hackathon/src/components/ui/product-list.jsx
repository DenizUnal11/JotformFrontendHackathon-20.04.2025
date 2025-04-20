import { useEffect, useState, useRef } from "react";
import ProductCard from "./product-card";

export default function ProductList({ products }) {
  const [visibleCount, setVisibleCount] = useState(20); // how many items to show
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;

      const scrollBottom = el.scrollTop + el.clientHeight;
      const scrollHeight = el.scrollHeight;

      // If near the bottom (e.g. 100px or less from the bottom)
      if (scrollHeight - scrollBottom < 250) {
        setVisibleCount((prev) =>
          prev + 20 > products.length ? products.length : prev + 20
        );
      }
    };

    const currentRef = containerRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, [products.length]);

return (
    <div
        ref={containerRef}
        className="w-[100vw] max-w-[100vw] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 overflow-y-auto max-h-[100vh] p-4 px-[10vw] pt-[5vh] mx-auto"
    >
        {products.slice(0, visibleCount).map((product, index) => (
            <ProductCard key={product.pid || index} product={product} />
        ))}
    </div>
);
}
