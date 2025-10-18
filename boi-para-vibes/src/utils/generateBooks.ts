import { Book } from '@/contexts/CartContext';

const generatePrice = () => {
  const base = Math.floor(Math.random() * 800) + 200;
  const original = base + Math.floor(Math.random() * 300) + 100;
  return { price: `₹${base}`, originalPrice: `₹${original}` };
};

const generateRating = () => Number((Math.random() * 1.5 + 3.5).toFixed(1));
const generateReviews = () => Math.floor(Math.random() * 500) + 50;

const literatureBooks = [
  { title: "পদ্মাবতী", author: "আলাওল" },
  { title: "চণ্ডীমঙ্গল", author: "মুকুন্দরাম চক্রবর্তী" },
  { title: "মনসামঙ্গল", author: "বিজয়গুপ্ত" },
  { title: "অন্নদামঙ্গল", author: "ভারতচন্দ্র রায়গুণাকর" },
  { title: "কালিকামঙ্গল", author: "কবিকঙ্কণ মুকুন্দরাম" },
  { title: "ধর্মমঙ্গল", author: "ঘনরাম চক্রবর্তী" },
  { title: "বিদ্যাসুন্দর", author: "ভারতচন্দ্র রায়গুণাকর" },
  { title: "রসমঞ্জরী", author: "ভানুদত্ত" },
  { title: "কৃষ্ণকীর্তন", author: "বড়ু চণ্ডীদাস" },
  { title: "শ্রীকৃষ্ণবিজয়", author: "গুণরাজ খান" },
  { title: "চৈতন্যভাগবত", author: "বৃন্দাবনদাস ঠাকুর" },
  { title: "চৈতন্যচরিতামৃত", author: "কৃষ্ণদাস কবিরাজ" },
  { title: "পদাবলী", author: "বিদ্যাপতি" },
  { title: "গোবিন্দদাসের পদাবলী", author: "গোবিন্দদাস" },
  { title: "জ্ঞানদাসের পদাবলী", author: "জ্ঞানদাস" },
  { title: "রামপ্রসাদের শাক্তপদাবলী", author: "রামপ্রসাদ সেন" },
  { title: "কমলাকান্তের দপ্তর", author: "বঙ্কিমচন্দ্র চট্টোপাধ্যায়" },
  { title: "বিষবৃক্ষ", author: "বঙ্কিমচন্দ্র চট্টোপাধ্যায়" },
  { title: "কৃষ্ণকান্তের উইল", author: "বঙ্কিমচন্দ্র চট্টোপাধ্যায়" },
  { title: "রাজসিংহ", author: "বঙ্কিমচন্দ্র চট্টোপাধ্যায়" }
];

const fictionTitles = [
  { title: "The Catcher in the Rye", author: "J.D. Salinger" },
  { title: "Lord of the Flies", author: "William Golding" },
  { title: "Brave New World", author: "Aldous Huxley" },
  { title: "The Hobbit", author: "J.R.R. Tolkien" },
  { title: "Fahrenheit 451", author: "Ray Bradbury" },
  { title: "Animal Farm", author: "George Orwell" },
  { title: "Of Mice and Men", author: "John Steinbeck" },
  { title: "The Grapes of Wrath", author: "John Steinbeck" },
  { title: "Wuthering Heights", author: "Emily Brontë" },
  { title: "Jane Eyre", author: "Charlotte Brontë" }
];

const academicTitles = [
  { title: "Linear Algebra", author: "Gilbert Strang" },
  { title: "Physics for Scientists", author: "Raymond Serway" },
  { title: "Chemistry: The Central Science", author: "Theodore Brown" },
  { title: "Molecular Biology", author: "David Clark" },
  { title: "Statistics for Engineers", author: "Douglas Montgomery" },
  { title: "Computer Networks", author: "Andrew Tanenbaum" },
  { title: "Operating Systems", author: "Abraham Silberschatz" },
  { title: "Database Systems", author: "Ramez Elmasri" },
  { title: "Software Engineering", author: "Ian Sommerville" },
  { title: "Artificial Intelligence", author: "Stuart Russell" }
];

