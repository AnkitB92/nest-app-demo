import { ConsoleLogger, Injectable } from '@nestjs/common';
import fsPromises from 'node:fs/promises';
import path from 'node:path';

@Injectable()
export class MyLoggerService extends ConsoleLogger {
  async logToFile(entry: string, logName: string): Promise<void> {
    const formattedEntry: string = `${Intl.DateTimeFormat('en-IN', {
      dateStyle: 'short',
      timeStyle: 'short',
      timeZone: 'Asia/Kolkata',
    }).format(new Date())}\t${entry}\n`;

    const toPath: string = path.join(process.cwd(), 'logs');

    try {
      await fsPromises.mkdir(toPath, { recursive: true });
      await fsPromises.appendFile(
        path.join(toPath, `${logName}.txt`),
        formattedEntry,
      );
    } catch (e: unknown) {
      if (e instanceof Error) console.error('Error: ', e.message);
      console.error('failed to write', e);
    }
  }

  log(message: any, context?: string): void {
    const entry: string = `${context}\t${message}`;
    void this.logToFile(entry, 'myLog');

    super.log(message, context);
  }

  error(message: any, stackOrContext?: string): void {
    const entry = `${stackOrContext}\t${message}`;
    void this.logToFile(entry, 'errorLog');

    super.error(message, stackOrContext);
  }
}
