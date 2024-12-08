const Employee = require('./model/Employee');
const { login, authenticate } = require('./auth'); 
const { authorize } = require('./authorize'); 

const resolvers = {
  Query: {
    
    listEmployees: async (_, { page = 1, limit = 10, sortBy = 'name', sortOrder = 'asc' }, context) => {
      const user = authenticate(context.req); 
      authorize(user, 'admin'); 

      const skip = (page - 1) * limit;
      const sortOptions = {};
      sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

      try {
        const employees = await Employee.find()
          .skip(skip)
          .limit(limit)
          .sort(sortOptions);
        return employees;
      } catch (error) {
        throw new Error('Error fetching employees');
      }
    },
  },
  Mutation: {
    
    login: async (_, { username, password }) => {
      return await login(username, password); 
    },

    
    addEmployee: async (_, { name, age, class: empClass, subjects, attendance, role }, context) => {
      const user = authenticate(context.req); 
      authorize(user, 'admin'); 

      const employee = new Employee({ name, age, class: empClass, subjects, attendance, role });
      return employee.save();
    },

    
    updateEmployee: async (_, { id, ...updates }, context) => {
      const user = authenticate(context.req); 
      authorize(user, 'admin'); 

      return Employee.findByIdAndUpdate(id, updates, { new: true });
    },
  },
};

module.exports = resolvers;
