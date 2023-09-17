import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

const tableContainerStyles = {
  maxHeight: 643,
  pt: 1,
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "lightgray",
    borderRadius: "4px",
  },
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "navy",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function DataTable(props) {
  const {
    handleSortChange,
    handleClick,
    handleEditClick,
    sortedColumn,
    sortingOrder,
    rows,
    isSelected,
    sortRows,
  } = props;
  return (
    <TableContainer sx={tableContainerStyles}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <StyledTableCell padding="checkbox"></StyledTableCell>
            
            <StyledTableCell
              align="left"
              onClick={() => handleSortChange("name")}
            >
              Contact Name
              {sortedColumn === "name" ? (
                sortingOrder === "asc" ? (
                  <ArrowUpwardIcon fontSize="small" />
                ) : (
                  <ArrowDownwardIcon fontSize="small" />
                )
              ) : null}
            </StyledTableCell>
            <StyledTableCell align="left">Email Address</StyledTableCell>
            <StyledTableCell align="left">Phone Number</StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.sort(sortRows).map((row) => {
            const isItemSelected = isSelected(row.id);

            return (
              <TableRow
                hover
                onClick={(event) => handleClick(event, row.id)}
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={row.id}
                selected={isItemSelected}
                sx={{ cursor: "pointer" }}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    checked={isItemSelected}
                    inputProps={{
                      "aria-labelledby": `enhanced-table-checkbox-${row.id}`,
                    }}
                  />
                </TableCell>
                <TableCell component="th" scope="row" padding="none">
                  <AccountCircleOutlinedIcon sx={{ marginRight: 1 }} />
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left">{row.phone}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditClick(row.id)}>
                    <EditIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DataTable;
