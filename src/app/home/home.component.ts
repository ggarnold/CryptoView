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
                style({ opacity: 1, backgroundColor: '#f16', offset: 0.5 }),
                style({ offset: 1 }),
            ]))
        ]
    ]
})
export class HomeComponent implements OnInit {

    constructor() { }

    cryptos = [
        { code: 'BTC', name: 'Bitcoin (BTC)', price: 16800, amount: .005, digits: 6, animate: 'hidden' },
        { code: 'ETH', name: 'Ethereum (ETH)', price: 790, amount: .03, digits: 6, animate: 'hidden' },
        { code: 'LTC', name: 'Litecoin (LTC)', price: 275, amount: 1.02, digits: 6, animate: 'hidden' },
        { code: 'BCH', name: 'Bitcoin Cash (BCH)', price: 2950, amount: .09, digits: 6, animate: 'hidden' },
        { code: 'XRP', name: 'Ripple (XRP)', price: .06, amount: 846, digits: 2, animate: 'hidden' },
        { code: 'USD', name: 'US Dollars (USD)', price: 1, amount: 95.25, digits: 2, animate: 'hidden' }
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
