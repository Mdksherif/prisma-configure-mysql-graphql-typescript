import { mutationType, stringArg, intArg } from 'nexus';

function isError(error: unknown): error is Error {
  return error instanceof Error;
}

export const Mutation = mutationType({
  definition(t) {
    t.field('createEmployee', {
      type: 'Employee',
      args: {
        firstName: stringArg(),
        lastName: stringArg(),
        email: stringArg(),
        position: stringArg(),
      },
      resolve: async (_parent, args, context) => {
        try {
          return await context.prisma.employee.create({
            data: {
              firstName: args.firstName,
              lastName: args.lastName,
              email: args.email,
              position: args.position,
            },
          });
        } catch (error) {
          if (isError(error)) {
            throw new Error(`Error creating employee: ${error.message}`);
          }
          throw new Error('Error creating employee');
        }
      },
    });

    t.field('updateEmployee', {
      type: 'Employee',
      args: {
        id: intArg(),
        firstName: stringArg(),
        lastName: stringArg(),
        email: stringArg(),
        position: stringArg(),
      },
      resolve: async (_parent, args, context) => {
        try {
          return await context.prisma.employee.update({
            where: { id: args.id },
            data: {
              firstName: args.firstName || undefined,
              lastName: args.lastName || undefined,
              email: args.email || undefined,
              position: args.position || undefined,
            },
          });
        } catch (error) {
          if (isError(error)) {
            throw new Error(`Error updating employee: ${error.message}`);
          }
          throw new Error('Error updating employee');
        }
      },
    });

    t.field('deleteEmployee', {
      type: 'Employee',
      args: { id: intArg() },
      resolve: async (_parent, args, context) => {
        try {
          return await context.prisma.employee.delete({
            where: { id: args.id },
          });
        } catch (error) {
          if (isError(error)) {
            throw new Error(`Error deleting employee: ${error.message}`);
          }
          throw new Error('Error deleting employee');
        }
      },
    });
  },
});
