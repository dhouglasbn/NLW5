// imports
import { Entity,
    PrimaryColumn,
    CreateDateColumn, 
    Column, 
    ManyToOne, 
    JoinColumn } from "typeorm";

import { v4 as uuid } from "uuid";
import { User } from "./User";

// criando a entidade da tabela messages
class Connection{
    @PrimaryColumn()
    id: string;

    @Column()
    admin_id: string;

    @Column()
    socket_id: string;

    // realizando relação manyToOne no DB
    // JoinColumn pra sera a referencia de coluna na relação entre tabelas
    @JoinColumn({ name: "user_id"})
    @ManyToOne(() => User)
    user: User;

    @Column()
    user_id: string;

    @CreateDateColumn()
    created_at: Date;
    
    @CreateDateColumn()
    updated_at: Date;


    // criar uuid assim que a classe for instanciada
    constructor() {
        if (!this.id) {
            this.id = uuid()
        }
    }
}

export { Connection }