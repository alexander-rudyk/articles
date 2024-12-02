import { FilterArticleDto } from '../interfaces/article.filter.dto';
import { PaginationDto } from '../interfaces/pagination.dto';
import { SortDto } from '../interfaces/sort.dto';
import { ArticleRepository } from '../repositories/article.repository';

export class ArticleService {
    constructor(private articleRepository: ArticleRepository) {}

    async getFilteredArticles(filters: FilterArticleDto, sort: SortDto, pagination: PaginationDto) {
        const { title, author, tags, status, from, to, minViews, maxViews } = filters;
        const { page, limit } = pagination;
        const { sortBy, order } = sort;

        const queryBuilder = this.articleRepository.createQueryBuilder('article');

        switch (true) {
            case !!title:
                queryBuilder.andWhere('LOWER(article.title) LIKE :title', { title: `%${title.toLowerCase()}%` });
            case !!author:
                queryBuilder.andWhere('article.author = :author', { author });
            case !!tags:
                queryBuilder.andWhere('article.tags && ARRAY[:...tags]', { tags });
            case !!status:
                queryBuilder.andWhere('article.status = :status', { status });
            case !!from && !!to:
                queryBuilder.andWhere('article.created_at BETWEEN :from AND :to', { from, to });
            case !!minViews && !!maxViews:
                queryBuilder.andWhere('article.views BETWEEN :minViews AND :maxViews', { minViews, maxViews });

        }

        queryBuilder
            .orderBy(`article.${sortBy || 'created_at'}`, order === 'asc' ? 'ASC' : 'DESC')
            .skip((page - 1) * limit)
            .take(limit);

        const [data, total] = await queryBuilder.getManyAndCount();

        return { data, total };
    }
}