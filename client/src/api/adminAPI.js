const API_URL = "http://localhost:5000";

const adminLogin = async (userInfo) => {
  try {
    const res = await fetch(`${API_URL}/admin/login`, {
      method: "POST",
      body: JSON.stringify(userInfo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();
    const { data } = await res.json();
    return data;
  } catch {
    throw Error("Failed to log in");
  }
};

export { adminLogin };
