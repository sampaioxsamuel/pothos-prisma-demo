import { builder, db } from '../builder';

builder.prismaObject('Review', {
  findUnique: null,
  name: 'Review',
  fields: (t) => ({
    id: t.exposeID('id'),
    description: t.exposeString('description'),
    movieId: t.exposeString('movieId'),
    reviewerId: t.exposeString('reviewerId'),
    movie: t.relation('movie', {
      nullable: true,
      resolve: (query, parent) =>
        db.movie.findFirst({
          ...query,
          where: {
            id: parent.movieId
          }
        })
    }),
    reviewer: t.relation('reviewer', {
      nullable: true,
      resolve: (query, parent) =>
        db.user.findFirst({
          ...query,
          where: {
            id: parent.reviewerId
          }
        })
    })
  })
});

builder.queryField('reviews', (t) =>
  t.prismaField({
    type: ['Review'],
    resolve: async () => db.review.findMany()
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
