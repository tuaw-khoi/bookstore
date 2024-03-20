import { CommandItem, CommandSeparator } from "@/components/ui/command";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Category from "../element/Category";

const Bar = () => {
  return (
    <div>
      <Sheet>
        <SheetTrigger className="px-5 h-full font-medium text-sm cursor-pointer line hover:bg-gray-500">
          All
        </SheetTrigger>
        <SheetContent className="bg-white p-5" side={"left"}>
          <h3 className="text-2xl font-medium">Danh mục sản phẩm</h3>
          <Category />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Bar;
