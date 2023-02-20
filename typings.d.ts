interface Order {
  _id: string;
  customer: string;
  address: string;
  method: number;
  status: number;
  total: number;
  createdAt: string;
  updatedAt: string;
  _v: number;
  _id: string;
}

interface Product {
  img: string;
  title: string;
  desc: string;
  // prices: string[];
  prices: number[];
  extraOptions: [Options];
  extra?: {};
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  _id?: string;
}

interface Options {
  _id: string;
  topping: string;
  toppingPrice: number;
}

interface Cookie {
  cookies: {
    userToken: Partial<{ [key: string]: string }>;
  };
}
