import type { Optional } from "@Core/types/optional";
import { Entity } from "@Core/primitives/entity";
import { UniqueEntityId } from "@Core/primitives/unique-entity-id";

import { ISBN } from "../value-objects/isbn";

type BookProps = {
	title: string;
	edition: string;
	genresIds: UniqueEntityId[];
	publisherId: UniqueEntityId;
	authorId: UniqueEntityId;
	isbn: ISBN;
	releasedAt: Date;
	createdAt: Date;
	updatedAt?: Date;
};

export class Book extends Entity<BookProps> {
	public static create(
		props: Optional<BookProps, "genresIds" | "createdAt">,
		id?: UniqueEntityId,
	): Book {
		return new Book(
			{
				...props,
				genresIds: props.genresIds ?? [],
				createdAt: props.createdAt ?? new Date(),
			},
			id,
		);
	}

	private touch(): void {
		this.props.updatedAt = new Date();
	}

	public get Title(): string {
		return this.props.title;
	}

	public set Title(value: string) {
		this.props.title = value;
		this.touch();
	}

	public get Edition(): string {
		return this.props.edition;
	}

	public get GenresIds(): UniqueEntityId[] {
		return this.props.genresIds;
	}

	public addGenreId(genreId: UniqueEntityId): void {
		this.props.genresIds.push(genreId);
		this.touch();
	}

	public get PublisherId(): UniqueEntityId {
		return this.props.publisherId;
	}

	public set PublisherId(value: UniqueEntityId) {
		this.props.publisherId = value;
		this.touch();
	}

	public get ISBN(): ISBN {
		return this.props.isbn;
	}

	public get ReleasedAt(): Date {
		return this.props.releasedAt;
	}

	public set ReleasedAt(value: Date) {
		this.props.releasedAt = value;
		this.touch();
	}

	public get CreatedAt(): Date {
		return this.props.createdAt;
	}

	public get UpdatedAt(): Date | undefined {
		return this.props.updatedAt;
	}
}
