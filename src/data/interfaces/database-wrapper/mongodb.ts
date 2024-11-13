import { ContactWithoutId } from '@/entities/contact';
import type {
	DeleteResult,
	Filter,
	InsertOneResult,
	OptionalId,
	UpdateFilter,
	UpdateResult,
	WithId
} from 'mongodb';

export interface MongoDB<Document> {
	convertToObjectId(id: string): string;
	find(query: Filter<Document>): Promise<WithId<OptionalId<Document>>[]>;
	findOne(query: Filter<Document>): Promise<WithId<Document> | null>;
	insertOne(doc: OptionalId<Document>): Promise<InsertOneResult<Document>>;
	updateOne(
		query: Filter<Document>,
		doc: UpdateFilter<Partial<ContactWithoutId>>
	): Promise<UpdateResult>;
	deleteOne(query: Filter<Document>): Promise<DeleteResult>;
}
