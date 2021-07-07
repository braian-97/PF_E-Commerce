import { Model, Column, Table, CreatedAt, UpdatedAt, DataType, HasOne, ForeignKey, PrimaryKey, HasMany, BelongsToMany } from 'sequelize-typescript';
import Clase from './Clase';
import Rango from './Rango';
import rango_profesor from './rango_profesor';
import User from './Usuario';

interface Calendario{
    disponible: [
        {
            lunes: [
                [number, number]
            ],
            martes: [
                [number, number]
            ],
            
        }
    ],
    ocupado: [
        {
            lunes: [
                [number, number]
            ],
            martes: [
                [number, number]
            ]
        }
    ]
}

@Table
export default class Profesor extends Model {

    
    @Column
    nombre!: string;

    @Column
    apellido!: string;

    @Column
    ciudad!: string;
    
    @Column
    foto!: string;
    
    @Column
    descripcion!: string;

    @Column
    calendario!: Calendario;

    @PrimaryKey
    @ForeignKey(() => User)
    @Column
    email!: string;

    @HasMany(() => Clase)
    clases!: Clase[];

    @BelongsToMany(() => Rango, ()  => rango_profesor)
    rangos!: Rango[]
}


/*const Profesor =  sequelize.define('Profesor', {
    nombre: 
    apellido: 
    foto: 
    descripcion:
    ciudad: 
    // nombre: 'Rodrigo',
    // apellido: 'Callardo', 
    // foto: 'https:///',
    // descripcion: 'hace cuatro años que..',
    // ciudad: 'Buenos Aires'
})*/

export {Profesor}