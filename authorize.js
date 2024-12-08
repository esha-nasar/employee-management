const authorize = (user, requiredRole) => {
    if (!user || user.role !== requiredRole) {
      throw new Error('Access denied: Unauthorized');
    }
  };
  
  module.exports = { authorize };
  