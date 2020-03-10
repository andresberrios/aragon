export interface Sale {
  id?: string;
  number: string;
  type: string;
  date: string;
  clientName: string;
  clientRut: string;
  net: number;
  tax: number;
  source: string;
}
