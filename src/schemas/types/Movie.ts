import { builder, db } from '../builder';

builder.prismaObject('Movie', {
  findUnique: null,
  name: 'Movie',
  fields: (t) => ({
    id: t.exposeID('id'),
    name: t.exposeString('name'),
    description: t.exposeString('description'),
    director: t.exposeString('director'),
    genre: t.exposeString('genre'),
    releasedAt: t.expose('releasedAt', { type: 'Date' }),
    createdAt: t.expose('createdAt', { type: 'Date' }),
    updatedAt: t.expose('updatedAt', { type: 'Date' }),
    reviews: t.relation('Review', {
      resolve: (query) => db.review.findMany({ ...query })
    })
  })
});

builder.queryField('movies', (t) =>
  t.prismaField({
    type: ['Movie'],
    resolve: async (query) => db.movie.findMany({ ...query })
  })
);

builder.queryField('movieById', (t) =>
  t.prismaField({
    type: 'Movie',
    nullable: true,
    resolve: async (query) => db.movie.findUnique({ ...query, where: { id: '' } })
  })
);

builder.mutationField('createMovie', (t) =>
  t.prismaField({
    type: 'Movie',
    nullable: false,
    args: {
      name: t.arg.string({ required: true }),
      genre: t.arg.string({ required: true }),
      description: t.arg.string({ required: true }),
      releasedAt: t.arg({ type: 'Date', required: true }),
      director: t.arg.string({ required: true })
    },
    resolve: (query, _parent, args) => {
      return db.movie.create({
        ...query,
        data: {
          ...args
        }
      });
    }
  })
);
