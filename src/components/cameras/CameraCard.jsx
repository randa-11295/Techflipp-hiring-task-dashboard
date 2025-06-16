"use client";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Box,
  Stack,
  IconButton,
  Divider,
} from "@mui/material";
import { Circle, ContentCopy } from "@mui/icons-material";

const cameraData = {
  id: "c0ef9548-0f37-45be-883d-05502cbc3671",
  name: "Highway Crossing 3",
  rtsp_url: "rtsp://camera-1.local:554/stream",
  tags: [
    {
      id: "5b05ee86-68c2-48c0-9d3c-2a4208158f6c",
      name: "gate",
      color: "#96CEB4",
    },
    {
      id: "b2b8fd48-53b2-4844-8c22-e79d5ef8f510",
      name: "entrance",
      color: "#45B7D1",
    },
    {
      id: "3ffef781-0071-4052-8a9e-031fa8ea9526",
      name: "general",
      color: "#95A5A6",
    },
    {
      id: "4f707789-b5a4-4969-8e7e-4de563d62d41",
      name: "panoramic",
      color: "#E74C3C",
    },
    {
      id: "58370dbb-8008-46f9-9d03-72175742d56c",
      name: "security",
      color: "#FFEAA7",
    },
    {
      id: "5ed5952d-8da0-441e-8b45-f05fafcdf1ed",
      name: "indoor",
      color: "#FF6B6B",
    },
    {
      id: "922d3670-5db4-41e1-80cd-e75b0ce8e5b0",
      name: "outdoor",
      color: "#4ECDC4",
    },
    {
      id: "3f0934dd-aa3d-4821-9069-4e1842e38f40",
      name: "rooftop",
      color: "#8E44AD",
    },
  ],
  is_active: false,
  status_message: "Connection timeout - check network",
  snapshot: "https://picsum.photos/800/600?random=1",
  created_at: "2025-06-04T20:12:40",
  updated_at: "2025-06-13T18:44:21",
};

const CameraCard = () => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
      <Card elevation={3} sx={{ borderRadius: 2  , width :{ md: "48%" , lg : "31%"}}}>
        <CardMedia
          component="img"
          height="200"
          image={cameraData.snapshot}
          alt={cameraData.name}
        />

        <CardContent sx={{ p: 2 }}>
          {/* Header */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                {cameraData.name}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Circle
                sx={{
                  fontSize: 12,
                  color: cameraData.is_active ? "#4CAF50" : "#F44336",
                }}
              />
              <Typography
                variant="body2"
                color={cameraData.is_active ? "success.main" : "error.main"}
                sx={{ fontWeight: 500 }}
              >
                {cameraData.is_active ? "Active" : "Offline"}
              </Typography>
            </Box>
          </Box>

          {/* Status Message */}
          {cameraData.status_message && (
            <Box sx={{ mb: 1}}>
              <Typography
                variant="body2"
                color="error.main"
                sx={{ fontStyle: "italic", fontWeight: 500 }}
              >
                Status: {cameraData.status_message}
              </Typography>
            </Box>
          )}

          <Divider sx={{ my: 1 }} />

          {/* All Tags */}
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Tags
            </Typography>
            <Stack direction="row" spacing={.5} flexWrap="wrap" useFlexGap>
              {cameraData.tags.map((tag) => (
                <Chip
                  key={tag.id}
                  size="small"
                  label={tag.name}
                  sx={{
                    backgroundColor: tag.color,
                    color: "black",
                    fontWeight: 500,
                    mb: .5,
                  }}
                />
              ))}
            </Stack>
          </Box>

          <Divider sx={{ my: 1 }} />

          {/* RTSP URL */}
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              RTSP Stream URL
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography
                variant="body2"
                sx={{
                  backgroundColor: "black",
                  px: 2,
                  py: 1,
                  borderRadius: 1,
                  flexGrow: 1,
                  wordBreak: "break-all",
                }}
              >
                {cameraData.rtsp_url}
              </Typography>
              <IconButton
                size="small"
                onClick={() => copyToClipboard(cameraData.rtsp_url)}
              >
                <ContentCopy fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          <Divider sx={{ my: 1 }} />

          {/* Timestamps */}
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Timestamps
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
              <Typography variant="body2" color="text.secondary">
                <strong>Created:</strong> {formatDate(cameraData.created_at)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Last Updated:</strong>{" "}
                {formatDate(cameraData.updated_at)}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
  );
};

export default CameraCard;
