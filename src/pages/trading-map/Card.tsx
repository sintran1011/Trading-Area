import React from "react";
import { RowsData } from "../../services/models";
import { formatComma, renderColorByIndex } from "../../utils";

interface IProps {
  area: string;
  total: number;
  country: RowsData[];
  index: number;
}

const CardCountry = (props: IProps) => {
  const { area, total = 0, country = [], index = 0 } = props;
  const rowCss = "flex justify-between items-center";
  const colorTitle = renderColorByIndex(index);
  const renderRows = () => {
    return (
      <>
        <div className={`${rowCss}`}>
          <p className="text-gray-900 font-medium text-sm leading-5">Country</p>
          <p className="text-gray-900 font-medium text-sm leading-5">
            Shipments
          </p>
        </div>
        {country.map((i) => (
          <div key={i.country} className={`${rowCss}`}>
            <p className="text-gray-400 text-sm leading-5">{i.country}</p>
            <p className="text-gray-400 text-sm leading-5">
              {formatComma(i.shipments)}
            </p>
          </div>
        ))}
      </>
    );
  };
  return (
    <div className="col-span-1 border border-gray-300 shadow-md p-4 rounded-xl">
      <p className="text-lg text-gray-700 font-medium leading-6 text-center mb-2">
        {area}
      </p>
      <p
        style={{ color: colorTitle }}
        className="text-3xl text-black text-center mb-2"
      >
        {total.toFixed(2)}%
      </p>
      <div className="grid grid-cols-1 gap-2">{renderRows()}</div>
    </div>
  );
};

export default CardCountry;
