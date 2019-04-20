import { Component, OnInit } from '@angular/core';
import { ReaderStateService } from '../reader-state/reader-state.service';

@Component({
  selector: 'app-reader-list',
  templateUrl: './reader-list.component.html',
  styleUrls: ['./reader-list.component.scss']
})
export class ReaderListComponent implements OnInit {

  constructor(private readerState: ReaderStateService) { }

  ngOnInit() {
  }

}
