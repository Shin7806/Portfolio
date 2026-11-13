import { works } from './content';
// Exhibition pairings, not a claim about publication dates.
export const exhibition = [6, 3, 7, 4, 5, 12, 1, 8, 10, 11, 9, 2].map(id => works.find(work => work.id === id)!);
export function selectCategory(category: string) { return category === 'All' ? exhibition : exhibition.filter(work => work.cat === category); }
export function adjacentIndex(current: number, direction: number, length: number) { return length > 0 ? ((current + direction) % length + length) % length : 0; }
export function ribbonRows(items = exhibition) {
  const groups = [[1, 7, 4, 6, 10, 5], [12, 3, 9, 11, 2, 8]];
  return groups.map(ids => ids.flatMap(id => { const work = items.find(item => item.id === id); return work ? [work] : []; }));
}
