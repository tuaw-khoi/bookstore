import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useBooks from "@/hooks/useBook";
import { TBook } from "@/types/book";

const FeaturedBooks = () => {
  const { data } = useBooks();

  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="bg-white mt-5">
      <h2 className=" text-2xl ml-5 py-2">Sách Đặc Biệt</h2>
      <h2 className="border-b-2 mb-5"></h2>
      <Carousel
        opts={{
          align: "start",
        }}
        className=""
      >
        <CarouselContent className="mx-[20px] ">
          {data &&
            data.map((book: TBook, index: number) => (
              <CarouselItem
                key={index}
                className="pl-1 md:basis-1/2 lg:basis-1/4 flex justify-center "
              >
                <div className="pb-3 ">
                  <Card className="hover:shadow-lg rounded-2xl px-4 ">
                    <CardContent className="p-4 ">
                      <img
                        src={book.imgUrl}
                        alt={book.title}
                        className="h-40 w-40 object-cover mb-4"
                      />
                      <h3 className="text-xl font-semibold mb-2">
                        {book.title}
                      </h3>
                      <p className="text-gray-600 h-10">{book.author}</p>
                      <p>
                        {" "}
                        {showMore
                          ? book.description
                          : `${book.description.substring(0, 100)}...`}
                      </p>
                      {book.description.length > 100 && (
                        <button
                          className="text-blue-500 hover:underline"
                          onClick={toggleShowMore}
                        >
                          {showMore ? "Thu gọn" : "Xem thêm"}
                        </button>
                      )}
                      <p className="text-gray-600">{book.genre}</p>
                      <p className="text-gray-600">Price: ${book.price}</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious className="bg-gray-800 text-white rounded-full w-8 h-8 flex items-center justify-center absolute left-10 top-1/2 transform -translate-y-1/2 -translate-x-8 cursor-pointer" />
        <CarouselNext className="bg-gray-800 text-white rounded-full w-8 h-8 flex items-center justify-center absolute right-10 top-1/2 transform -translate-y-1/2 translate-x-8 cursor-pointer" />
      </Carousel>
    </div>
  );
};

export default FeaturedBooks;
