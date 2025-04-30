import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList, 
  NavigationMenuTrigger, 
  navigationMenuTriggerStyle 
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { ShoppingCart, Tools, Home, BarChart2, FileText } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b shadow-sm bg-white">
        <div className="container py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <ShoppingCart className="h-6 w-6 text-auto-blue" />
            <span className="text-xl font-bold">АвтоЗапчасти</span>
          </Link>
          
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <Home className="w-4 h-4 mr-2" />
                    Главная
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/catalog">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Каталог
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/comparison">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <BarChart2 className="w-4 h-4 mr-2" />
                    Сравнение
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/guide">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <FileText className="w-4 h-4 mr-2" />
                    Инструкция
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </header>
      
      <main className="flex-1 py-8">
        {children}
      </main>
      
      <footer className="bg-auto-black text-white py-8">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">АвтоЗапчасти</h3>
              <p className="text-sm text-gray-300">
                Качественные автозапчасти с доставкой.
                Мониторинг цен и лучшие предложения.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Контакты</h3>
              <p className="text-sm text-gray-300">
                Телефон: +7 (123) 456-78-90<br />
                Email: info@авто-запчасти.рф<br />
                Адрес: г. Москва, ул. Автомобильная, 1
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Информация</h3>
              <ul className="text-sm text-gray-300 space-y-2">
                <li><Link to="/about" className="hover:text-auto-blue transition-colors">О компании</Link></li>
                <li><Link to="/delivery" className="hover:text-auto-blue transition-colors">Доставка</Link></li>
                <li><Link to="/payment" className="hover:text-auto-blue transition-colors">Оплата</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-gray-700 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} АвтоЗапчасти. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
