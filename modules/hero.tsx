"use client";

import Container from "@/components/ui/container";
import { ChevronLeft, ChevronRight, Eye, Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useReadingList } from "@/lib/store-reading-list";
import { Book } from "@/lib/types";

const Hero = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [index, setIndex] = useState(0);
  const addBook = useReadingList((s) => s.addBook);

  useEffect(() => {
    async function getBooks() {
      const arr: Book[] = [];
      for (let i = 0; i < 4; i++) {
        const res = await fetch(
          "https://bukuacak-9bdcb4ef2605.herokuapp.com/api/v1/random_book"
        );
        arr.push(await res.json());
      }
      setBooks(arr);
    }
    getBooks();
  }, []);

  useEffect(() => {
    if (books.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % books.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [books]);

  if (books.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center text-lg">
        Loading...
      </div>
    );
  }

  const current = books[index];

  const uniqueTags = current.tags.filter(
    (tag, index, self) => index === self.findIndex((t) => t.name === tag.name)
  );

  return (
    <>
      <div className="h-10" />
      <Container>
        <div className="flex flex-row items-center pb-6 w-full md:justify-start justify-center">
          <Link href="/home" className="text-sm font-bold">
            Home
          </Link>
          <ChevronRight className="mx-2 text-text-muted" />
          <span className="text-sm text-text-muted font-medium">Shop</span>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="relative w-full overflow-hidden max-w-[506px]">
            <Image
              src={current.cover_image}
              alt={current.title}
              width={506}
              height={475}
              className="object-cover w-full aspect-506/475 md:max-h-[475px]"
            />

            <button
              onClick={() =>
                setIndex((prev) => (prev - 1 + books.length) % books.length)
              }
              className="absolute left-3 top-1/2 -translate-y-1/2 text-accent p-3 rounded-full transition"
            >
              <ChevronLeft className="size-20 cursor-pointer" />
            </button>

            <button
              onClick={() => setIndex((prev) => (prev + 1) % books.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-accent p-3 rounded-full transition"
            >
              <ChevronRight className="size-20 cursor-pointer" />
            </button>
          </div>

          <div className="flex flex-col items-start gap-8 max-w-2xl">
            <div className="flex gap-2 flex-wrap">
              {uniqueTags.map((tag) => (
                <span
                  key={tag.name}
                  className="px-4 py-1 bg-gray rounded-[40px]"
                >
                  {tag.name}
                </span>
              ))}
            </div>

            <div>
              <h1 className="text-[32px] font-bold line-clamp-2">
                {current.title}
              </h1>
              <p className="text-2xl text-text-primary font-bold line-clamp-4">
                {current.details.price}
              </p>
              <p className="text-base font-bold text-text-secondary">
                Availability:{" "}
                <span className="text-text-blue font-bold"> In Stock</span>
              </p>
            </div>
            <div>
              <p className="text-base text-text-secondary line-clamp-3">
                {current.summary}
              </p>
              <p className="text-base text-text-secondary">
                Author: {current.author.name}
              </p>
            </div>

            <div>
              <p className="text-base font-bold text-text-secondary">
                Pages:{" "}
                <span className="text-text-secondary font-normal">
                  {current.details.total_pages}
                </span>
              </p>
              <p className="text-base font-bold text-text-secondary">
                Publisher:{" "}
                <span className="text-text-secondary font-normal">
                  {current.publisher}
                </span>
              </p>
              <p className="text-base font-bold text-text-secondary">
                ISBN:{" "}
                <span className="text-text-secondary font-normal">
                  {current.details.isbn}
                </span>
              </p>
              <p className="text-base font-bold text-text-secondary">
                Published:{" "}
                <span className="text-text-secondary font-normal">
                  {current.details.published_date}
                </span>
              </p>
            </div>
            <div className="flex flex-row justify-center items-center gap-[10px]">
              <Link
                href="/checkout"
                className="inline-block rounded-xl font-bold bg-primary-blue px-[14px] cursor-pointer py-[10px] text-white"
              >
                Buy Now
              </Link>
              <button
                onClick={() => addBook(current)}
                className="inline-block rounded-full  text-black bg-light-blue p-[10px]"
              >
                <Heart className="size-5" />
              </button>
              <button
                className="inline-block rounded-full  text-black bg-light-blue p-[10px]"
              >
                <ShoppingCart className="size-5" />
              </button>
              <button
                onClick={() => addBook(current)}
                className="inline-block rounded-full  text-black bg-light-blue p-[10px]"
              >
                <Eye className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Hero;
