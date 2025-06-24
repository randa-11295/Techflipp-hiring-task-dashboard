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

  const { data, isLoading, error } = useQuery({
    queryKey: ["cameras", page, size, searchQuery],
    queryFn: () => fetchCameras({ page, size, camera_name: searchQuery }),
    keepPreviousData: true,
  });

  useEffect(() => {
    setPage(1);
  }, [size, searchQuery]);

  const handleSearchChange = (event) => {
    setCameraName(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setSearchQuery(cameraName.trim());
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setSearchQuery(cameraName.trim());
    }
  };

  const handlePageChange = (_event, newPage) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (event) => {
    setSize(parseInt(event.target.value, 10));
  };

  return (
    <Box sx={{ pb: 2 }}>
      <Box
        component="form"
        onSubmit={handleSearchSubmit}
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        gap={1}
        alignItems="center"
        mb={3}
      >
        <Box sx={{ flexGrow: 1 }}>
          <InputLabel htmlFor="camera-search">Search</InputLabel>
          <FormControl sx={{ minWidth: "100%" }} variant="outlined">
            <OutlinedInput
              id="camera-search"
              value={cameraName}
              onChange={handleSearchChange}
              onKeyDown={handleKeyPress}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    type="submit"
                    edge="end"
                    sx={{ color: "primary.main" }}
                  >
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Box>

        <Box sx={{ width: { xs: "100%", md: "30%" } }}>
          <InputLabel htmlFor="page-size">Items per page</InputLabel>
          <TextField
            fullWidth
            variant="outlined"
            select
            id="page-size"
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
      </Box>

      {isLoading && (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Typography color="error" textAlign="center" mt={4}>
          Something went wrong: {error.message}
        </Typography>
      )}

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
