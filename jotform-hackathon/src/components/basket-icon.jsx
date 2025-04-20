import { ShoppingBasket } from 'lucide-react';
import { useBasket } from "../context/basket-context";
import { useNavigate } from "react-router-dom";

export default function BasketIcon() {
  const { getUniqueItemCount } = useBasket();
  const navigate = useNavigate();
  const itemCount = getUniqueItemCount();

  return (
    <div className="fixed bottom-4 right-12 z-50 cursor-pointer" onClick={() => navigate("/payment")}>
      <div className="relative flex items-center justify-center bg-primary text-primary-foreground rounded-full w-14 h-14 shadow-lg hover:bg-primary/90 transition-colors">
        <ShoppingBasket size={24} />

        {itemCount > 0 && (
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
            {itemCount}
          </div>
        )}
      </div>
    </div>
  );
}
