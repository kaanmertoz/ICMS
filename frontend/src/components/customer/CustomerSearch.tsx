import React from "react";
import { TextField, Box } from "@mui/material";
import { CustomerFilters } from "../../types/customer";

interface Props {
  filters: CustomerFilters;
  onFilterChange: (filters: CustomerFilters) => void;
  isLoading: boolean;
}

export const CustomerSearch: React.FC<Props> = ({
  filters,
  onFilterChange,
  isLoading,
}) => {
  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onFilterChange({
      ...filters,
      search: e.target.value,
    });
  };

  return (
    <Box sx={{ mb: 2 }}>
      <TextField
        label="Search by name"
        variant="outlined"
        fullWidth
        disabled={isLoading}
        value={filters.search || ""}
        onChange={handleSearchChange}
      />
    </Box>
  );
};
