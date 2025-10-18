export interface Bookstore {
  id: number;
  name: string;
  ownerName: string;
  shopNo: string;
  lane: string;
  contactNumber: string;
  email?: string;
  specialization: string[];
  rating: number;
  reviews: number;
  established: number;
  description: string;
  image: string;
  isVerified: boolean;
  openHours: string;
  languages: string[];
}

const generateMoreBookstores = (): Bookstore[] => {
  const additionalStores = [];
  const names = [
    "সাহিত্য সংসদ", "বুক স্টল", "গ্রন্থ নিকেতন", "পুস্তক পার্লার", "বই বাজার",
    "Classic Books", "Modern Library", "Student Corner", "Text Book House", "Knowledge Hub",
    "বিদ্যা ভবন", "শিক্ষা নিকেতন", "গ্রন্থ মন্দির", "পুস্তক প্রাসাদ", "বই ঘর"
  ];
  const owners = [
    "রাজেশ দাস", "সুমিত্রা সেন", "অনিল বসু", "মিনা রায়", "দেবাশিস মুখার্জি",
    "Priya Sharma", "Vikash Kumar", "Sunita Devi", "Ramesh Gupta", "Kavita Singh"
  ];
  
  for (let i = 7; i <= 50; i++) {
    additionalStores.push({
      id: i,
      name: names[(i - 7) % names.length] + (i > 21 ? ` ${Math.floor(i/15)}` : ''),
      ownerName: owners[(i - 7) % owners.length],
      shopNo: `${i}${String.fromCharCode(65 + (i % 5))}`,
      lane: i % 3 === 0 ? "College Street" : i % 3 === 1 ? "Bankim Chatterjee Street" : "Shyama Charan Dey Street",
      contactNumber: `+91 ${90000 + i}${10000 + (i * 123) % 90000}`,
      email: i % 3 === 0 ? `${names[(i - 7) % names.length].replace(/\s+/g, '').toLowerCase()}@gmail.com` : undefined,
      specialization: [
        ["Bengali Literature", "Poetry"][i % 2],
        ["Fiction", "Academic", "Philosophy", "Rare Books"][i % 4],
        ["Children's Books", "History"][i % 2]
      ].filter(Boolean),
      rating: Number((3.5 + Math.random() * 1.5).toFixed(1)),
      reviews: 20 + Math.floor(Math.random() * 200),
      established: 1950 + Math.floor(Math.random() * 70),
      description: "A well-established bookstore serving the community with quality books and excellent service.",
      image: `https://picsum.photos/400/300?random=${i}`,
      isVerified: i % 3 === 0,
      openHours: "10:00 AM - 8:00 PM",
      languages: ["Bengali", "English", "Hindi"].slice(0, 1 + (i % 3))
    });
  }
  return additionalStores;
};

export const bookstores: Bookstore[] = [
  {
    id: 1,
    name: "রবীন্দ্র পুস্তক ভবন",
    ownerName: "অমিত চক্রবর্তী",
    shopNo: "15A",
    lane: "College Street",
    contactNumber: "+91 98765 43210",
    email: "rabindra.books@gmail.com",
    specialization: ["Bengali Literature", "Poetry", "Rabindranath Tagore"],
    rating: 4.8,
    reviews: 156,
    established: 1965,
    description: "রবীন্দ্রনাথের সম্পূর্ণ রচনাবলী এবং বাংলা সাহিত্যের বিশাল সংগ্রহ",
    image: "https://picsum.photos/400/300?random=1",
    isVerified: true,
    openHours: "10:00 AM - 8:00 PM",
    languages: ["Bengali", "English"]
  },
  {
    id: 2,
    name: "Academic Corner",
    ownerName: "Dr. Rajesh Kumar",
    shopNo: "23B",
    lane: "Bankim Chatterjee Street",
    contactNumber: "+91 87654 32109",
    email: "academic.corner@yahoo.com",
    specialization: ["Academic Books", "Engineering", "Medical", "Competitive Exams"],
    rating: 4.6,
    reviews: 203,
    established: 1978,
    description: "Complete academic solution for students - from school to professional courses",
    image: "https://picsum.photos/400/300?random=2",
    isVerified: true,
    openHours: "9:00 AM - 9:00 PM",
    languages: ["English", "Hindi", "Bengali"]
  },
  {
    id: 3,
    name: "দেশ বিদেশের বই",
    ownerName: "সুব্রত দাস",
    shopNo: "8C",
    lane: "Shyama Charan Dey Street",
    contactNumber: "+91 76543 21098",
    specialization: ["Fiction", "Travel", "International Literature"],
    rating: 4.7,
    reviews: 89,
    established: 1982,
    description: "বিশ্বসাহিত্যের অনুবাদ এবং মৌলিক রচনার বিশেষ সংগ্রহ",
    image: "https://picsum.photos/400/300?random=3",
    isVerified: true,
    openHours: "10:30 AM - 7:30 PM",
    languages: ["Bengali", "English"]
  },
  {
    id: 4,
    name: "Rare Books Emporium",
    ownerName: "Anil Bhattacharya",
    shopNo: "31A",
    lane: "College Street",
    contactNumber: "+91 65432 10987",
    email: "rarebooks.emporium@gmail.com",
    specialization: ["Rare Books", "First Editions", "Manuscripts", "Collectibles"],
    rating: 4.9,
    reviews: 67,
    established: 1955,
    description: "Collector's paradise with rare manuscripts and first edition books",
    image: "https://picsum.photos/400/300?random=4",
    isVerified: true,
    openHours: "11:00 AM - 6:00 PM",
    languages: ["English", "Bengali"]
  },
  {
    id: 5,
    name: "শিশু কিশোর গ্রন্থালয়",
    ownerName: "মীরা সেন",
    shopNo: "12D",
    lane: "Bankim Chatterjee Street",
    contactNumber: "+91 54321 09876",
    specialization: ["Children's Books", "Comics", "Educational"],
    rating: 4.5,
    reviews: 124,
    established: 1990,
    description: "শিশুদের জন্য বিশেষ বই এবং শিক্ষামূলক উপকরণ",
    image: "https://picsum.photos/400/300?random=5",
    isVerified: true,
    openHours: "10:00 AM - 8:00 PM",
    languages: ["Bengali", "English"]
  },
  {
    id: 6,
    name: "Philosophy & Wisdom",
    ownerName: "Prof. Debashis Roy",
    shopNo: "19E",
    lane: "College Street",
    contactNumber: "+91 43210 98765",
    email: "philosophy.wisdom@outlook.com",
    specialization: ["Philosophy", "Religion", "Spirituality", "Psychology"],
    rating: 4.4,
    reviews: 78,
    established: 1973,
    description: "Deep philosophical texts and spiritual literature collection",
    image: "https://picsum.photos/400/300?random=6",
    isVerified: true,
    openHours: "11:00 AM - 7:00 PM",
    languages: ["English", "Bengali", "Sanskrit"]
  },
  ...generateMoreBookstores()
];

export const getAllBookstores = () => bookstores;