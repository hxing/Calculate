const decompose = (s) => {
	return [...s.matchAll(/\d+|[()+\-*/]/g)].map((i) =>
		["(", ")", "+", "-", "*", "/"].includes(i[0]) ? i[0] : +i[0]
	);
};

const toRPN = (s) => {
	const priority = {
		"+": 1,
		"-": 1,
		"*": 2,
		"/": 2
	};
	const evalOp = (Op) => {
		let popOp, top;
		while (true) {
			if (OpStack.length === 0 || Op === "(") {
				OpStack.push(Op);
				return;
			} else if (Op === ")") {
				if ((popOp = OpStack.pop()) !== "(") {
					RPN.push(popOp);
				} else {
					return;
				}
			} else if (
				(top = OpStack[OpStack.length - 1]) === "(" ||
				priority[Op] > priority[top]
			) {
				OpStack.push(Op);
				return;
			} else {
				RPN.push(OpStack.pop());
			}
		}
	};
	const RPN = [];
	const OpStack = [];
	s.forEach((i) => {
		if (typeof i === "number") {
			RPN.push(i);
		} else {
			evalOp(i);
		}
	});
	while (OpStack.length > 0) {
		RPN.push(OpStack.pop());
	}
	return RPN;
};

const evalRPN = (tokens) => {
	const calculate = (a, b, o) => {
		switch (o) {
			case "+":
				return b + a;
			case "-":
				return b - a;
			case "*":
				return b * a;
			case "/":
				return b / a;
			default:
				console.error("Wrong operator!");
		}
	};

	const numStack = [];
	tokens.forEach((i) => {
		numStack.push(
			typeof i === "number"
				? i
				: calculate(numStack.pop(), numStack.pop(), i)
		);
	});
	return numStack[0];
};

const calculate = (s) => {
	const decomp1 = decompose(s);
	const rpn1 = toRPN(decomp1);
	const rtn1 = evalRPN(rpn1);
	return { decomp1, rpn1, rtn1 };
};

export default calculate;
