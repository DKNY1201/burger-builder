export const updateObject = (oldObject, updatingProperties) => {
    return {
        ...oldObject,
        ...updatingProperties
    }
}

export const checkValidity = (rules, value) => {
    if (!rules) {
        return true;
    }

    let isValid = true;

    if (rules.require) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
        const emailRegex = /^\S+@\S+\.\S+$/;
        isValid = emailRegex.test(value);
    }

    return isValid;
}