import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  cryptos = [
      { code: 'BTC', name: 'Bitcoin (BTC)', price: 16800, amount: .005, digits: 6 },
      { code: 'ETH', name: 'Ethereum (ETH)', price: 790, amount: .03, digits: 6 },
      { code: 'LTC', name: 'Litecoin (LTC)', price: 275, amount: 1.02, digits: 6 },
      { code: 'BCH', name: 'Bitcoin Cash (BCH)', price: 2950, amount: .09, digits: 6 },
      { code: 'XRP', name: 'Ripple (XRP)', price: .06, amount: 846, digits: 2 },
      { code: 'USD', name: 'US Dollars (USD)', price: 1, amount: 95.25, digits: 2 }
  ];
  amtTotal: number = 0;
  addSign: string = '+';
  addAmt: number;
  addType: string = 'BTC';

  ngOnInit() {
      this.updateTotal();
  }

  updateTotal() {
      var n = 0;
      for(var i = 0; i < this.cryptos.length; i++)
        n += this.cryptos[i].price * this.cryptos[i].amount;
      this.amtTotal = n;
  }

}
