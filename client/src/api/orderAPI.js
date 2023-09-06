const API_URL = "http://localhost:5000";

const createOrder = async (newOrder) => {
  try {
    const res = await fetch(`${API_URL}/order`, {
      method: "POST",
      body: newOrder,
      headers: {
        Authentication: "Bearer " + localStorage.getItem("jwt"),
      },
    });

    if (!res.ok) throw Error();
    const { data } = await res.json();
    return data;
  } catch {
    throw Error("Failed to place order");
  }
};

export { createOrder };
