import { randomUUID } from "node:crypto";

export abstract class Entity<TProps> {
	private readonly id: string;
	protected readonly props: TProps;

	public constructor(props: TProps, id?: string) {
		this.id = id ?? randomUUID();
		this.props = props;
	}

	public get ID(): string {
		return this.id;
	}
}
