export const fetchCameraDetails = async ({cameraId}) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/cameras/${cameraId}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch camera details");
  }
  return response.json();
};
