import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ForexService } from './forex-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'currency-conversion-app';
  value = 0;
  flatForm: FormGroup;

  constructor(private fb: FormBuilder, private forexService: ForexService) {

  }


  ngOnInit() {
    this.flatForm = this.fb.group({
      'from': new FormControl('', Validators.required),
      'to': new FormControl('', Validators.required),
    });
  }

  onSubmit(from, to) {
    //this.submitted = true;
    this.getValue(from,to);
  }

  getValue(from, to) {
    this.forexService.getExchangeValue(from, to).subscribe(res => this.value = res.conversionMultiple);
    //this.forexService.getExchangeValue('USD', 'INR');
  }
}
