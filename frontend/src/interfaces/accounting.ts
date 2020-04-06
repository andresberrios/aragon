export interface Invoice {
  id?: string;
  isIncome: boolean;
  number: string;
  type: string;
  date: string;
  clientName: string;
  clientRut: string;
  net: number;
  tax: number;
  source: string;
}

export interface Payment {
  id?: string;
  isIncome: boolean;
  isSplit: boolean;
  method: string;
  card: string;
  amount: number;
  voucher: string;
  date: string;
}

export interface Contact {
  isPerson: boolean;
  name: string;
  surname: string | null;
  idType: "rut" | "passport" | "foreign_id" | "foreign_company_num";
  idNum: string;
  birthDate: string;
  phone: string;
  email: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    country: string;
  };
}
