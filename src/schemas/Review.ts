import { builder, db } from '../schemas/builder';

builder.prismaObject('Review', {
  findUnique: null,
  name: 'Review',
  fields: (t) => ({
    id: t.exposeID('id'),
    movieId: t.exposeString('movieId'),
    reviewerId: t.exposeString('reviewerId')
  })
});

// builder.queryField('reviews', (t) =>
//   t.prismaField({
//     type: ['Review'],
//     resolve: async () => db.review.findMany()
//   })
// );
