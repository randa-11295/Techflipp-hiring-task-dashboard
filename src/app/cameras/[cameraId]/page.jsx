"use client";
// import { useQuery } from "@tanstack/react-query";

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Grid,
  Paper,
  Divider,
  Alert,
  CircularProgress,
  Stack,
  Badge,
} from "@mui/material";
import {
  Videocam,
  Settings,
  Schedule,
  AspectRatio,
  Speed,
  Visibility,
  Analytics,
} from "@mui/icons-material";
import { fetchCameraDetails } from "../../../api/fetchCameraDetails";

export default async function CameraDetails({ params }) {
  // const { cameraId } = useParams()
  const { cameraId } = await params;
  console.log(cameraId, params);

  // const {
  //   data: camera,
  //   isLoading,
  //   error,
  //   isError,
  // } = useQuery({
  //   queryKey: ["camera", cameraId],
  //   queryFn: () => fetchCameraDetails(cameraId),
  //   enabled: !!cameraId,
  // });

  // if (isLoading) {
  //   return (
  //     <Box
  //       display="flex"
  //       justifyContent="center"
  //       alignItems="center"
  //       minHeight="400px"
  //     >
  //       <CircularProgress size={60} />
  //     </Box>
  //   );
  // }

  // if (isError) {
  //   return (
  //     <Box p={3}>
  //       <Alert severity="error">
  //         Error loading camera details: {error?.message || "Unknown error"}
  //       </Alert>
  //     </Box>
  //   );
  // }

  // if (!camera) {
  //   return (
  //     <Box p={3}>
  //       <Alert severity="warning">Camera not found</Alert>
  //     </Box>
  //   );
  // }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <Box p={3}>
    test
    </Box>
  );
}
