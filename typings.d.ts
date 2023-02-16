interface Order {
  _id: string;
  customer: string;
  address: string;
  method: number;
  status: number;
  total: number;
  updatedAt: string;
  _v: number;
  _id: string;
}

interface Product {
  img: string;
  title: string;
  desc: string;
  prices: string[];
  extraOptions: [];
  extra?: {};
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  _id?: string;
}

interface Cookie {
  cookies: {
    userToken: Partial<{ [key: string]: string }>;
  };
}
