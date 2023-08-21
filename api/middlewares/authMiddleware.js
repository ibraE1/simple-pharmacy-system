const verifyToken = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(400).json("Please login to access this resource");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return res.status(400).json("This user no longer exists on the system");
  }

  req.user = currentUser;

  next();
};

export { verifyToken };
