import { Entity } from "@Core/primitives/entity";
import { Optional } from "@Core/types/optional";

import { ISBN } from "../value-objects/isbn";

interface BookProps {
	title: string;
	edition: string;
	genre: string;
	publisher: string;
	isbn: ISBN;
	authorId: string;
	releasedAt: Date;
	createdAt: Date;
	updatedAt?: Date;
}

export class Book extends Entity<BookProps> {
	public constructor(props: Optional<BookProps, "createdAt">, id?: string) {
		super(
			{
				...props,
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

	public get Genre(): string {
		return this.props.title;
	}

	public set Genre(value: string) {
		this.props.genre = value;
		this.touch();
	}

	public get Publisher(): string {
		return this.props.publisher;
	}

	public set Publisher(value: string) {
		this.props.publisher = value;
		this.touch();
	}

	public get ISBN(): string {
		return this.props.isbn.Value;
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

	public get UpdatedAt(): Date | null {
		return this.props.updatedAt ?? null;
	}
}
