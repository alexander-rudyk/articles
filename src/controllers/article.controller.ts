import { NextFunction, Request, Response } from 'express';
import { ArticleService } from '../services/article.service';
import { FilterArticleDto } from '../interfaces/article.filter.dto';
import { PaginationDto } from '../interfaces/pagination.dto';
import { SortDto } from '../interfaces/sort.dto';
import { mapToDto } from '../utils/mapToDto';

export class ArticleController {

    constructor(private articleService: ArticleService) {
        this.getArticles = this.getArticles.bind(this);
    }

    async getArticles(req: Request, res: Response, next: NextFunction) {
        const filters = mapToDto(FilterArticleDto, req.query);
        const pagination = mapToDto(PaginationDto, req.query);
        const sort = mapToDto(SortDto, req.query);

        try {
            const { data, total } = await this.articleService.getFilteredArticles(filters, sort, pagination);

            res.json({ page: pagination.page, limit: pagination.limit, total, data });
        } catch (err) {
            next(err);
        }
    }
}