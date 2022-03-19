import type { Prisma, User, Movie, Review } from "@prisma/client";
export default interface PrismaTypes {
    User: {
        Name: "User";
        Shape: User;
        Include: Prisma.UserInclude;
        Select: Prisma.UserSelect;
        Where: Prisma.UserWhereUniqueInput;
        Fields: "Review";
        RelationName: "Review";
        ListRelations: "Review";
        Relations: {
            Review: {
                Shape: Review[];
                Types: PrismaTypes["Review"];
            };
        };
    };
    Movie: {
        Name: "Movie";
        Shape: Movie;
        Include: Prisma.MovieInclude;
        Select: Prisma.MovieSelect;
        Where: Prisma.MovieWhereUniqueInput;
        Fields: "Review";
        RelationName: "Review";
        ListRelations: "Review";
        Relations: {
            Review: {
                Shape: Review[];
                Types: PrismaTypes["Review"];
            };
        };
    };
    Review: {
        Name: "Review";
        Shape: Review;
        Include: Prisma.ReviewInclude;
        Select: Prisma.ReviewSelect;
        Where: Prisma.ReviewWhereUniqueInput;
        Fields: "movie" | "reviewer";
        RelationName: "movie" | "reviewer";
        ListRelations: never;
        Relations: {
            movie: {
                Shape: Movie;
                Types: PrismaTypes["Movie"];
            };
            reviewer: {
                Shape: User;
                Types: PrismaTypes["User"];
            };
        };
    };
}