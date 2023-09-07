const API_URL = "http://localhost:5000";

const createUser = async (newUser) => {
  try {
    const res = await fetch(`${API_URL}/user/signup`, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();
    const { data } = await res.json();
    return data;
  } catch {
    throw Error("Failed creating your user");
  }
};

const userLogin = async (userInfo) => {
  try {
    const res = await fetch(`${API_URL}/user/login`, {
      method: "POST",
      body: JSON.stringify(userInfo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();
    const { token, data } = await res.json();
    localStorage.setItem("jwt", token);
    return data;
  } catch {
    throw Error("Failed to log in");
  }
};

const getCurrentUser = async () => {
  try {
    const res = await fetch(`${API_URL}/user/me`, {
      headers: {
        Authentication: "Bearer " + localStorage.getItem("jwt"),
      },
    });

    if (!res.ok) throw Error();
    const data = await res.json();
    return data;
  } catch {
    throw Error("Failed to get authenticated user");
  }
};

const getCurrentUserOrders = async () => {
  try {
    const res = await fetch(`${API_URL}/user/me/orders`, {
      headers: {
        Authentication: "Bearer " + localStorage.getItem("jwt"),
      },
    });

    if (!res.ok) throw Error();
    const data = await res.json();
    return data;
  } catch {
    throw Error("Failed to get orders");
  }
};

export { createUser, userLogin, getCurrentUser, getCurrentUserOrders };
