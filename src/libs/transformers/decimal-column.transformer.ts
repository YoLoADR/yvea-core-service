export class DecimalColumnTransformer {
  to(data?: number): number {
    return data;
  }
  from(data?: string): number {
    if(!data) return null;
    return parseFloat(data);
  }
}
