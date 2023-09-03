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

export { createUser };
