import React, { useState } from "react";
import { useData } from "../context/dataContext";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";

const CsvTable = () => {
  const { parsedData, file } = useData();

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 50;

  if (!parsedData || parsedData.length === 0) return null;

  const headers = Object.keys(parsedData[0]);

  const totalPages = Math.ceil(parsedData.length / rowsPerPage);

  const displayedData = parsedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div>
      <h1>{file?.type === "text/csv" && file?.name}</h1>
      <TableContainer component={Paper}>
        <Table style={{ minWidth: 650, borderCollapse: "collapse" }}>
          <TableHead>
            <TableRow>
              {headers.map((header, index) => (
                <TableCell key={index} style={{ border: "1px solid black" }}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedData.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {headers.map((header, cellIndex) => (
                  <TableCell
                    key={cellIndex}
                    style={{ border: "1px solid black" }}
                  >
                    {row[header]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div
        style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}
      >
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, newPage) => setCurrentPage(newPage)}
          showFirstButton
          showLastButton
        />
      </div>
    </div>
  );
};

export default CsvTable;
