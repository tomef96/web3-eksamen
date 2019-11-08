export const getUser = store => store.user
export const getProducts = store => store.products
export const getProduct = (store, id) => {
    return store.products.products.filter(p => p.id === id)[0]
}
