 /*Contrato - diz quais tipos de dados e operações serão realizadas no bd */
 
 
 //dados do schema
export interface FeedbackCreateData{
    type: string;
    comment: string;
    screenshot?: string;
}

 //ação do schema
 export interface FeedbackRepository{
        create: (data: FeedbackCreateData) =>Promise<void>;
 }