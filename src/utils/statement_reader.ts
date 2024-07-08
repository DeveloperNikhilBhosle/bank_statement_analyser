import { StatementCategories } from "src/models/statement_categories";
import { Helpers } from "./helper";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FileToJsonService
{
    
     static async statementAnalyser(json : any){

        // json = [{
        //     "Date": "05/04/23",
        //     "Narration": "UPI-BEWAKOOF-BEWAKOOF1@PAYTM-PYTM0123456-309571050406-OIDBEWAKOOF2023040",
        //     "Chq./Ref.No.": "309571050406",
        //     "Value Dt": "05/04/23",
        //     "Withdrawal Amt.": "997",
        //     "Deposit Amt.": "",
        //     "Closing Balance": "38218.27"
        //   }];
        // console.log(json)
        var res : StatementCategories = new StatementCategories();

        // console.log("UPI-JAR SAVE DAILY-JARMYJARONLINE@YBL-YESB0YBLUPI-309818125611-SUBSCRIPTION DEBIT".toLowerCase());
        // const b = "UPI-BEWAKOOF-BEWAKOOF1@PAYTM-PYTM0123456-309571050406-OIDBEWAKOOF2023040".replace("THE HOUSE OF RARE","THE>HOUSE>OF>RARE").toLowerCase().replace("the souled store","the>souled>store").replace("radhamani exports","radhamani>exports").split(/[.\-@ ]/);
        // console.log(b,'b');
        // const x = Helpers.findMatchingElements(b,['amazon','westside','justherbs','getketch','ketch','flipkart','zara','puma',"the>souled>store",'bewakoof','pantaloonsfashionand','myntra','tatacliq','tatacliiq','tailor','tailors','fashions','trentzudio','trent','radhamani>exports','the>house>of>rare'])
        // console.log(x,"-------------------------------");

        json.forEach(element => {
            
            // console.log(element,'element');
            // console.log(element.Narration,'element.Narration');
            // console.log(parseInt(element?.['Withdrawal Amt.']));
            if(parseInt(element?.['Withdrawal Amt.'])) // expenses
            {
                // Food
                if(Helpers.findMatchingElements(element.Narration.toLowerCase().replace("barfi wala","barfi>wala").replace("pan shop","pan>shop").replace("indrajit pal","indrajit>pal").split(/[.\-@ ]/),[ "biryani","birayani","bakery","eatsandtreats","restaurant","pizza","juice", "dining","chinese","naturals","snacks","cake","cakes","hotel","caterers","pan>shop","barfi>wala","veg","kanifnaath","tea","cafe","zomato","swiggy","food","uber eats","doordash","grubhub","instacart","postmates","seamless","indrajit>pal"]))
                {
                    res.Food += parseInt(element?.['Withdrawal Amt.']);
                    // res.object.push(element);
                    
                }else // Grocery
                if(Helpers.findMatchingElements(element.Narration.toLowerCase().split(/[.\-@ ]/),["grocery", "dmart","supermart","market","supermarket","supermarketa"]))
                {
                    res.Grocery += parseInt(element?.['Withdrawal Amt.']);
                    
                    
                }else // Transportation
                if(Helpers.findMatchingElements(element.Narration.toLowerCase().split(/[.\-@ ]/),["gas", "fuel","metro", "bus", "train","railway","irctc","uts","railways"]))
                {
                    res.Transportation += parseInt(element?.['Withdrawal Amt.']);
                    
                    
                }else // Entertainment 
                if(Helpers.findMatchingElements(element.Narration.toLowerCase().split(/[.\-@ ]/),["movie", "concert","entertainmen","bookmyshow","entertainment"]))
                {
                    res.Entertainment += parseInt(element?.['Withdrawal Amt.']);
                    
                }else // Housing
                if(Helpers.findMatchingElements(element.Narration.toLowerCase().split(/[.\-@ ]/),["rent", "mortgage", "utilities"]))
                {
                    res.Housing += parseInt(element?.['Withdrawal Amt.']);
                    
                    
                }else // Insurance
                if(Helpers.findMatchingElements(element.Narration.toLowerCase().split(/[.\-@ ]/),["insurance"]))
                {
                    res.Insurance += parseInt(element?.['Withdrawal Amt.']);
                    
                    
                }else // Healthcare
                if(Helpers.findMatchingElements(element.Narration.toLowerCase().split(/[.\-@ ]/),["doctor", "medication", "hospital","chemist","druggis","medical", "wellness", "mosaic wellness"])) 
                {
                    res.Healthcare += parseInt(element?.['Withdrawal Amt.']);
                    
                    
                }else // Debt
                if(Helpers.findMatchingElements(element.Narration.toLowerCase().split(/[.\-@ ]/),["loan","credit","p2p","financial","finance"]))
                {
                    res.Debt += parseInt(element?.['Withdrawal Amt.']);
                    
                }else // Investments
                if(Helpers.findMatchingElements(element.Narration.toLowerCase().split(/[.\-@ ]/),['savings', 'investment','jar','indianclearingcorpor','zerodha','groww', 'coin','investment','mutual','fund','nationalpensionsystemtrust','pension']))
                {
                    res.Investments += parseInt(element?.['Withdrawal Amt.']);
                    // console.log(element.Narration, " Investments Narration");
                    

                    
                }else // Miscellaneous
                if(Helpers.findMatchingElements(element.Narration.toLowerCase().split(/[.\-@ ]/),["misc","laundry","alteration", "other", "hair","prepaid", "dress", "salon", "grooming", "retail", "shopping", "lifestyle","londry","vodafone","idea","airtel","jio","bsnl","docomo","jiosaavn"]))
                {
                    res.Miscellaneous += parseInt(element?.['Withdrawal Amt.']);

                    
                }
                else // utility
                if(Helpers.findMatchingElements(element.Narration.toLowerCase().split(/[.\-@ ]/),['electricity', 'water', 'gas', 'utility']))
                {
                    res.Utility += parseInt(element?.['Withdrawal Amt.']);
                }
                // Alcohol
                else if(Helpers.findMatchingElements(element.Narration.toLowerCase().split(/[.\-@ ]/),["wine",'wines', "alcohol", "beer", "liquor"]))
                    {
                        res.Alcohol += parseInt(element?.['Withdrawal Amt.']);
                        
                        
                    }
                else // Electronics
                if(Helpers.findMatchingElements(element.Narration.toLowerCase().split(/[.\-@ ]/),['electronic','electronics']))
                {
                    res.Electronics += parseInt(element?.['Withdrawal Amt.']);
                    
                }
                else // Shopping .replace("THE HOUSE OF RARE","THE>HOUSE>OF>RARE").toLowerCase().replace("the souled store","the>souled>store").replace("radhamani exports","radhamani>exports").split(/[.\-@ ]/)
                if(Helpers.findMatchingElements(element.Narration.replace("THE HOUSE OF RARE","THE>HOUSE>OF>RARE").toLowerCase().replace("the souled store","the>souled>store").replace("radhamani exports","radhamani>exports").split(/[.\-@ ]/),['amazon','trends','westside','justherbs','getketch','ketch','flipkart','zara','puma',"the>souled>store",'bewakoof','pantaloonsfashionand','myntra','tatacliq','tatacliiq','tailor','tailors','fashions','trentzudio','trent','radhamani>exports','the>house>of>rare'])) //TATACLIQ
                {
                    res.Shopping += parseInt(element?.['Withdrawal Amt.']);
                    // console.log(element.Narration, " Shopping Narration");
                    
                    
                }
                else // Other
                {
                    // console.log(element.Narration, " Other Narration");
                    res.Other += parseInt(element?.['Withdrawal Amt.']);
                    // res.object.push(element);
                    // console.log(element.Narration, " OTHR Narration");
                }
            }else // Income
            {
                // console.log(element,'ele')
                if(Helpers.findMatchingElements(element.Narration.toLowerCase().split(/[.\-@ ]/),["salary", "paycheck", "interest"]))
                {
                    res.Income += parseInt(element?.['Deposit Amt.']);
                    
                    
                }

            }

            if(Helpers.checkIfStringContainsSubstrings(element?.Narration.toLowerCase(),["imps"])){
                res.payment_method.imps = res.payment_method.imps + 1;
            }else if(Helpers.checkIfStringContainsSubstrings(element?.Narration.toLowerCase(),["upi"])){
                res.payment_method.upi = res.payment_method.upi + 1;
            }else if(Helpers.checkIfStringContainsSubstrings(element?.Narration.toLowerCase(),["rtgs"])){
                res.payment_method.rtgs = res.payment_method.rtgs + 1;
            }else if(Helpers.checkIfStringContainsSubstrings(element?.Narration.toLowerCase(),["neft"])){
                res.payment_method.neft = res.payment_method.neft + 1;
                
            }else{
                res.payment_method.other = res.payment_method.other + 1;
                
            }
            
            res.payment_method.total = res.payment_method.total + 1;
            

        });

        

        return res;

    }
}