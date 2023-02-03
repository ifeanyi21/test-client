import React, { useCallback, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import DropDown from "./Dropdown/Dropdown";

const columns = [
  {
    field: "id",
    headerName: "Order Item ID",
    width: 90,
    minWidth: 120,
  },
  {
    field: "product_id",
    headerName: "Product ID",
    width: 150,
    flex: 1,
    minWidth: 200,
  },
  {
    field: "product_category",
    headerName: "Product Category",
    width: 150,
    flex: 1,
    minWidth: 200,
  },
  {
    field: "price",
    headerName: "Price",
    headerAlign:"left",
    align:"left",
    width: 110,
    flex: 1,
    minWidth: 200,
  },
  {
    field: "date",
    headerName: "Date",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    flex: 1,
    minWidth: 200,
    width: 160,
  },
   {
      field: "toggle",
      headerName: "",
      sortable: false,
      renderCell: (params) => <DropDown {...params} />,
    },
];

function Table() {
  const [pageSize, setPageSize] = useState(20);
  const [pending, setPending] = useState(true);
  const [rows, setRows] = useState([]);
  const getOrders = useCallback(async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}order_items?limit=${pageSize}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      }
    );

    const data = await response.json();
    if (data.status) {
      setRows(data.foundOrders.data);
    }
    setPending(false);
  }, [pageSize]);

  useEffect(() => {
    getOrders();
  }, [getOrders]);
  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        autoHeight
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[20, 50, 100]}
        pagination
        rows={rows}
        columns={columns}
        //pageSize={5}
        loading={pending}
        //rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        getRowId={(row) => row.dbId}
      />
    </Box>
  );
}

export default Table;
