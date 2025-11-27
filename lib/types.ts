export type Book = {
  _id: string;
  tags: { name: string }[];
  title: string;
  cover_image: string;
  author: { name: string };
  summary: string;
  publisher: string;
  details: {
    price: string;
    total_pages: string;
    isbn: string;
    published_date: string;
  };
};
