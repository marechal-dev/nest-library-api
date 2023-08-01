import { randomUUID } from "node:crypto";

export class UniqueEntityId {
	private readonly _id: string;

	public constructor(id?: string) {
		this._id = id ?? randomUUID();
	}

	public get Value(): string {
		return this._id;
	}
}
