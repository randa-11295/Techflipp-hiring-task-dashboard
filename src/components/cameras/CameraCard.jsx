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
import Link from "next/link";

const CameraCard = ({ cameraData }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Box sx={{ width: { md: "48%", lg: "31%" } }}>
      <Link href={"cameras/" + cameraData.id}>
        <Card
          elevation={3}
          sx={{
            borderRadius: 2,
            transition: ".3s",
            "&:hover": {
              cursor: "pointer",
              transform: "scale(1.05)",
            },
          }}
        >
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
              <Box sx={{ mb: 1 }}>
                <Typography
                  variant="body2"
                  color="primary.main"
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
              <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                {cameraData.tags.map((tag) => (
                  <Chip
                    key={tag.id}
                    size="small"
                    label={tag.name}
                    sx={{
                      backgroundColor: tag.color,
                      color: "black",
                      fontWeight: 500,
                      mb: 0.5,
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
      </Link>
    </Box>
  );
};

export default CameraCard;
