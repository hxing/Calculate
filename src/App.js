import { useState } from "react";
import "./styles.css";
import calculate from "./calculate";

export default function App() {
	const [fomula, setFormula] = useState("130/((3+7)*5)");
	const [decomp, setDecomp] = useState();
	const [rpn, setRpn] = useState();
	const [result, setResult] = useState();

	const handleChange = (e) => {
		setFormula(e.target.value);
	};

	const handleClick = () => {
		console.log(fomula);
		const { decomp1, rpn1, rtn1 } = calculate(fomula);
		setDecomp(decomp1.join(", "));
		setRpn(rpn1.join(", "));
		setResult(rtn1);
	};

	return (
		<div>
			<input type="text" value={fomula} onChange={handleChange} />
			<button onClick={handleClick}>Calculate</button>
			<div>{decomp}</div>
			<div>{rpn}</div>
			<div>{result}</div>
		</div>
	);
}
