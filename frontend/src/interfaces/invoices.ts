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
