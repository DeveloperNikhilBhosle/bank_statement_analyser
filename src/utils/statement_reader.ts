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
            // console.log(withAmt);

            console.log(element, 'ele');

            let narrationnew = element.Narration.replace("THE HOUSE OF RARE","THE>HOUSE>OF>RARE").toLowerCase()
            .replace("barfi wala","barfi>wala").replace("pan shop","pan>shop")
            .replace("indrajit pal","indrajit>pal")
            .replace("the souled store","the>souled>store").replace("radhamani exports","radhamani>exports")
            .replace(/\//g, " ").replace("\n"," ")
            .split(/[.\-@ ]/);

            console.log(narrationnew,'narrationnew');
            let withAmt = parseInt(element?.['Withdrawal Amt.'].replace(",",""));

            console.log(withAmt, 'Amount');

            if(withAmt) // expenses
            {
                // Food
                if(Helpers.findMatchingElements(narrationnew,[ "biryani","birayani","bakery","bhel","puri","rasoi","farsan","eatsandtreats","treat","restaurant","pizza","juice", "dining","chinese","naturals","snacks","cake","cakes","hotel","caterers","pan>shop","barfi>wala","veg","kanifnaath","tea","cafe","zomato","swiggy","food","uber eats","doordash","grubhub","instacart","postmates","seamless","indrajit>pal"]))
                {
                    res.Food += withAmt;
                    
                    // res.object.push(element);
                    
                }else // Grocery
                if(Helpers.findMatchingElements(narrationnew,["grocery", "dmart","supermart","market","supermarket","supermarketa"]))
                {
                    res.Grocery += withAmt;
                    
                    
                }else // Transportation
                if(Helpers.findMatchingElements(narrationnew,["gas", "fuel","metro", "bus", "train","irctctourism","railway","irctc","uts","railways","petroleum","auto","mahendra"])) // PETROLEUM
                {
                    res.Transportation += withAmt;
                    
                    
                    
                }else // Entertainment 
                if(Helpers.findMatchingElements(narrationnew,["movie", "concert","entertainmen","bookmyshow","entertainment"]))
                {
                    res.Entertainment += withAmt;
                    
                }else // Housing
                if(Helpers.findMatchingElements(narrationnew,["rent", "mortgage", "utilities"]))
                {
                    res.Housing += withAmt;
                    
                    
                }else // Insurance
                if(Helpers.findMatchingElements(narrationnew,["insurance"]))
                {
                    res.Insurance += withAmt;
                    
                    
                }else // Healthcare
                if(Helpers.findMatchingElements(narrationnew,["doctor", "medication", "hospital","chemist","druggis","medical", "wellness", "mosaic wellness"])) 
                {
                    res.Healthcare += withAmt;
                    
                    
                }else // Debt
                if(Helpers.findMatchingElements(narrationnew,["loan","credit","p2p","financial","finance","gst"]))
                {
                    res.Debt += withAmt;
                    
                }else // Investments
                if(Helpers.findMatchingElements(narrationnew,['savings', 'investment','jar','indianclearingcorpor','zerodha','groww', 'coin','investment','mutual','fund','nationalpensionsystemtrust','pension']))
                {
                    res.Investments += withAmt;
                    // console.log(element.Narration, " Investments Narration");
                    

                    
                }else // Miscellaneous
                if(Helpers.findMatchingElements(narrationnew,["misc","laundry","alteration", "other", "hair","prepaid","beauty", "dress", "salon", "grooming", "retail", "shopping","communication","communications", "lifestyle","londry","vodafone","idea","airtel","jio","bsnl","docomo","jiosaavn","mobile","digital"]))
                {
                    res.Miscellaneous += withAmt;

                    
                }
                else // utility
                if(Helpers.findMatchingElements(narrationnew,['electricity', 'water', 'gas', 'utility']))
                {
                    res.Utility += withAmt;
                    
                }
                // Alcohol
                else if(Helpers.findMatchingElements(narrationnew,["wine",'wines', "alcohol", "beer", "liquor"]))
                    {
                        res.Alcohol += withAmt;
                        
                        
                    }
                else // Electronics
                if(Helpers.findMatchingElements(narrationnew,['electronic','electronics']))
                {
                    res.Electronics += withAmt;
                    
                }
                else // Shopping .replace("THE HOUSE OF RARE","THE>HOUSE>OF>RARE").toLowerCase().replace("the souled store","the>souled>store").replace("radhamani exports","radhamani>exports").split(/[.\-@ ]/)
                if(Helpers.findMatchingElements(narrationnew,['amazon','trends','westside','novelty','justherbs','getketch','ketch','flipkart','zara','puma',"the>souled>store",'bewakoof','pantaloonsfashionand','myntra','tatacliq','tatacliiq','tailor','tailors','fashions','fashion','trentzudio','trent','radhamani>exports','the>house>of>rare','collection'])) //TATACLIQ
                {
                    res.Shopping += withAmt;
                    // console.log(element.Narration, " Shopping Narration");
                    
                    
                    
                }else // Expenses
                if(Helpers.findMatchingElements(narrationnew,["salary","bonus","expenses","expense","tax", "tds"]))
                    {
                        res.Expenses += withAmt;
                        res.object.push(element);
                    }
                else // Other
                {
                    // console.log(element.Narration, " Other Narration");
                    res.Other += withAmt;
                    //  res.object.push(element);
                    // console.log(element.Narration, " OTHR Narration");
                }
            }else // Income
            {
                // console.log(element,'ele')
                if(Helpers.findMatchingElements(narrationnew,["salary", "paycheck", "interest"]))
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
                
            }else if(Helpers.checkIfStringContainsSubstrings(element?.Narration.toLowerCase(),["pci"])){
                res.payment_method.pci = res.payment_method.pci + 1;
                
            }else{
                res.payment_method.other = res.payment_method.other + 1;
                
            }
            
            res.payment_method.total = res.payment_method.total + 1;
            

        });

        

        return res;

    }
}