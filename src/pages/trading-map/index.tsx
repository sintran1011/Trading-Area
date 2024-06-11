import { Tab, Tabs } from "@mui/material";
import React from "react";
import { useState } from "react";
import { RowsData } from "../../services/models";
import { sumTotal } from "../../utils";
import CardCountry from "./Card";

interface IProps {
  data: RowsData[];
}

const TradingMap = (props: IProps) => {
  const { data = [] } = props;
  const [tab, setTab] = useState<string>("shipments");
  const listArea = data.map((i) => i.area);
  const removeDuplicates = [...new Set(listArea)];
  const total = sumTotal(data);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  return (
    <div className="bg-white max-w-[1400px] w-[1067px] p-6">
      <div className="w-full flex justify-between py-4 items-center">
        <p className="font-medium text-lg text-gray-900">Top 5 Trading Area</p>
        <div className="flex items-center gap-2">
          <p className="text-black text-[12px] font-medium">Unit By</p>
          <Tabs
            onChange={handleChange}
            centered
            sx={{
              "& button": {
                padding: "0px",
                fontSize: "10px",
                height: "24px",
                minHeight: "24px",
              },
              "& button:hover": {
                backgroundColor: "#818cf8",
                color: "white",
              },
              "& button:focus": {
                backgroundColor: "#4338ca",
                color: "white",
                padding: "0px",
                outline: "none",
              },
              "& .Mui-selected": {
                color: "white !important",
                backgroundColor: "#4338ca",
              },
            }}
            className="border border-gray-300 rounded-md h-[20px] !min-h-6"
            value={tab}
            TabIndicatorProps={{ hidden: true }}
          >
            <Tab label="SHIPMENTS" value={"shipments"} />
            <Tab label="WEIGHT" value={"weight"} />
            <Tab label="TEU" value={"teu"} />
            <Tab label="VALUE(USD)" disabled />
          </Tabs>
        </div>
      </div>

      <div className="w-full grid grid-cols-5 gap-3">
        {removeDuplicates.map((i) => {
          const groupCountry = data.filter((item) => item.area === i) || [];
          const totalArea = sumTotal(groupCountry);
          return (
            <CardCountry
              key={i}
              area={i}
              total={(totalArea / total) * 100}
              country={groupCountry}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TradingMap;
