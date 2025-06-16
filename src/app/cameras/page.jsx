"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Pagination,
  CircularProgress,
  Box,
  Typography,
  Stack,
} from "@mui/material";
import CameraCard from "../../components/cameras/CameraCard";
import { fetchCameras } from "../../api/fetchCameras";

const Cameras = () => {
  const [page, setPage] = useState(1);
  const size = 6;
  const camera_name = "";

  const { data, isLoading, error } = useQuery({
    queryKey: ["cameras", page, size, camera_name],
    queryFn: () => fetchCameras({ page, size, camera_name }),
    keepPreviousData: true,
  });

  const handlePageChange = (_event, newPage) => {
    setPage(newPage);
  };

  return (
    <Box sx={{ padding: 2 }}>
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
                  <CameraCard  key={camera.id} cameraData={camera} />
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
