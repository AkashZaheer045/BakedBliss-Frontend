import { Card } from "@/components/ui/card";

interface CategoryCardProps {
  title: string;
  image: string;
  itemCount: number;
  onClick?: () => void;
}

export const CategoryCard = ({ title, image, itemCount, onClick }: CategoryCardProps) => {
  return (
    <Card 
      className="relative overflow-hidden cursor-pointer group hover:shadow-glow transition-all duration-300 transform hover:scale-[1.02] border-primary/10 rounded-lg xs:rounded-xl sm:rounded-2xl"
      onClick={onClick}
    >
      <div className="aspect-square relative">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-2 xs:bottom-3 sm:bottom-4 left-2 xs:left-3 sm:left-4 text-white">
          <h3 className="font-semibold text-xs xs:text-sm sm:text-base md:text-lg leading-tight">{title}</h3>
          <p className="text-[10px] xs:text-xs sm:text-sm opacity-90">{itemCount} items</p>
        </div>
      </div>
    </Card>
  );
};