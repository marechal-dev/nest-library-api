import { Entity } from "@Core/primitives/entity";
import { UniqueEntityId } from "@Core/primitives/unique-entity-id";
import { Optional } from "@Core/types/optional";

type AuthorProps = {
	name: string;
	bio?: string;
	booksIds: UniqueEntityId[];
	createdAt: Date;
	updatedAt?: Date;
};

export class Author extends Entity<AuthorProps> {
	public static create(
		props: Optional<AuthorProps, "booksIds" | "createdAt">,
		id?: UniqueEntityId,
	): Author {
		return new Author(
			{
				...props,
				booksIds: props.booksIds ?? [],
				createdAt: props.createdAt ?? new Date(),
			},
			id,
		);
	}

	private touch(): void {
		this.props.updatedAt = new Date();
	}

	public get Name(): string {
		return this.props.name;
	}

	public set Name(value: string) {
		this.props.name = value;
		this.touch();
	}

	public get Bio(): string | undefined {
		return this.props.bio;
	}

	public set Bio(value: string) {
		this.props.bio = value;
		this.touch();
	}

	public get CreatedAt(): Date {
		return this.props.createdAt;
	}

	public get UpdatedAt(): Date | undefined {
		return this.props.updatedAt;
	}
}
