export const updateObject = (oldObject, updatingProperties) => {
    return {
        ...oldObject,
        ...updatingProperties
    }
}