import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ForexService } from './forex.service';
import { CurrencyConversionService } from './currency-conversion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'currency-conversion-app';
  flatFormvalue = 0;
  currencyConversionvalue = 0;
  flatForm: FormGroup;
  currencyConversionForm: FormGroup;

  constructor(private fb: FormBuilder,
    private forexService: ForexService,
    private currencyConversionService: CurrencyConversionService) {

  }


  ngOnInit() {
    this.flatForm = this.fb.group({
      'from': new FormControl('', Validators.required),
      'to': new FormControl('', Validators.required),
    });

    this.currencyConversionForm = this.fb.group({
      'from': new FormControl('', Validators.required),
      'to': new FormControl('', Validators.required),
      'quantity': new FormControl('', Validators.required),
    });

  }

  onFlatFormSubmit(from, to) {
    this.forexService.getExchangeValue(from, to).subscribe((res) => {
      this.flatFormvalue = res.conversionMultiple;
    });
  }

  oncurrencyConversionFormSubmit(from, to, quantity) {
    this.currencyConversionService.getCurrencyConversionValue(from, to, quantity).subscribe(res => {
      this.currencyConversionvalue = res.totalCalculatedAmount;
    });
  }
}
