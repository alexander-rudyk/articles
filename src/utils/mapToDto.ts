
export function mapToDto<T>(Dto: new () => T, source: any): T {
    return Object.assign(new Dto(), source);
}