const poetryTitles = [
  { title: "বলাকা", author: "রবীন্দ্রনাথ ঠাকুর" },
  { title: "সোনার তরী", author: "রবীন্দ্রনাথ ঠাকুর" },
  { title: "চিত্রা", author: "রবীন্দ্রনাথ ঠাকুর" },
  { title: "কথা", author: "রবীন্দ্রনাথ ঠাকুর" },
  { title: "কল্পনা", author: "রবীন্দ্রনাথ ঠাকুর" },
  { title: "মানসী", author: "রবীন্দ্রনাথ ঠাকুর" },
  { title: "প্রভাত সঙ্গীত", author: "রবীন্দ্রনাথ ঠাকুর" },
  { title: "সন্ধ্যা সঙ্গীত", author: "রবীন্দ্রনাথ ঠাকুর" },
  { title: "পূরবী", author: "রবীন্দ্রনাথ ঠাকুর" },
  { title: "পশ্চিমা", author: "রবীন্দ্রনাথ ঠাকুর" },
  { title: "শিশু", author: "রবীন্দ্রনাথ ঠাকুর" },
  { title: "খেয়া", author: "রবীন্দ্রনাথ ঠাকুর" },
  { title: "পুনশ্চ", author: "রবীন্দ্রনাথ ঠাকুর" },
  { title: "শেষ লেখা", author: "রবীন্দ্রনাথ ঠাকুর" },
  { title: "সাধনা", author: "কাজী নজরুল ইসলাম" },
  { title: "বিষের বাঁশী", author: "কাজী নজরুল ইসলাম" },
  { title: "ভাঙ্গার গান", author: "কাজী নজরুল ইসলাম" },
  { title: "ছায়ানট", author: "জীবনানন্দ দাশ" },
  { title: "ধূসর মেয়ে", author: "জীবনানন্দ দাশ" },
  { title: "রূপসী বাংলা", author: "জীবনানন্দ দাশ" }
];

const philosophyTitles = [
  { title: "Thus Spoke Zarathustra", author: "Friedrich Nietzsche" },
  { title: "The Phenomenology of Spirit", author: "G.W.F. Hegel" },
  { title: "Discourse on Method", author: "René Descartes" },
  { title: "An Essay Concerning Human Understanding", author: "John Locke" },
  { title: "A Treatise of Human Nature", author: "David Hume" },
  { title: "The Social Contract", author: "Jean-Jacques Rousseau" },
  { title: "Leviathan", author: "Thomas Hobbes" },
  { title: "The Prince", author: "Niccolò Machiavelli" },
  { title: "Utopia", author: "Thomas More" },
  { title: "The City of God", author: "Augustine of Hippo" }
];

const rareTitles = [
  { title: "The Book of Kells", author: "Celtic Monks" },
  { title: "Codex Leicester", author: "Leonardo da Vinci" },
  { title: "The Rothschild Prayerbook", author: "Unknown" },
  { title: "Bay Psalm Book", author: "Richard Mather" },
  { title: "The St. Cuthbert Gospel", author: "Unknown" },
  { title: "The Magna Carta", author: "English Barons" },
  { title: "Birds of America", author: "John James Audubon" },
  { title: "The Nuremberg Chronicle", author: "Hartmann Schedel" },
  { title: "Cosmographia", author: "Sebastian Münster" },
  { title: "The Complutensian Polyglot Bible", author: "Cardinal Cisneros" }
];

export const generateBooksForCategory = (category: string, startId: number, count: number = 200): Book[] => {
  const books: Book[] = [];
  let templates: { title: string; author: string }[] = [];
  
  switch (category.toLowerCase()) {
    case 'literature':
      templates = literatureBooks;
      break;
    case 'fiction':
      templates = fictionTitles;
      break;
    case 'academic':
      templates = academicTitles;
      break;
    case 'poetry':
      templates = poetryTitles;
      break;
    case 'philosophy':
      templates = philosophyTitles;
      break;
    case 'rare':
      templates = rareTitles;
      break;
    default:
      templates = fictionTitles;
  }

  for (let i = 0; i < count; i++) {
    const template = templates[i % templates.length];
    const { price, originalPrice } = generatePrice();
    const variation = i > templates.length - 1 ? ` (Volume ${Math.floor(i / templates.length) + 1})` : '';
    
    books.push({
      id: startId + i,
      title: template.title + variation,
      author: template.author,
      price,
      originalPrice,
      rating: generateRating(),
      reviews: generateReviews(),
      category: category.charAt(0).toUpperCase() + category.slice(1),
      condition: ['Excellent', 'Very Good', 'Good', 'Fair'][Math.floor(Math.random() * 4)],
      description: `A comprehensive ${category} work exploring various themes and concepts.`,
      cover: `/placeholder.svg`
    });
  }
  
  return books;
};