import { builder, db } from '../builder';

builder.prismaObject('Review', {
  findUnique: (review) => ({ id: review.id }),
  name: 'Review',
  fields: (t) => ({
    id: t.exposeID('id'),
    description: t.exposeString('description'),
    movieId: t.exposeString('movieId'),
    reviewerId: t.exposeString('reviewerId'),
    movie: t.relation('movie'),
    reviewer: t.relation('reviewer')
  })
});

builder.queryField('reviews', (t) =>
  t.prismaField({
    type: ['Review'],
    resolve: async (query) => db.review.findMany({ ...query })
  })
);

builder.mutationField('createReview', (t) =>
  t.prismaField({
    type: 'Review',
    nullable: false,
    args: {
      reviewerId: t.arg.string({ required: true }),
      movieId: t.arg.string({ required: true }),
      description: t.arg.string({ required: true })
    },
    resolve: (query, _parent, args) => {
      return db.review.create({
        ...query,
        data: {
          ...args
        }
      });
    }
  })
);
