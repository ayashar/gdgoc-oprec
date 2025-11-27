"use client";

import Container from "@/components/ui/container";
import { useReadingList } from "@/lib/store-reading-list";
import Image from "next/image";

const ReadingList = () => {
  const readingList = useReadingList((s) => s.readingList);

  return (
    <Container>
      <div className="">
        <h2 className="text-3xl font-bold border-b-2 border-gray pb-6">
          Your Reading List
        </h2>

        {readingList.length === 0 && (
          <p className="text-gray-500">Belum ada buku yang kamu simpan</p>
        )}

        <div className="md:hidden pt-6 overflow-x-auto">
          <div className="flex gap-[30px]">
            {readingList.map((book) => (
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
          {readingList.map((book) => (
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
      </div>
    </Container>
  );
};

export default ReadingList;
