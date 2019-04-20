import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { CrawlerService } from '../crawler/crawler.service';
import { CrawlTransformerService } from '../crawl-transformer/crawl-transformer.service';

@Injectable({
  providedIn: 'root'
})
export class ReaderStateService extends Dexie {


  articles: Dexie.Table<IArticle, number>;
  contents: Dexie.Table<ICrawledContent, number>;
  summaries: Dexie.Table<ICrawledSummary, number>;

  constructor(private crawler: CrawlerService, private crawlTransformer: CrawlTransformerService) {
    super("AnotherReaderAppDatabase");

    //
    // Define tables and indexes
    // (Here's where the implicit table props are dynamically created)
    //
    this.version(1).stores({
      articles: '++id, url, scrollProgress, createDate, modifiedDate, lastScrollDate, archived, liked, disliked',
      contents: 'articleId, url, htmlContent',
      summaries: 'articleId, url, title, snippet, crawlDate',
    });

    // The following lines are needed for it to work across typescipt using babel-preset-typescript:
    this.articles = this.table("articles");
    this.contents = this.table("contents");
    this.summaries = this.table("summaries");
  }

  //manually done by user
  async recrawl(articleId: number) {
    /* TODO */
  }

  //happens on export of a new (or existing) url
  //if it already exists, it is un-archived, and its modifiedDate changes, but not its createDate
  // there will not be an automatic recrawl in this case
  async addOrUpdateArticle(url: string) {
    let foundArticles = await this.articles.where('url').equals(url.toLowerCase()).toArray();
    if (foundArticles.length > 0) {
      //existing one
      foundArticles.forEach(v => {
        this.archiveArticle(v.id, false);
      });
    } else {
      //create new one and add to crawling
      // TODO
    }
  }


  //process the result in memory, it's small enough!
  async retrieveArticles(offset: number, limit: number,
    retrieveUnarchivedInsteadOfArchivedArticles: boolean) {
    return this.articles.where('archived').equals(retrieveUnarchivedInsteadOfArchivedArticles ? 0 : 1).offset(offset).limit(limit);
  }

  async retrieveContent() {/* TODO */ }

  async retrieveSummary() {/* TODO */ }

  //done by debounced scroll event within the gui
  async updateScrollStateArticle(articleId: number, scrollState: number) {
    /* TODO */
  }

  //done by clicking a button (done by the user)
  async archiveArticle(articleId: number, archive: boolean) {
    /* TODO */
  }
}


// By defining the interface of table records,
// you get better type safety and code completion
export interface ICrawledContent {
  articleId: number;
  url: string; // Primary key. 
  htmlContent: string; // the internal content, crawled and transformed into useable content
}

export interface ICrawledSummary {
  articleId: number;
  url: string; // Primary key
  title: string; //returned by crawler
  snippet: string; //at most 200 characters long
  crawlDate: Date; // date when this was crawled
}

export interface ICrawlResult extends ICrawledContent, ICrawledSummary { }

//added later on
export interface IArticleTag {
  articleId: number;
  tag: string;
}

export interface IArticle {
  id?: number;
  url: string;
  scrollProgress: number; // within [0.0, 1.0]
  createDate: Date;
  modifiedDate: Date;
  lastScrollDate: Date;
  archived: number; // one of {0, 1}, with 1 describing 'archived'
  liked: number; // one of {-1, 0, +1} describing disliked, normal, or liked
}
