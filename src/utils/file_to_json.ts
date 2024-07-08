import { Injectable } from "@nestjs/common";
import * as csv from 'csv-parser';


@Injectable()
export class FileToJsonServie{

    static async parseCsv(file: Express.Multer.File): Promise<any> {
        const results = [];
        return new Promise((resolve, reject) => {
            const bufferStream = new (require('stream').Readable)();
            bufferStream.push(file.buffer);
            bufferStream.push(null);
      
            bufferStream
              .pipe(csv())
              .on('data', (data) => results.push(data))
              .on('end', () => {
                resolve(results);
              })
              .on('error', (error) => reject(error));
          });
      }

}

