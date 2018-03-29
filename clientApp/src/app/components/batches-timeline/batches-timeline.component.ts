import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-batches-timeline',
  templateUrl: './batches-timeline.component.html',
  styleUrls: ['./batches-timeline.component.css']
})
export class BatchesTimelineComponent implements OnInit {
  // values from current site
  width = 1536;
  height = 2067;

  batches = [
    // test data
    {
      name: 'Feb02-18',
      core: 'Java',
      focus: 'none',
      start_date: new Date(2018, 2, 5),
      end_date: new Date(2018, 4, 29),
      trainer: 'August Duet',
      location: 'Viginia',
      building: '1',
      room: '101'
    },
    {
      name: 'Feb02-18',
      core: 'Java',
      focus: 'none',
      start_date: new Date(2016, 2, 5),
      end_date: new Date(2016, 4, 29),
      trainer: 'August',
      location: 'Viginia',
      building: '1',
      room: '101'
    },
    {
      name: 'Feb02-18',
      core: 'Java',
      focus: 'none',
      start_date: new Date(2017, 2, 5),
      end_date: new Date(2017, 4, 29),
      trainer: 'Emily',
      location: 'Viginia',
      building: '1',
      room: '101'
    },
    {
      name: 'Feb02-18',
      core: 'Java',
      focus: 'none',
      start_date: new Date(2018, 6, 5),
      end_date: new Date(2018, 8, 29),
      trainer: 'August',
      location: 'Viginia',
      building: '1',
      room: '101'
    }
  ];

  // default values for formatting
  column_width = 50;
  swimlane_x_ofs = 50;
  swimlane_y_ofs = 20;
  months = [];

  // editable data
  start_date: Date;
  end_date: Date;
  trainers_per_page = 0;

  // generated data
  trainers = [];

  constructor() {}

  ngOnInit() {
    if (this.trainers_per_page === 0) {
      this.trainers_per_page = this.batches.length;
    }
    // make list of trainers
    for (let i = 0; i < this.batches.length; i++) {
      const batch = this.batches[i];
      const trainer = batch.trainer;
      if (!this.trainers.includes(trainer)) {
        this.trainers.push(trainer);
      }
    }
    // set start date to 3 months ago
    const today = new Date(Date.now());
    this.start_date = new Date(today);
    this.start_date.setMonth(this.start_date.getMonth() - 3);
    // set end date to 6 months ago
    this.end_date = new Date(today);
    this.end_date.setMonth(this.end_date.getMonth() + 6);
  }

  getColorForCore(type) {
    let color = '';
    color = '#ffaa44';
    color = '#1c77b4'; //java
    color = '#ff7f0e'; //.net
    color = '#aec7e8'; //sdet
    color = '#ffbb78'; //Custom
    return color;
  }

  getBatchesRectangles() {
    const rects = [];
    for (let i = 0; i < this.batches.length; i++) {
      const batch = this.batches[i];
      let duration = batch.end_date.valueOf() - batch.start_date.valueOf();
      // ms to weeks
      duration = Math.floor(duration / (1000 * 60 * 60 * 24 * 7));
      const h = duration * 10;
      // const y = (this.end_date.valueOf()-this.start_date.valueOf());
      const y = 10;
      const color = this.getColorForCore(batch.core);
      const w = 20;
      const x = this.swimlane_x_ofs + i * this.column_width + (this.column_width - w) * 0.5;
      const durarray = duration
        .toString()
        .split(' ')
        .concat('WEEKS'.split(''));
      rects.push({ x: x, y: y, w: w, h: h, dur: durarray, color: color });
    }
    return rects;
  }

  getSwimlanes() {
    const lines = [];
    for (let i = 0; i < this.trainers.length + 1; i++) {
      // let duration =
      const xpos = this.swimlane_x_ofs + i * this.column_width;
      lines.push({ x1: xpos, y1: this.swimlane_y_ofs, x2: xpos, y2: this.height - this.swimlane_y_ofs });
    }
    return lines;
  }
}
