import { create } from "zustand";
import { Book } from "@/lib/types";

interface ReadingListState {
  readingList: Book[];
  addBook: (book: Book) => void;
}

export const useReadingList = create<ReadingListState>((set) => ({
  readingList: [],
  addBook: (book) =>
    set((state) => {
      if (state.readingList.some((b) => b._id === book._id)) return state;
      return { readingList: [...state.readingList, book] };
    }),
}));
