import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes, query, stagger } from '@angular/animations'

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    animations: [
        trigger('rowUpdated', [
            state('hidden' , style({ opacity: 1 })),
            state('shown', style({ opacity: 1 })),
            transition('hidden <=> shown', animate('2s ease', keyframes([
                style({ offset: 0 }),
                style({ offset: 0.5, opacity: 1, backgroundColor: '#618685' }),
                style({ offset: 1 }),
            ]))
        ]
    ]
})
export class HomeComponent implements OnInit {

    constructor() { }

    cryptos = [
        { code: 'BTC', name: 'Bitcoin (BTC)', price: 16725.00, amount: .03524, digits: 5, animate: 'hidden' },
        { code: 'ETH', name: 'Ethereum (ETH)', price: 784.68, amount: .4281, digits: 5, animate: 'hidden' },
        { code: 'LTC', name: 'Litecoin (LTC)', price: 290.75, amount: 1.33207, digits: 5, animate: 'hidden' },
        { code: 'BCH', name: 'Bitcoin Cash (BCH)', price: 3036.09, amount: .0391, digits: 5, animate: 'hidden' },
        { code: 'XRP', name: 'Ripple (XRP)', price: 1.24, amount: 846.348, digits: 2, animate: 'hidden' },
        { code: 'USD', name: 'US Dollars (USD)', price: 1, amount: 232.30, digits: 2, animate: 'hidden' }
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

    addItem() {
        if (!this.addAmt)
            return;

        var addAmt = parseFloat(this.addAmt);

        // Find the currency
        for(var i = 0; i < this.cryptos.length; i++) {

            // Move to next if not a match
            var ct = this.cryptos[i];
            if (ct.code != this.addType)
                continue;

            // Are we adding or subtracting?
            if (this.addSign == '-') {
                // Subtract
                ct.amount -= addAmt;
                if (ct.amount < 0)
                    ct.amount = 0; //Ensure not less than zero
            }
            else {
                // Add
                ct.amount += addAmt;
            }

            // Update
            this.updateTotal();
            ct.animate = ((ct.animate === 'shown') ? 'hidden' : 'shown');
            console.log('Animating... ' + ct.code + '=' + ct.animate);
        }

    }

}
