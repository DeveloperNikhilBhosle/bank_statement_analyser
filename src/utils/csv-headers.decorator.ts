import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as fastcsv from 'fast-csv';

export const CsvHeaders = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const csvData = request.headers['csv-data'];
    const records = [];

    if (csvData) {
      fastcsv
        .parseString(csvData, { headers: true })
        .on('data', (row) => {
          records.push(row);
        })
        .on('end', () => {
          return records;
        });
    }

    return records;
  },
);
