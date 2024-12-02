import { Router } from "express";
import { ArticleController } from "../controllers/article.controller";
import { ArticleRepository } from "../repositories/article.repository";
import { AppDataSource } from "../providers/db.provider";
import { Article } from "../entities/article.m";
import { ArticleService } from "../services/article.service";
import { validateDto } from "../middlewares/validate.middleware";
import { FilterArticleDto } from "../interfaces/article.filter.dto";
import { SortDto } from "../interfaces/sort.dto";
import { PaginationDto } from "../interfaces/pagination.dto";

const router = Router();

const repository: ArticleRepository = AppDataSource.getRepository(Article);
const service = new ArticleService(repository);
const controller = new ArticleController(service);

router.get('/', validateDto(FilterArticleDto), validateDto(SortDto), validateDto(PaginationDto), controller.getArticles);

export default router;