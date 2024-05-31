import {
	Column,
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

	@Column({ type: 'datetime' })
	created_at?: string;

	@UpdateDateColumn({ type: 'datetime' })
	updated_at?: Date;

	@DeleteDateColumn({ type: 'datetime' })
	deleted_at?: Date;
}
