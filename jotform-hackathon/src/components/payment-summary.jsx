import { useBasket } from "../context/basket-context";

export default function PaymentSummary() {
  const { basketItems, getBasketTotal } = useBasket();

  if (basketItems.length === 0) {
    return <p className="text-gray-500">Your basket is empty.</p>;
  }

  return (
    <div className="space-y-4">
      {basketItems.map((item) => {
        // Parse images
        let imageUrl = "https://via.placeholder.com/80";
        try {
          if (item.images) {
            const images = JSON.parse(item.images);
            if (images.length > 0 && images[0]) {
              imageUrl = images[0];
            }
          }
        } catch (error) {
          console.error("Error parsing images:", error);
        }

        return (
          <div key={item.pid} className="flex items-center border-b pb-4">
            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
              <img
                src={imageUrl || "/placeholder.svg"}
                alt={item.name || "Product"}
                className="object-contain p-1 w-full h-full"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/80";
                }}
              />
            </div>
            <div className="ml-4 flex-grow">
              <h3 className="text-sm font-medium">{item.name}</h3>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
            </div>
            <p className="text-sm font-medium">
              ${(Number.parseFloat(item.price) * Number.parseInt(item.quantity)).toFixed(2)}
            </p>
          </div>
        );
      })}

      <div className="flex justify-between pt-4 font-medium">
        <p>Total</p>
        <p>${getBasketTotal()}</p>
      </div>
    </div>
  );
}
