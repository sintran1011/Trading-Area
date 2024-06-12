import { RowsData } from "../services/models";
import { Parser } from "@json2csv/plainjs";

export const formatComma = (str: string) => {
  return String(str).replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, "$&,");
};

export const sumTotal = (data: RowsData[]) => {
  return data.reduce((total, item) => Number(item.shipments) + total, 0);
};

export const renderColorByIndex = (index: number) => {
  const colorList = ["#312e81", "#4338ca", "#6366f1", "#a5b4fc", "#e0e7ff"];
  return colorList[index];
};

export const parseJSON2csv = (data: any) => {
  try {
    const parser = new Parser();
    const csv = parser.parse(data);
    return csv;
  } catch (err) {
    console.error(err);
  }
};

export const handleExport = async (data: any) => {
  const res = parseJSON2csv(data) || "";
  const blobUTF8 = new Blob(["\ufeff", res], {
    type: "text/csv;charset=utf-8",
  });

  const filename = "Trade Country Data";

  const url = window.URL.createObjectURL(blobUTF8);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;

  anchor.click();

  window.URL.revokeObjectURL(url);
  document.removeChild(anchor);
};

export const openFullscreen = () => {
  const elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  }
};
