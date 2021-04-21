import { Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryColumn } from "typeorm";

import { v4 as uuid } from "uuid";

// criando entidade da tabela settings
@Entity("settings")
class Setting {

    @PrimaryColumn()
    id: string;

    @Column()
    username: string;

    @Column()
    chat: boolean;

    @UpdateDateColumn()
    updated_at: Date;

    @CreateDateColumn()
    created_at: Date

    // constructor é uma função que é chamada assim que a classe é instanciada
    constructor() {
        if(!this.id) {
            this.id = uuid()
        }
    }
}

export { Setting }