declare namespace Express {
    export interface Request {
        user?: {
            id: string;
            // aqui pode vir mais campos que sao injetados no middleware
        }
    }
}