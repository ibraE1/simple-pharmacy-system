import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser, getCurrentUser, userLogin } from "../api/userAPI";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../api/adminAPI";

const userKey = ["authenticated-user"];

const useUser = (options = {}) => useQuery(userKey, getCurrentUser, options);

const useLogin = (loginAs, options = {}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const setUser = (data) => queryClient.setQueryData(userKey, data);

  const loginFn = loginAs == "admin" ? adminLogin : userLogin;

  return useMutation(loginFn, {
    ...options,
    onSuccess: (user) => {
      setUser(user);
      navigate("/home");
    },
  });
};

const useRegister = (options = {}) => {
  const navigate = useNavigate();

  return useMutation(createUser, {
    ...options,
    onSuccess: () => {
      alert("Registration Successful");
      navigate("/login");
    },
  });
};

//   const useLogout = (options = {}) => {
//     const queryClient = useQueryClient();

//     const setUser = (data) => queryClient.setQueryData(userKey, data);

//     return useMutation(logoutFn, {
//       ...options,
//       onSuccess: () => setUser(null),
//     });
//   };

export { useRegister, useLogin, useUser };
