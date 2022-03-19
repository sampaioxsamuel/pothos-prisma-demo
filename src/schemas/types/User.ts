import { builder, db } from '../../schemas/builder';

builder.prismaObject('User', {
  findUnique: null,
  name: 'User',
  fields: (t) => ({
    id: t.exposeID('id'),
    name: t.exposeString('name'),
    username: t.exposeString('username'),
    email: t.expose('email', {
      type: 'String',
      nullable: true
    })
  })
});

builder.queryField('usersList', (t) =>
  t.prismaField({
    type: ['User'],
    resolve: async (query) => db.user.findMany({ ...query })
  })
);
