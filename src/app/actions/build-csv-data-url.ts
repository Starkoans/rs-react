'use server';

function csvEscape(v: unknown) {
  if (v == null) return '""';
  const s = String(v).replace(/"/g, '""');
  return `"${s}"`;
}

export async function buildCatsCsv(rows: string[][], filename: string) {
  const csv = rows.map((r) => r.map(csvEscape).join(',')).join('\n');
  const withBom = '\uFEFF' + csv;
  return { csv: withBom, filename };
}
