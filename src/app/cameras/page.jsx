"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Pagination,
  CircularProgress,
  Box,
  Typography,
  Stack,
  TextField,
  MenuItem,
  OutlinedInput,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
} from "@mui/material";
import CameraCard from "../../components/cameras/CameraCard";
import { fetchCameras } from "../../api/fetchCameras";
import SendIcon from "@mui/icons-material/Send";

const pageSizes = [6, 12, 24];

const Cameras = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(6);
  const [cameraName, setCameraName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Query to fetch cameras
  const { data, isLoading, error } = useQuery({
    queryKey: ["cameras", page, size, searchQuery],
    queryFn: () => fetchCameras({ page, size, camera_name: searchQuery }),
    keepPreviousData: true,
  });

  // Reset to page 1 when size or search changes
  useEffect(() => {
    setPage(1);
  }, [size, searchQuery]);

  // Handle search input change
  const handleSearchChange = (event) => {
    setCameraName(event.target.value);
  };

  // Handle search form submission
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setSearchQuery(cameraName.trim());
  };

  // Handle pressing Enter key in the search field
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setSearchQuery(cameraName.trim());
    }
  };

  // Handle pagination page change
  const handlePageChange = (_event, newPage) => {
    setPage(newPage);
  };

  // Handle page size change
  const handlePageSizeChange = (event) => {
    setSize(parseInt(event.target.value, 10));
  };

  return (
    <Box sx={{ padding: 2 }}>
      {/* Filters Section */}
      <Box
        component="form"
        onSubmit={handleSearchSubmit}
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        gap={2}
        alignItems="center"
        mb={3}
      >
        <FormControl sx={{ minWidth: 300 }} variant="outlined">
          <InputLabel htmlFor="camera-search">Search</InputLabel>
          <OutlinedInput
            id="camera-search"
            value={cameraName}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
            label="Search"
            endAdornment={
              <InputAdornment position="end">
                <IconButton type="submit" edge="end">
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <TextField
          label="Items per page"
          variant="outlined"
          select
          value={size}
          onChange={handlePageSizeChange}
        >
          {pageSizes.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {/* Loading Indicator */}
      {isLoading && (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      )}

      {/* Error State */}
      {error && (
        <Typography color="error" textAlign="center" mt={4}>
          Something went wrong: {error.message}
        </Typography>
      )}

      {/* Data Display */}
      {!isLoading && !error && (
        <>
          {data?.items?.length > 0 ? (
            <>
              <Stack
                direction="row"
                flexWrap="wrap"
                justifyContent="space-between"
                gap={3}
              >
                {data.items.map((camera) => (
                  <CameraCard key={camera.id} cameraData={camera} />
                ))}
              </Stack>

              {/* Pagination */}
              <Box display="flex" justifyContent="center" mt={4}>
                <Pagination
                  count={Math.ceil((data.total || 0) / size)}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                />
              </Box>
            </>
          ) : (
            <Typography textAlign="center" mt={4}>
              No cameras found.
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default Cameras;