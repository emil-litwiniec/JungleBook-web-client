export const validateEmail = (email: string): string => {
    /* eslint-disable */
	const emailRegex = new RegExp(
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    /* eslint-enable */
    
	const emailTest = emailRegex.test(email);

	return !emailTest ? "Email is not valid" : "";
};

export const validatePassword = (password: string): string => {
	const passwordRegex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
	const passwordTest = passwordRegex.test(password);

	return !passwordTest
		? "Password should contain minimum eight characters, at least one letter and one number"
		: "";
};

export const validateConfirmPassword = (
	password: string,
	confirmPassword: string
): string => {
    console.log({password, confirmPassword})
	return password !== confirmPassword ? "Password doesn't match" : "";
};
