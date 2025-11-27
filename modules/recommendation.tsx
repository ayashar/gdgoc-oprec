"use client";

import { useEffect, useState } from "react";
import Container from "@/components/ui/container";
import Image from "next/image";
import { useReadingList } from "@/lib/store-reading-list";
import type { Book } from "@/lib/types";

const Recommendation = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const readingList = useReadingList((s) => s.readingList);

  useEffect(() => {
    async function load() {
      const arr: Book[] = [];

      while (arr.length < 6) {
        const res = await fetch(
          "https://bukuacak-9bdcb4ef2605.herokuapp.com/api/v1/random_book"
        );
        const data: Book = await res.json();

        const isInReadingList = readingList.some((b) => b._id === data._id);
        const isDuplicate = arr.some((b) => b._id === data._id);

        if (!isInReadingList && !isDuplicate) {
          arr.push(data);
        }
      }

      setBooks(arr);
    }

    load();
  }, [readingList]);

  return (
    <Container>
      <h2 className="text-3xl font-bold border-b-2 border-gray pb-6">
        Books For You
      </h2>

      {books.length === 0 && (
        <p className="text-gray-500 pt-4">Loading recommendations...</p>
      )}

      <div className="md:hidden pt-6 overflow-x-auto">
        <div className="flex gap-[30px]">
          {books.map((book) => (
            <div key={book._id} className="bg-white shrink-0 w-[239px]">
              <Image
                src={book.cover_image}
                alt={book.title}
                width={239}
                height={280}
                className="object-cover aspect-239/280! w-full"
              />

              <div className="p-6 flex flex-col gap-[10px]">
                <h3 className="font-bold text-base">{book.title}</h3>
                <p>{book.tags[0]?.name}</p>
                <p className="font-bold text-primary-green">
                  {book.details.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-[30px] pt-6">
        {books.map((book) => (
          <div key={book._id} className="bg-white">
            <Image
              src={book.cover_image}
              alt={book.title}
              width={239}
              height={280}
              className="object-cover aspect-239/280! w-full"
            />

            <div className="p-6 flex flex-col gap-[10px]">
              <h3 className="font-bold text-base">{book.title}</h3>
              <p>{book.tags[0]?.name}</p>
              <p className="font-bold text-primary-green">
                {book.details.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Recommendation;
