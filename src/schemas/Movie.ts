import { builder, db } from '../schemas/builder';

builder.prismaObject('Movie', {
  findUnique: null,
  name: 'Movie',
  fields: (t) => ({
    id: t.exposeID('id'),
    name: t.exposeString('name'),
    description: t.exposeString('description'),
    director: t.exposeString('director'),
    genre: t.exposeString('genre'),
    releasedAt: t.expose('releasedAt', { type: 'Date' })
  })
});

// builder.queryType({
//   fields: (t) => ({
//     moviesList: t.prismaField({
//       type: ['Movie'],
//       resolve: () => {
//         return db.movie.findMany();
//       }
//     })
//   })
// });
