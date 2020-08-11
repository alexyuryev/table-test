function renderRow(record, idx) {
	const row = document.createElement('tr');
	const { name, surname, fathername } = record;

	row.innerHTML =
		`<td class="l-scrollable__cell l-scrollable__cell-number"><span>${idx}</span></td>` +
    	`<td class="l-scrollable__cell"><span>${name}</span></td>` +
    	`<td class="l-scrollable__cell"><span>${surname}</span></td>` +
    	`<td class="l-scrollable__cell"><span>${fathername}</span></td>`;

	row.className = 'l-scrollable__row';

	return row;
}

const rowHeight = 24;
const maxUnscaledHeight = 1000000;

export const initTable = (containerEl, stubEl, dataEl, recordsProvider) => {

	const totalRowsCount = recordsProvider.totalCount;
	const stubScale = totalRowsCount * rowHeight < maxUnscaledHeight ? 1 : maxUnscaledHeight / (totalRowsCount * rowHeight);
	const stubHeight = totalRowsCount * rowHeight;
	const scaledStubHeight = stubHeight * stubScale;

	stubEl.style.height = scaledStubHeight + 'px';

	function renderRows(firstVisibleRowIndex, visibleRowsCount) {
		dataEl.innerHTML = '';

		recordsProvider.getPage(firstVisibleRowIndex, visibleRowsCount).forEach((r, idx) => {
			dataEl.appendChild(renderRow(r, firstVisibleRowIndex + idx));
		});
	}

	function render() {
		const { scrollTop, clientHeight } = containerEl;

		const scrollPosition = Math.min(scrollTop / (scaledStubHeight - clientHeight), 1.0);

		const visibleRowsCount = Math.ceil(clientHeight / rowHeight);
		const firstVisibleRowIndex = Math.floor(scrollPosition * (totalRowsCount - visibleRowsCount));

		dataEl.style.top =
			scrollTop - Math.round(scrollPosition * ((stubHeight - visibleRowsCount * rowHeight) % rowHeight))
			+ 'px';

		renderRows(firstVisibleRowIndex, visibleRowsCount);
	}

	containerEl.addEventListener('scroll', (e) => {
		requestAnimationFrame(() => {
			render();
		});
	});

	render();
}
