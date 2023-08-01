import { Entity } from "@Core/primitives/entity";
import { UniqueEntityId } from "@Core/primitives/unique-entity-id";
import type { Optional } from "@Core/types/optional";

type PublisherProps = {
	title: string;
	imageUrl: string;
	publishedBooksIds: UniqueEntityId[];
	createdAt: Date;
	updatedAt?: Date;
};

export class Publisher extends Entity<PublisherProps> {
	public static create(
		props: Optional<PublisherProps, "publishedBooksIds" | "createdAt">,
		id?: UniqueEntityId,
	) {
		return new Publisher(
			{
				...props,
				publishedBooksIds: props.publishedBooksIds ?? [],
				createdAt: props.createdAt ?? new Date(),
			},
			id,
		);
	}

	public get Title(): string {
		return this.props.title;
	}

	public set Title(title: string) {
		this.props.title = title;
		this.touch();
	}

	public get ImageUrl(): string {
		return this.props.imageUrl;
	}

	public set ImageUrl(imageUrl: string) {
		this.props.imageUrl = imageUrl;
		this.touch();
	}

	public get CreatedAt(): Date {
		return this.props.createdAt;
	}

	public get UpdatedAT(): Date | undefined {
		return this.props.updatedAt;
	}

	private touch(): void {
		this.props.updatedAt = new Date();
	}
}
