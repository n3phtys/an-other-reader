import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { CrawlService } from '../crawl/crawl.service';
import { ReaderStateService } from '../reader-state/reader-state.service';

@Component({
  selector: 'app-text-page',
  templateUrl: './text-page.component.html',
  styleUrls: ['./text-page.component.scss']
})
export class TextPageComponent implements OnInit {
  id: string;

  constructor(private route: ActivatedRoute,
    private router: Router, private crawl: CrawlService, private readerState: ReaderStateService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(pm => {
      const id = (pm['params']['id']);
      this.id = id;
    });
  }

}
