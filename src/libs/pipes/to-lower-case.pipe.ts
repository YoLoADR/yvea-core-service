import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ToLowerCasePipe implements PipeTransform {
  private FIELDS_INCLUDED = ['email'];

  private isObj(obj: any): boolean {
    return typeof obj === 'object' && obj !== null;
  }

  private toLowerCase(values: any[]) {
    Object.keys(values).forEach((key) => {
      if (this.isObj(values[key])) {
        values[key] = this.toLowerCase(values[key]);
      } else if (
        typeof values[key] === 'string' &&
        this.FIELDS_INCLUDED.includes(key)
      ) {
        values[key] = values[key].toLowerCase();
      }
    });

    return values;
  }

  transform(values: any, metadata: ArgumentMetadata) {
    const { type } = metadata;

    if (this.isObj(values) && type === 'body') {
      return this.toLowerCase(values);
    }

    return values;
  }
}
