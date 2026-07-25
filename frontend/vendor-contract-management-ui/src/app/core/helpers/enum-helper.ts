export interface EnumOption<T = number> {

  value: T;

  label: string;

}

export class EnumHelper {

  static toOptions(enumType: any): EnumOption[] {

    return Object.keys(enumType)

      .filter(key => isNaN(Number(key)))

      .map(key => ({

        value: enumType[key],

        label: this.formatLabel(key)

      }));

  }

  private static formatLabel(text: string): string {

    return text

      .replace(/([a-z])([A-Z])/g, '$1 $2')

      .replace(/And/g, '&');

  }

}