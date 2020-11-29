export class Auto{
    constructor(
        public id: number,
        public name: string,
        public year: number,
        public price: number,
        public details: string[],
        public images: string[],
        public video: string
    ){}
}