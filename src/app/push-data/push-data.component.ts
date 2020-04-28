import { Component, OnInit } from '@angular/core';
import * as AWS from 'aws-sdk';

@Component({
  selector: 'app-push-data',
  templateUrl: './push-data.component.html',
  styleUrls: ['./push-data.component.css']
})
export class PushDataComponent implements OnInit {

  recordData = [];
  BUTTON_OPTION1 ="option1";
  BUTTON_OPTION2 ="option2";
  BUTTON_OPTION3 ="option3";
  BUTTON_OPTION4 ="option4";
  userId;

  constructor() {
    this.recordData = [];
    AWS.config.update(
      {
        accessKeyId: "AKIA6AA5IZBXWG55A4WK", 
        secretAccessKey: "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", 
        region: "ap-southeast-1" 
      });
    
    console.log("Region: ", AWS.config.region);

    AWS.config.getCredentials(function(err) {
      if (err) console.log(err.stack); // credentials not loaded
      else {
        console.log("Access Key:", AWS.config.credentials.accessKeyId);
      }
    });
    
   }

  
  ngOnInit() {
  }

  prepareRecord(selectedOption){
    var record = {
      Data: JSON.stringify({
          option:selectedOption,
          userId:this.userId,
          time: new Date()
      }),
        PartitionKey: 'questionId-1'
    };
   return record;
  }

  optionClicked(target){
    const clickedButtonId = target.attributes.id.value;
    console.log('cliked option '+clickedButtonId);
    var record = this.prepareRecord(clickedButtonId)
    this.recordData.push(record);
    this.pushRecordsToKinesis();

  }

  pushRecordsToKinesis(){
     var kinesis = new AWS.Kinesis();
        // upload data to Amazon Kinesis every second if data exists
        var self = this;
        setInterval(function() {
          console.log('Starting kinesis put...',self.recordData)
          if (!self.recordData.length) {
              console.log('No data to put..')
              return;
          }
          console.log('found data to put', JSON.stringify(self.recordData));
          // upload data to Amazon Kinesis
          kinesis.putRecords({
              Records: self.recordData,
              StreamName: 'kbc-aud-poll'
          }, function(err, data) {
              if (err) {
                  console.error(err);
              }
              console.log('response for record',self.recordData['PartitionKey'],'. data response:',data);
          });
          // clear record data
          self.recordData = [];
      }, 1000);
  }
}
