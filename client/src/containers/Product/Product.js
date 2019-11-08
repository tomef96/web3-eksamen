import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProduct } from '../../redux/selectors'
import { fetchProducts } from '../../redux/actions'
import Loader from '../../components/Loader/Loader'
import Column from '../../components/Grid/Column'
import Grid from '../../components/Grid/Grid'
import Row from '../../components/Grid/Row'
import { rarityColors, statColors } from '../../constants'

const Product = ({
    match: {
        params: { id: queryId }
    },
    product: { id, name, description, rarity, stock, ...stats },
    fetchProducts
}) => {
    useEffect(() => {
        if (!name) {
            fetchProducts()
        }
    }, [name, fetchProducts])

    const renderStats = () => {
        return Object.keys(stats).map(key => {
            if (stats[key] !== 0) {
                return (
                    <Column
                        size={12}
                        style={{
                            color: statColors[key] || 'grey'
                        }}
                        key={key}
                    >
                        {key[0].toUpperCase() + key.slice(1)}: {stats[key]}
                    </Column>
                )
            } else {
                return null
            }
        })
    }

    if (!name) return <Loader />
    console.log(name)
    const nameStyle = {
        color: rarityColors[rarity] || 'green'
    }
    return (
        <Grid>
            <Row className="mx-auto" style={{ maxWidth: '400px' }}>
                <Column size={12}>{name}</Column>
                <Column size={12}>{description}</Column>
                <Column size={12} className="d-flex flex-row">
                    Rarity:{' '}
                    <div className="pl-2" style={nameStyle}>
                        {rarity}
                    </div>
                </Column>
                <Column size={12}>Stock: {stock}</Column>
                {renderStats()}
            </Row>
        </Grid>
    )
}

Product.defaultProps = {
    product: {}
}

Product.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({ id: PropTypes.string.isRequired })
    })
}

export default connect(
    (
        state,
        {
            match: {
                params: { id: queryId }
            }
        }
    ) => {
        return { product: getProduct(state, parseInt(queryId)) }
    },
    { fetchProducts }
)(Product)
