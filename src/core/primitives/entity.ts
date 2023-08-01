import { UniqueEntityId } from "./unique-entity-id";

export abstract class Entity<TProps> {
	private readonly _id: UniqueEntityId;
	protected readonly props: TProps;

	protected constructor(props: TProps, id?: UniqueEntityId) {
		this._id = id ?? new UniqueEntityId();
		this.props = props;
	}

	public get ID(): UniqueEntityId {
		return this._id;
	}
}
