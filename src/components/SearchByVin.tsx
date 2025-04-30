import { FC, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, AlertCircle, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

const SearchByVin: FC = () => {
  const [vinNumber, setVinNumber] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [searchSuccess, setSearchSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    // Reset states
    setSearchError("");
    setSearchSuccess(false);
    
    // Validate VIN number (basic validation)
    if (!vinNumber || vinNumber.length !== 17) {
      setSearchError("VIN номер должен содержать 17 символов");
      return;
    }

    // Simulate search process
    setIsSearching(true);
    
    setTimeout(() => {
      setIsSearching(false);
      setSearchSuccess(true);
      
      // Simulate redirect to car model page after successful search
      setTimeout(() => {
        navigate(`/car-scheme/${vinNumber}`);
      }, 1000);
    }, 1500);
  };

  const handleVinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    setVinNumber(value);
  };

  return (
    <Card className="w-full shadow-sm border-0">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Поиск запчастей по VIN</CardTitle>
        <CardDescription>
          Введите VIN номер вашего автомобиля для точного подбора запчастей
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="vin" className="w-full">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="vin" className="flex-1">По VIN номеру</TabsTrigger>
            <TabsTrigger value="model" className="flex-1">По марке/модели</TabsTrigger>
          </TabsList>
          
          <TabsContent value="vin" className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Input
                  value={vinNumber}
                  onChange={handleVinChange}
                  placeholder="Например: WVWZZZ1KZAM289356"
                  className="pr-10"
                  maxLength={17}
                />
                {vinNumber && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono">
                    {vinNumber.length}/17
                  </div>
                )}
              </div>
              <Button 
                onClick={handleSearch} 
                disabled={isSearching}
                className="min-w-24"
              >
                {isSearching ? "Поиск..." : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Найти
                  </>
                )}
              </Button>
            </div>
            
            <div className="text-xs text-muted-foreground">
              <p>Где найти VIN номер: на лобовом стекле, в техпаспорте или под капотом</p>
            </div>
            
            {searchError && (
              <Alert variant="destructive" className="animate-fade-in">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Ошибка</AlertTitle>
                <AlertDescription>{searchError}</AlertDescription>
              </Alert>
            )}
            
            {searchSuccess && (
              <Alert className="bg-green-50 text-green-800 border-green-200 animate-fade-in">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertTitle>Автомобиль найден</AlertTitle>
                <AlertDescription>
                  Переходим на страницу подбора запчастей для вашего автомобиля...
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>
          
          <TabsContent value="model">
            <div className="flex flex-col gap-4">
              <p className="text-sm text-muted-foreground">
                Выберите марку, модель и год выпуска вашего автомобиля для подбора запчастей
              </p>
              <Button asChild>
                <a href="/car-selector">Перейти к выбору автомобиля</a>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SearchByVin;
