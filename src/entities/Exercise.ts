import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm/browser';

@Entity('exercises')
export class Exercise {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column('varchar')
	total_time: string;

	@Column('varchar')
	end_time: string;
}
