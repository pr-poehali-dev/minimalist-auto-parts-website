import { FC, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Info, ZoomIn, ZoomOut, Plus, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ProductType } from "@/components/ProductCard";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";

interface CarPart {
  id: string;
  name: string;
  position: { x: number; y: number };
  product: ProductType;
}

const carParts: CarPart[] = [
  {
    id: "brake-pads",
    name: "Тормозные колодки",
    position: { x: 30, y: 60 },
    product: {
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
      ]
    }
  },
  {
    id: "oil-filter",
    name: "Масляный фильтр",
    position: { x: 55, y: 40 },
    product: {
      id: "2",
      name: "Масляный фильтр Mann Filter W 610/6",
      manufacturer: "Mann Filter",
      price: 650,
      imageUrl: "https://source.unsplash.com/random/300x200/?oil-filter",
      inStock: true,
      rating: 4.7,
      priceComparison: [
        { store: "АвтоМир", price: 620, difference: -30 },
        { store: "Exist", price: 750, difference: 100 }
      ]
    }
  },
  {
    id: "shock-absorber",
    name: "Амортизатор",
    position: { x: 80, y: 65 },
    product: {
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
      ]
    }
  }
];

const CarScheme: FC = () => {
  const { vinNumber } = useParams<{ vinNumber: string }>();
  const [zoom, setZoom] = useState(100);
  const [selectedPart, setSelectedPart] = useState<CarPart | null>(null);

  const handleZoom = (delta: number) => {
    setZoom(prev => Math.min(Math.max(prev + delta, 50), 150));
  };

  const handlePartClick = (part: CarPart) => {
    setSelectedPart(part);
  };

  const addToCart = (product: ProductType) => {
    toast({
      title: "Товар добавлен в корзину",
      description: `${product.name} успешно добавлен в корзину`,
    });
  };

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link to="/"><ArrowLeft className="h-4 w-4 mr-1" /> Назад</Link>
            </Button>
            <h1 className="text-2xl font-bold">Схема автомобиля</h1>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Volkswagen Polo Sedan</CardTitle>
                      <CardDescription>
                        VIN: {vinNumber || 'WVWZZZ1KZAM289356'} • 2018 г.в. • 1.6L
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => handleZoom(-10)}
                      >
                        <ZoomOut className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => handleZoom(10)}
                      >
                        <ZoomIn className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="exterior" className="w-full">
                    <TabsList className="w-full mb-4">
                      <TabsTrigger value="exterior" className="flex-1">Внешний вид</TabsTrigger>
                      <TabsTrigger value="interior" className="flex-1">Салон</TabsTrigger>
                      <TabsTrigger value="engine" className="flex-1">Двигатель</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="exterior" className="mt-0">
                      <div className="relative overflow-hidden bg-gray-100 rounded-md" 
                           style={{ height: '400px' }}>
                        <div style={{ 
                          transform: `scale(${zoom / 100})`,
                          transition: 'transform 0.3s ease',
                          transformOrigin: 'center center',
                          height: '100%'
                        }}>
                          <img 
                            src="https://source.unsplash.com/random/800x400/?car-scheme" 
                            alt="Схема автомобиля" 
                            className="w-full h-full object-contain"
                          />
                          
                          {carParts.map(part => (
                            <div 
                              key={part.id}
                              className="absolute cursor-pointer group"
                              style={{ 
                                left: `${part.position.x}%`, 
                                top: `${part.position.y}%`,
                              }}
                              onClick={() => handlePartClick(part)}
                            >
                              <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-md border-2 
                                ${selectedPart?.id === part.id ? 'border-auto-blue' : 'border-gray-200'}
                                hover:border-auto-blue hover:scale-110 transition-all duration-200`}>
                                <Plus className={`h-5 w-5 ${selectedPart?.id === part.id ? 'text-auto-blue' : 'text-gray-600'}`} />
                              </div>
                              <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 translate-y-full 
                                         bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100
                                         transition-opacity pointer-events-none whitespace-nowrap z-10">
                                {part.name}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-center mt-4">
                        <p className="text-sm text-muted-foreground flex items-center">
                          <Info className="h-4 w-4 mr-1" />
                          Нажмите на маркер на схеме, чтобы выбрать деталь
                        </p>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="interior">
                      <div className="h-[400px] bg-gray-100 rounded-md flex items-center justify-center">
                        <p className="text-muted-foreground">Схема салона находится в разработке</p>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="engine">
                      <div className="h-[400px] bg-gray-100 rounded-md flex items-center justify-center">
                        <p className="text-muted-foreground">Схема двигателя находится в разработке</p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card className="border-0 shadow-sm h-full">
                <CardHeader>
                  <CardTitle>Информация о детали</CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedPart ? (
                    <div className="animate-fade-in">
                      <div className="aspect-video w-full overflow-hidden bg-gray-100 rounded-md mb-4">
                        <img 
                          src={selectedPart.product.imageUrl} 
                          alt={selectedPart.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <h3 className="text-lg font-medium mb-2">{selectedPart.product.name}</h3>
                      
                      <div className="flex items-center gap-2 mb-4">
                        <Badge variant="outline">{selectedPart.product.manufacturer}</Badge>
                        {selectedPart.product.inStock ? (
                          <Badge className="bg-green-100 text-green-800 border-green-200">В наличии</Badge>
                        ) : (
                          <Badge variant="secondary">Под заказ</Badge>
                        )}
                      </div>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Цена:</span>
                          <span className="font-bold text-lg">{selectedPart.product.price.toLocaleString()} ₽</span>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <p className="text-sm mb-1">Сравнение цен:</p>
                          {selectedPart.product.priceComparison.map((comparison, index) => (
                            <div key={index} className="flex justify-between items-center text-sm py-1">
                              <span>{comparison.store}</span>
                              <div className="flex items-center">
                                <span>{comparison.price.toLocaleString()} ₽</span>
                                <Badge className={`ml-2 text-xs ${comparison.difference > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                  {comparison.difference > 0 ? '+' : ''}{comparison.difference.toLocaleString()} ₽
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center py-10">
                      <Info className="h-10 w-10 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-1">Выберите деталь на схеме</h3>
                      <p className="text-sm text-muted-foreground">
                        Нажмите на маркер на схеме автомобиля, чтобы увидеть информацию о детали
                      </p>
                    </div>
                  )}
                </CardContent>
                {selectedPart && (
                  <CardFooter className="flex gap-2">
                    <Button 
                      className="flex-1"
                      onClick={() => addToCart(selectedPart.product)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      В корзину
                    </Button>
                    <Button asChild variant="outline" className="flex-1">
                      <Link to={`/product/${selectedPart.product.id}`}>
                        Подробнее
                      </Link>
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CarScheme;
