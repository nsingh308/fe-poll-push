import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from "rxjs";

import { Router, ActivatedRoute } from '@angular/router';

const WEBSOCKET_URL = "wss://gbv3q7ye3c.execute-api.ap-southeast-1.amazonaws.com/dev";

export interface Message {
  author: string;
  message: string;
}


@Component({
  selector: 'app-poll-data',
  templateUrl: './poll-data.component.html',
  styleUrls: ['./poll-data.component.css']
})
export class PollDataComponent implements OnInit {
  
  public messages: Subject<Message>;
  test:{ id:string}
  constructor(private router: Router, private route:ActivatedRoute) {
   this.test = {id:''}
  }
  ngOnInit(){
    this.test.id = this.route.snapshot.params['id'];
    this.route.params.subscribe((params)=>{
      this.test.id = params['id'];
    });
  }
  onPushBtnClick(){
    //this.router.navigate(['push'],{relativeTo:this.route});
    this.router.navigate(['push']);
  }

}
