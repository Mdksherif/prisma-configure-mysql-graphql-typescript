import { objectType } from 'nexus';

export const Employee = objectType({
  name: 'Employee',
  definition(t) {
    t.int('id');
    t.string('firstName');
    t.string('lastName');
    t.string('email');
    t.string('position');
  },
});

