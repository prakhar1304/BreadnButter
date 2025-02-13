interface Category {
    id: string
    name: string
  }
  
  interface Product {
    id: string
    name: string
    image: string
    rating: number
  }
  
  export const categories: Category[] = [
    { id: "1", name: "All" },
    { id: "2", name: "Smartphones" },
    { id: "3", name: "Headphones" },
    { id: "4", name: "Laptops" },
    { id: "5", name: "Accessories" },
  ]
  
  export const products: Product[] = [
    {
      id: "1",
      name: "AirPods",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-k6fpfvT55GES7STyIcoTkh3bKOSdfs.png",
      rating: 4.9,
    },
    {
      id: "2",
      name: "MacBook Air 13",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-k6fpfvT55GES7STyIcoTkh3bKOSdfs.png",
      rating: 5.0,
    },
    {
      id: "3",
      name: "iPhone 14 Pro",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-k6fpfvT55GES7STyIcoTkh3bKOSdfs.png",
      rating: 4.8,
    },
    {
      id: "4",
      name: "iPad Pro",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-k6fpfvT55GES7STyIcoTkh3bKOSdfs.png",
      rating: 4.7,
    },
  ]
  
  