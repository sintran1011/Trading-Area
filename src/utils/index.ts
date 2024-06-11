import { RowsData } from "../services/models";

export const formatComma = (str: string) => {
  return String(str).replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, "$&,");
};

export const sumTotal = (data: RowsData[]) => {
  return data.reduce((total, item) => Number(item.shipments) + total, 0);
};
