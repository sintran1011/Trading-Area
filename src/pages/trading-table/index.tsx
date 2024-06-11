"use client";

import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { RowsData } from "../../services/models";
import { Button } from "@mui/material";
import { formatComma } from "../../utils";

interface IProps {
  data: RowsData[];
}

const TradingTable = (props: IProps) => {
  const { data = [] } = props;
  const columns: GridColDef[] = [
    {
      field: "country",
      headerName: "Country",
      width: 180,
      headerClassName: "bg-gray-200",
    },
    {
      field: "area",
      headerName: "Area",
      width: 120,
      headerClassName: "bg-gray-200",
    },
    {
      field: "proportion",
      headerName: "Proportion (%)",
      width: 130,
      headerClassName: "bg-gray-200",
    },
    {
      field: "shipments",
      headerName: "Shipments",
      width: 150,
      valueGetter: (val) => formatComma(val),
      headerClassName: "bg-gray-200",
    },
    {
      field: "weight",
      headerName: "Weight (KG)",
      width: 160,
      valueGetter: (val) => formatComma(val),
      headerClassName: "bg-gray-200",
    },
    {
      field: "teu",
      headerName: "TEU",
      width: 160,
      headerClassName: "bg-gray-200",
    },
    {
      field: "value",
      headerName: "Value (USD)",
      valueGetter: (val) => "--",
      headerClassName: "bg-gray-200",
    },
  ];
  return (
    <div className="bg-white max-w-[1400px] p-6">
      <div className="flex justify-between items-center w-full mb-4">
        <p className="font-medium text-lg text-gray-900 ">
          Trade Country Table Data
        </p>
        <Button variant="outlined">Export</Button>
      </div>
      <div className="h-[400px] w-full ">
        <DataGrid
          rows={data}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 15, 20]}
          disableColumnFilter
          disableColumnMenu
          sx={{
            "& .MuiDataGrid-scrollbar::-webkit-scrollbar": {
              width: "0.4em",
            },
            "& .MuiDataGrid-scrollbar::-webkit-scrollbar-track": {
              background: "#f1f1f1",
            },
            "& .MuiDataGrid-scrollbar::-webkit-scrollbar-thumb": {
              backgroundColor: "#888",
            },
            "& .MuiDataGrid-scrollbar::-webkit-scrollbar-thumb:hover": {
              background: "#555",
            },
            "& .MuiDataGrid-scrollbarFiller--header": {
              background: "#e5e7eb",
            },
          }}
        />
      </div>
    </div>
  );
};

export default TradingTable;
