import { queryType } from 'nexus';

function isError(error: unknown): error is Error {
  return error instanceof Error;
}

export const Query = queryType({
  definition(t) {
    t.list.field('employees', {
      type: 'Employee',
      resolve: async (_parent, _args, context) => {
        try {
          return await context.prisma.employee.findMany();
        } catch (error) {
          if (isError(error)) {
            throw new Error(`Error fetching employees: ${error.message}`);
          }
          throw new Error('Error fetching employees');
        }
      },
    });

    t.field('employee', {
      type: 'Employee',
      args: { id: 'Int' },
      resolve: async (_parent, args, context) => {
        try {
          const employee = await context.prisma.employee.findUnique({
            where: { id: args.id },
          });

          if (!employee) throw new Error(`Employee not found with ID: ${args.id}`);

          return employee;
        } catch (error) {
          if (isError(error)) {
            throw new Error(`Error fetching employee: ${error.message}`);
          }
          throw new Error('Error fetching employee');
        }
      },
    });
  },
});
