export const generateBookCover = (title: string, id: number, category?: string) => {
  return `https://picsum.photos/seed/${title.replace(/\s+/g, '')}-${id}/300/400`;
};