import { Entity } from "@Core/primitives/entity";
import { UniqueEntityId } from "@Core/primitives/unique-entity-id";
import { Optional } from "@Core/types/optional";

type GenreProps = {
	name: string;
	assignedBooksIds: UniqueEntityId[];
	createdAt: Date;
};

export class Genre extends Entity<GenreProps> {
	public static create(
		props: Optional<GenreProps, "assignedBooksIds" | "createdAt">,
		id?: UniqueEntityId,
	): Genre {
		return new Genre(
			{
				...props,
				assignedBooksIds: props.assignedBooksIds ?? [],
				createdAt: props.createdAt ?? new Date(),
			},
			id,
		);
	}

	public get Name(): string {
		return this.props.name;
	}

	public get AssignedBooksIds(): UniqueEntityId[] {
		return this.props.assignedBooksIds;
	}

	public get CreatedAt(): Date {
		return this.props.createdAt;
	}
}
