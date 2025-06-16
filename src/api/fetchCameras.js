export const fetchCameras = async ({ page = 1, size = 4, camera_name }) => {
  const params = new URLSearchParams({
    page,
    size,
    ...(camera_name && { camera_name }),
  });

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}//cameras/?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch cameras");
  }

  return response.json();
};
