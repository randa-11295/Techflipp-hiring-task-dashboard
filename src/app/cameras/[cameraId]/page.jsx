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
     <Grid container spacing={3}>
        {/* Main Camera Info */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <Videocam color="primary" />
                <Typography variant="h4" component="h1">
                  {camera.name}
                </Typography>
                <Badge
                  color={camera.is_active ? "success" : "error"}
                  variant="dot"
                  sx={{ ml: 1 }}
                >
                  <Chip
                    label={camera.is_active ? "Active" : "Inactive"}
                    color={camera.is_active ? "success" : "error"}
                    size="small"
                  />
                </Badge>
              </Box>

              <Typography variant="body2" color="text.secondary" gutterBottom>
                Camera ID: {camera.id}
              </Typography>

              {camera.status_message && (
                <Alert severity="info" sx={{ mb: 2 }}>
                  {camera.status_message}
                </Alert>
              )}

              {/* Tags */}
              {camera.tags && camera.tags.length > 0 && (
                <Box mb={2}>
                  <Typography variant="subtitle2" gutterBottom>
                    Tags
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {camera.tags.map((tag) => (
                      <Chip
                        key={tag.id}
                        label={tag.name}
                        size="small"
                        sx={{
                          backgroundColor: tag.color,
                          color: "white",
                          mb: 1,
                        }}
                      />
                    ))}
                  </Stack>
                </Box>
              )}

              <Divider sx={{ my: 2 }} />

              {/* Timestamps */}
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Schedule fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      Created: {formatDate(camera.created_at)}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Schedule fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      Updated: {formatDate(camera.updated_at)}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Camera Snapshot */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Live Snapshot
              </Typography>
              {camera.snapshot ? (
                <CardMedia
                  component="img"
                  image={camera.snapshot}
                  alt={`${camera.name} snapshot`}
                  sx={{
                    width: "100%",
                    height: 200,
                    objectFit: "cover",
                    borderRadius: 1,
                  }}
                />
              ) : (
                <Box
                  sx={{
                    width: "100%",
                    height: 200,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "grey.100",
                    borderRadius: 1,
                  }}
                >
                  <Typography color="text.secondary">
                    No snapshot available
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Stream Configuration */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <Settings color="primary" />
                <Typography variant="h6">Stream Configuration</Typography>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Paper variant="outlined" sx={{ p: 2, textAlign: "center" }}>
                    <AspectRatio color="action" sx={{ mb: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      Resolution
                    </Typography>
                    <Typography variant="h6">
                      {camera.stream_frame_width} × {camera.stream_frame_height}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper variant="outlined" sx={{ p: 2, textAlign: "center" }}>
                    <Speed color="action" sx={{ mb: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      FPS
                    </Typography>
                    <Typography variant="h6">{camera.stream_fps}</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper variant="outlined" sx={{ p: 2, textAlign: "center" }}>
                    <Visibility color="action" sx={{ mb: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      Quality
                    </Typography>
                    <Typography variant="h6">
                      {camera.stream_quality}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper variant="outlined" sx={{ p: 2, textAlign: "center" }}>
                    <Typography variant="body2" color="text.secondary">
                      Max Length
                    </Typography>
                    <Typography variant="h6">
                      {camera.stream_max_length}s
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>

              <Box mt={2}>
                <Typography variant="body2" color="text.secondary">
                  Skip Frames: {camera.stream_skip_frames}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.5 }}
                >
                  RTSP URL: {camera.rtsp_url}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Demographics Configuration */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <Analytics color="primary" />
                <Typography variant="h6">Demographics Configuration</Typography>
              </Box>

              {camera.demographics_config ? (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Track History Max Length
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {camera.demographics_config.track_history_max_length}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Exit Threshold
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {camera.demographics_config.exit_threshold}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Min Track Duration
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {camera.demographics_config.min_track_duration}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Detection Confidence
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {(
                        camera.demographics_config
                          .detection_confidence_threshold * 100
                      ).toFixed(1)}
                      %
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Demographics Confidence
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {(
                        camera.demographics_config
                          .demographics_confidence_threshold * 100
                      ).toFixed(1)}
                      %
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Box Area Threshold
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {(
                        camera.demographics_config.box_area_threshold * 100
                      ).toFixed(1)}
                      %
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Save Interval
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {camera.demographics_config.save_interval}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Frame Skip Interval
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {camera.demographics_config.frame_skip_interval}
                    </Typography>
                  </Grid>
                </Grid>
              ) : (
                <Typography color="text.secondary">
                  No demographics configuration available
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid> 
    </Box>
  );
}
