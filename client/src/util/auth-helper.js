const checkUserValidity = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return { valid: false, error: "No token found in localStorage." };
  }

  try {
    const response = await fetch(`${import.meta.env.VITE_API_ROUTE}/check-creds`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {

      throw new Error("Failed to check user credentials");
    }

    const result = await response.json();
    if (result.valid) {
      return true;
    } else {
      localStorage.clear();
      return false;
    }
  } catch (error) {
    return false;
  }
};

export default checkUserValidity;
