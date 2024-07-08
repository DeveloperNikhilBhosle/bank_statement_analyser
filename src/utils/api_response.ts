import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common"
import { async } from "rxjs"

@Injectable()
export class apiResponse{
    
    
     static ReturnResponse(status: number, message : string, object? : any){
        
        if(status == 200){
            return {status : status, message : message, data : object}
        }
        else if(status == 400){
            return new BadRequestException({remark : message})
        }else  if(status == 403){
            return new ForbiddenException({remark : message})
        }else  if(status == 401){
            return new UnauthorizedException({remark : message})
        }else {
            return new InternalServerErrorException({remark : message})
        }
      }
}