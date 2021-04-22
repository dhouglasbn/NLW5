import { Entity, PrimaryColumn, Column, CreateDateColumn } from  "typeorm";
import { v4 as uuid } from "uuid";

// criando entidade da tabela users
@Entity("users")
class User {
    @PrimaryColumn()
    id: string;

    @Column()
    email: string;
    
    @CreateDateColumn()
    created_at: Date;
    
    // criar uma uuid assim que a classe for instanciada
    constructor() {
        if(!this.id) {
            this.id = uuid()
        }
    }
}

export { User }