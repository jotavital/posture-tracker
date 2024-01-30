import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm/browser';

@Entity('exercises')
export class Exercise {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column('varchar')
	total_time: string;

	@Column('varchar')
	end_time: string;

	@CreateDateColumn()
	created_at?: Date;

	@UpdateDateColumn()
	updated_at?: Date;

	@DeleteDateColumn()
	deleted_at?: Date;
}
