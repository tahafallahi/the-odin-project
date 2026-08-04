export function requiredRole(role) {
  return async (req, res, next) => {
    if (req.user.role != role) {
      return res
        .status(401)
        .json({ message: "You don't have permission perfom this action." });
    }

    return next();
  };
}
