import { FC } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SearchIcon, TrendingUpIcon, ThumbsUpIcon, ShieldCheckIcon } from "lucide-react";
import Layout from "@/components/Layout";
import ProductCard, { ProductType } from "@/components/ProductCard";

const featuredProducts: ProductType[] = [
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
    ]
  },
  {
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
    ]
  }
];

const Index: FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-auto-black text-white py-16">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
              Автозапчасти с умным ценовым мониторингом
            </h1>
            <p className="text-lg mb-8 text-gray-300">
              Находите лучшие предложения на рынке автозапчастей благодаря нашей системе 
              мониторинга цен и сравнения производителей.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-auto-blue hover:bg-blue-600">
                <SearchIcon className="mr-2 h-5 w-5" />
                Найти запчасти
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                <TrendingUpIcon className="mr-2 h-5 w-5" />
                Сравнить цены
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-auto-light">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Почему выбирают нас</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center animate-scale-in">
              <div className="w-14 h-14 rounded-full bg-auto-blue/10 flex items-center justify-center mb-4">
                <TrendingUpIcon className="h-7 w-7 text-auto-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2">Мониторинг цен</h3>
              <p className="text-muted-foreground">
                Мы отслеживаем цены на автозапчасти в крупнейших магазинах, чтобы вы всегда платили меньше.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center animate-scale-in">
              <div className="w-14 h-14 rounded-full bg-auto-blue/10 flex items-center justify-center mb-4">
                <ThumbsUpIcon className="h-7 w-7 text-auto-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2">Проверенное качество</h3>
              <p className="text-muted-foreground">
                Мы сотрудничаем только с надежными поставщиками и производителями с хорошей репутацией.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center animate-scale-in">
              <div className="w-14 h-14 rounded-full bg-auto-blue/10 flex items-center justify-center mb-4">
                <ShieldCheckIcon className="h-7 w-7 text-auto-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2">Гарантия подлинности</h3>
              <p className="text-muted-foreground">
                Каждая запчасть проходит проверку на подлинность перед отправкой клиенту.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Популярные запчасти</h2>
            <Button variant="outline" asChild>
              <Link to="/catalog">Смотреть все</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-auto-blue text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Не нашли нужную запчасть?</h2>
            <p className="text-lg mb-8">
              Оставьте заявку, и наши специалисты помогут подобрать необходимые детали 
              по лучшей цене для вашего автомобиля.
            </p>
            <Button size="lg" variant="secondary" className="bg-white text-auto-blue hover:bg-gray-100">
              Оставить заявку
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
