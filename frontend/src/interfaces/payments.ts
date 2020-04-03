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
