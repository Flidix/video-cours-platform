import { DatabaseEntitiesType } from '../types';

export const databaseTables: Record<keyof DatabaseEntitiesType, string> = <const>{
  users: 'users',
  subscribes: 'subscribes',
  courses: 'courses',
  ratings: 'ratings',
  videos: 'videos',
  comments: 'comments',
  likes: 'likes',
  listens: 'listens',
  buedCourses: 'buedCourses',
  orders: 'orders',
  categories: 'categories',
  coursToCategory: 'coursToCategory',
  commentsToComments: 'commentsToComments',
};
