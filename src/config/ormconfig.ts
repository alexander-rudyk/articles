import { DataSourceOptions } from 'typeorm';
import { config } from '.';
import { Article } from '../entities/article.m';
import { Tag } from '../entities/tag.m';

const dbConfig = config.db;

export const ormConfig: DataSourceOptions = {
    type: 'postgres',
    ...dbConfig,
    entities: [Article, Tag],
    synchronize: true,
}