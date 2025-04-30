import { FC } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpIcon, ArrowDownIcon, ShoppingCart } from "lucide-react";

export interface PriceComparisonType {
  store: string;
  price: number;
  difference: number;
}

export interface ProductType {
  id: string;
  name: string;
  manufacturer: string;
  price: number;
  imageUrl: string;
  inStock: boolean;
  rating: number;
  priceComparison: PriceComparisonType[];
}

interface ProductCardProps {
  product: ProductType;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  // Find the lowest price from competitors
  const lowestCompetitorPrice = Math.min(
    ...product.priceComparison.map(item => item.price)
  );
  
  const priceStatus = product.price <= lowestCompetitorPrice ? "best" : "higher";
  
  return (
    <Card className="hover-scale overflow-hidden h-full flex flex-col">
      <CardHeader className="p-0">
        <div className="h-48 overflow-hidden bg-auto-light">
          <img 
            src={product.imageUrl || "https://source.unsplash.com/random/300x200/?car-parts"} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="outline" className="bg-muted text-muted-foreground">
            {product.manufacturer}
          </Badge>
          {product.inStock ? (
            <Badge className="bg-green-100 text-green-800 border-green-200">В наличии</Badge>
          ) : (
            <Badge variant="secondary">Под заказ</Badge>
          )}
        </div>
        
        <CardTitle className="text-base mb-2 line-clamp-2">{product.name}</CardTitle>
        
        <div className="mt-auto">
          <div className="flex justify-between items-center mt-4 mb-2">
            <span className="font-bold text-lg">{product.price.toLocaleString()} ₽</span>
            {priceStatus === "best" ? (
              <Badge className="bg-auto-blue text-white flex items-center gap-1">
                <ArrowDownIcon className="h-3 w-3" />
                Выгодно
              </Badge>
            ) : (
              <Badge variant="outline" className="text-gray-500 flex items-center gap-1">
                <ArrowUpIcon className="h-3 w-3" />
                +{(product.price - lowestCompetitorPrice).toLocaleString()} ₽
              </Badge>
            )}
          </div>
          
          <div className="text-xs text-muted-foreground">
            <p>Сравнение цен:</p>
            <ul className="mt-1 space-y-1">
              {product.priceComparison.slice(0, 2).map((comparison, index) => (
                <li key={index} className="flex justify-between">
                  <span>{comparison.store}</span>
                  <span>{comparison.price.toLocaleString()} ₽</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 gap-2">
        <Button className="w-full">
          <ShoppingCart className="h-4 w-4 mr-2" />
          В корзину
        </Button>
        <Button variant="outline" asChild className="w-full">
          <Link to={`/product/${product.id}`}>Подробнее</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
