import { Repository } from 'typeorm';
import { Article } from '../entities/article.m';

export class ArticleRepository extends Repository<Article> {}