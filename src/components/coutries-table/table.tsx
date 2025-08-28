import type { Countries } from "../../source/types";
import { headers } from "./headers";

interface Props {
	data: Countries;
}

export const Table = ({ data }: Props) => {
	return (
		<table>
			<thead>
				<tr>
					{headers.map((name, ind) => (
						<th key={ind}>{name}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{Object.entries(data).map(([key, value]) => (
					<tr key={value.iso_code || key}>
						<td>{key}</td>
						<td>{value.iso_code}</td>
						<td>{value.data[0].year}</td>
						<td>{value.data[0].population}</td>
						<td>{value.data[0].co2}</td>
						<td>{value.data[0].co2_per_capita}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};
