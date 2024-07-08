export class StatementCategories{
    Income: number = 0;
    Housing: number = 0;
    Transportation: number = 0;
    Food: number = 0;
    Grocery: number = 0;
    Entertainment: number = 0;
    Insurance: number = 0;
    Healthcare: number = 0;
    Debt: number = 0;
    // Savings: number = 0;
    Investments: number = 0;
    Miscellaneous: number = 0;
    Utility: number = 0;
    Alcohol: number = 0;
    Electronics: number = 0;
    Shopping: number = 0;
    Other: number = 0;
    object : any[] = [];
    payment_method : PaymentMethods = new PaymentMethods();
    
}

export class PaymentMethods{
    imps : number = 0;
    upi : number = 0;
    neft : number = 0;
    rtgs : number = 0;
    other : number = 0;
    total : number = 0;
}