export const filterOutNullValues = values => {
    if (!values) return undefined
    return Object.keys(values).reduce((acc, key) => {
        if (values[key] === 0) {
            return { ...acc }
        }
        return { ...acc, [key]: values[key] }
    }, {})
}
