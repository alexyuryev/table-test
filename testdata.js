const length = 10000000;

const names = 'Василий, Пётр, Иван, Александр, Дмитрий'.split(', ');
const surnames = 'Иванов, Петров, Сидоров, Заглебский, Стрешалов'.split(', ');
const fathernames = 'Данилович, Петрович, Семёнович, Олегович, Максимович'.split(', ');

const getRecord = (idx) => {
	if (idx < 0 || idx >= length) {
		throw new Error(`invalid record index: ${idx}`);
	}

	const name = names[idx % names.length];
	const surname = surnames[Math.floor(idx / 10) %  surnames.length];
	const fathername = fathernames[Math.floor(idx / 100) % fathernames.length];

	return {
		name,
		surname,
		fathername
	}
}

export const peopleProvider = {
	totalCount: length,
	getPage: (startIdx, count) => {
		if (startIdx < 0 || count < 0 || startIdx + count > length) {
			throw new Error(`invalid start=${startIdx} or count=${count}`);
		}
		return Array.from(Array(count), (_, i) => getRecord(startIdx + i));
	}
}
