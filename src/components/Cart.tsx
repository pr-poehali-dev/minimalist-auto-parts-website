import { FC, useState } from "react";
import { ShoppingCart, X, Trash2, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet";
import { ProductType } from "./ProductCard";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Link } from "react-router-dom";

interface CartItemType extends ProductType {
  quantity: number;
}

const mockCartItems: CartItemType[] = [
  {
    id: "1",
    name: "Тормозные колодки Brembo Premium Ceramic",
    manufacturer: "Brembo",
    price: 3200,
    imageUrl: "https://source.unsplash.com/random/300x200/?brake-pads",
    inStock: true,
    rating: 4.8,
    priceComparison: [
      { store: "АвтоМир", price: 3600, difference: 400 },
      { store: "Exist", price: 3400, difference: 200 }
    ],
    quantity: 1
  },
  {
    id: "3",
    name: "Амортизатор задний Kayaba Excel-G",
    manufacturer: "Kayaba",
    price: 4200,
    imageUrl: "https://source.unsplash.com/random/300x200/?shock-absorber",
    inStock: false,
    rating: 4.6,
    priceComparison: [
      { store: "АвтоМир", price: 4500, difference: 300 },
      { store: "Exist", price: 4350, difference: 150 }
    ],
    quantity: 2
  }
];

const Cart: FC = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>(mockCartItems);
  const [isOpen, setIsOpen] = useState(false);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(items => 
      items.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(1, item.quantity + delta) } 
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-[1.2rem] w-[1.2rem]" />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader className="text-left">
          <SheetTitle className="text-xl flex items-center">
            <ShoppingCart className="mr-2 h-5 w-5" />
            Корзина
            <span className="ml-2 text-sm text-muted-foreground">
              ({totalItems} {totalItems === 1 ? 'товар' : totalItems > 1 && totalItems < 5 ? 'товара' : 'товаров'})
            </span>
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-4">
              <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-1">Корзина пуста</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Добавьте товары из каталога, чтобы они появились здесь
              </p>
              <SheetClose asChild>
                <Button asChild>
                  <Link to="/catalog">Перейти в каталог</Link>
                </Button>
              </SheetClose>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-3 pb-4 animate-fade-in">
                  <div className="h-16 w-16 rounded overflow-hidden bg-muted flex-shrink-0">
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium line-clamp-1">{item.name}</h4>
                    <p className="text-xs text-muted-foreground mb-1">{item.manufacturer}</p>
                    <div className="flex items-center mt-1">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-6 w-6 rounded-full"
                        onClick={() => updateQuantity(item.id, -1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-6 w-6 rounded-full"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <span className="ml-auto font-medium">{(item.price * item.quantity).toLocaleString()} ₽</span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-7 w-7 ml-1"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <>
            <Separator />
            <div className="py-4">
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Подытог</span>
                <span>{totalPrice.toLocaleString()} ₽</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-muted-foreground">Доставка</span>
                <span>Рассчитывается при оформлении</span>
              </div>
              <div className="flex justify-between text-lg font-medium">
                <span>Итого</span>
                <span>{totalPrice.toLocaleString()} ₽</span>
              </div>
            </div>

            <SheetFooter className="sm:justify-start gap-2">
              <SheetClose asChild>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/catalog">Продолжить покупки</Link>
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button asChild className="w-full">
                  <Link to="/checkout">Оформить заказ</Link>
                </Button>
              </SheetClose>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
