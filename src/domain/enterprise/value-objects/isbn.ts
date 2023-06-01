import { InvalidIsbnValue } from "../errors/invalid-isbn-value";

// 4 digits for ISNB + 1 whitespace + 3 dashes + 10 digits
const ISNB10_MIN_LENGTH = 4 + 1 + 3 + 10;

// 4 digits for ISNB + 1 whitespace + 4 dashes + 10 digits
const ISNB13_MIN_LENGTH = 4 + 1 + 4 + 13;

const DIGITS_FORMAT_REGEX = /[0-9-]+/;

export class ISBN {
	private readonly value: string;

	public constructor(value: string) {
		if (!this.isLengthValid(value)) {
			throw new InvalidIsbnValue(value);
		}

		if (!this.isFormatValid(value)) {
			throw new InvalidIsbnValue(value);
		}

		this.value = value;
	}

	public get Value(): string {
		return this.value;
	}

	private isFormatValid(value: string): boolean {
		if (!value.includes("ISBN")) {
			return false;
		}

		const [, digits] = value.split(" ");

		if (!digits.includes("-")) {
			return false;
		}

		if (!DIGITS_FORMAT_REGEX.test(digits)) {
			return false;
		}

		return true;
	}

	private isLengthValid(value: string): boolean {
		if (
			value.length !== ISNB10_MIN_LENGTH &&
			value.length !== ISNB13_MIN_LENGTH
		) {
			return false;
		}

		return true;
	}
}
