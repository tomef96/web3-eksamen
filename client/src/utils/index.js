export const filterOutNullValues = values => {
    return Object.keys(values).reduce((acc, key) => {
        if (values[key] === 0) {
            return { ...acc }
        }
        return { ...acc, [key]: values[key] }
    }, {})
}
