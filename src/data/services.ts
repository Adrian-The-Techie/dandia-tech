export interface ServiceItem {
  id: number;
  slug: string;
  name: string;
  category: string;
  price: string;
  description: string;
  imageUrl: string;
}

export const services: ServiceItem[] = [
  { 
    id: 1, 
    slug: 'web-application-development',
    name: 'Web Application Development', 
    category: 'Software', 
    price: 'Custom', 
    description: 'Full-stack web application development tailored to your business needs.',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 2, 
    slug: 'mobile-app-development',
    name: 'Mobile App Development', 
    category: 'Software', 
    price: 'Custom', 
    description: 'Native and cross-platform mobile apps for iOS and Android.',
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 3, 
    slug: 'seo-optimization',
    name: 'SEO Optimization', 
    category: 'Marketing', 
    price: 'Packages available', 
    description: 'Improve your search rankings and drive organic traffic.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 4, 
    slug: 'ui-ux-design',
    name: 'UI/UX Design', 
    category: 'Design', 
    price: 'Custom', 
    description: 'Beautiful, intuitive user interfaces designed for maximum engagement.',
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 5, 
    slug: 'cloud-hosting-setup',
    name: 'Cloud Hosting Setup', 
    category: 'Infrastructure', 
    price: 'Custom', 
    description: 'Scalable cloud infrastructure setup on AWS, GCP, or Azure.',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800'
  },
];
