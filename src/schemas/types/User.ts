import { builder, db } from '../../schemas/builder';
import { hash } from 'bcrypt';

builder.prismaObject('User', {
  findUnique: (user) => ({ id: user.id }),
  name: 'User',
  fields: (t) => ({
    id: t.exposeID('id'),
    name: t.exposeString('name'),
    username: t.exposeString('username'),
    email: t.expose('email', {
      type: 'String',
      nullable: true
    }),
    reviews: t.relation('Review', {
      resolve: (query) => db.review.findMany({ ...query })
    })
  })
});

builder.queryField('users', (t) =>
  t.prismaField({
    type: ['User'],
    resolve: async (query) => db.user.findMany({ ...query })
  })
);

builder.mutationField('createUser', (t) =>
  t.prismaField({
    type: 'User',
    nullable: false,
    args: {
      name: t.arg.string({ required: true }),
      username: t.arg.string({ required: true }),
      email: t.arg.string({ required: true }),
      password: t.arg.string({ required: true })
    },
    resolve: async (query, _parent, args) => {
      const password = await hash(args.password, 12);

      return db.user.create({
        ...query,
        data: {
          ...args,
          password
        }
      });
    }
  })
);
