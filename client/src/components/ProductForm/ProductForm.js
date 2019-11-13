import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Input from '../Input'
import { rarityColors, statKeys } from '../../constants'
import { filterOutNullValues } from '../../utils'
import Grid from '../Grid/Grid'
import Row from '../Grid/Row'
import Column from '../Grid/Column'

const ProductForm = ({ editing = {}, onSubmit }) => {
    const [name, setName] = useState(editing.name || '')
    const [description, setDescription] = useState(editing.description || '')
    const [currentStatKey, setCurrentStatKey] = useState(statKeys[0])
    const [currentStatValue, setCurrentStatValue] = useState('')
    const [stats, setStats] = useState(filterOutNullValues(editing.stats) || {})
    const [stock, setStock] = useState(editing.stock || 0)
    const [rarity, setRarity] = useState(editing.rarity || 'common')
    const [imageUrl, setImageUrl] = useState(editing.imageUrl || '')

    const resetState = () => {
        setName('')
        setDescription('')
        setCurrentStatKey('')
        setCurrentStatValue('')
        setStats({})
        setStock('')
        setRarity('common')
        setImageUrl('')
    }

    const handleSetStats = () => {
        const value = parseInt(currentStatValue)
        if (isNaN(value)) {
            alert(`The value of ${currentStatKey} have to be a number`)
        } else {
            if (currentStatKey && currentStatValue) {
                setStats({
                    ...stats,
                    [currentStatKey.toLowerCase()]: value
                })
            }
        }
    }

    const handleRemoveStat = stat => {
        const reduced = Object.keys(stats).reduce((acc, s) => {
            if (stat !== s) {
                return { ...acc, [s]: stats[s] }
            }
            return { ...acc }
        }, {})
        setStats(reduced)
    }

    const handleSetStock = stock => {
        if (stock === '') {
            setStock(stock)
        } else {
            const value = parseInt(stock)
            if (isNaN(value)) {
                alert(`The value of Stock have to be a number`)
            } else {
                setStock(value)
            }
        }
    }

    const handleSubmit = event => {
        event.preventDefault()
        onSubmit({ name, description, stock, rarity, imageUrl, stats })
        resetState()
    }

    const renderStats = () => {
        return Object.keys(stats).map(key => (
            <li className="list-group-item" key={key}>
                <div className="d-flex flex-row align-items-center">
                    {key[0].toUpperCase() + key.slice(1)} : {stats[key]}
                    <button
                        type="button"
                        className="btn btn-outline-danger btn-sm ml-auto"
                        onClick={() => handleRemoveStat(key)}
                    >
                        -
                    </button>
                </div>
            </li>
        ))
    }

    const regularInputs = [
        { id: 'Name', state: name, setState: setName },
        { id: 'Description', state: description, setState: setDescription },
        { id: 'Stock', state: stock, setState: handleSetStock }
    ]

    return (
        <form onSubmit={e => handleSubmit(e)}>
            <Grid fluid={true} className="my-3 m-0 p-2">
                {regularInputs.map(({ id, state, setState }) => (
                    <Row className="form-group" key={id}>
                        <Column
                            size={12}
                            className="mx-auto"
                            style={{ maxWidth: '400px' }}
                        >
                            <Input
                                name={`product${id}`}
                                autoFocus={true}
                                onChange={e => setState(e)}
                                placeholder={id}
                                value={state}
                                id={`product${id}`}
                                label={id}
                            />
                        </Column>
                    </Row>
                ))}

                <Row className="form-group">
                    <Column
                        size={12}
                        className="mx-auto"
                        style={{ maxWidth: '400px' }}
                    >
                        <label>Rarity</label>
                        <select
                            className="custom-select"
                            onChange={e => setRarity(e.target.value)}
                            value={rarity}
                        >
                            {Object.keys(rarityColors).map(rarity => (
                                <option key={rarity} value={rarity}>
                                    {rarity[0].toUpperCase() + rarity.slice(1)}
                                </option>
                            ))}
                        </select>
                    </Column>
                </Row>

                <Row className="form-group">
                    <Column
                        size={12}
                        className="mx-auto"
                        style={{ maxWidth: '400px' }}
                    >
                        <ul className="list-group">{renderStats()}</ul>
                    </Column>
                </Row>

                <Row className="my-3">
                    <Column
                        size={6}
                        className="ml-auto"
                        style={{ maxWidth: '200px' }}
                    >
                        <select
                            className="custom-select mr-sm-2"
                            onChange={e => setCurrentStatKey(e.target.value)}
                        >
                            {statKeys.map(stat => (
                                <option key={stat} value={stat}>
                                    {stat}
                                </option>
                            ))}
                        </select>
                    </Column>

                    <Column
                        size={6}
                        className="mr-auto mr-sm-0"
                        style={{ maxWidth: '200px' }}
                    >
                        <Input
                            name={'productStatValue'}
                            onChange={e => setCurrentStatValue(e)}
                            placeholder={'Set a value'}
                            value={currentStatValue}
                        />
                    </Column>
                    <button
                        type="button"
                        className="btn btn-primary mx-auto mb-auto"
                        onClick={handleSetStats}
                    >
                        +
                    </button>
                </Row>

                <Row className="my-3">
                    <Column
                        size={12}
                        className="mx-auto"
                        style={{ maxWidth: '400px' }}
                    >
                        <img
                            className="img-thumbnail img-fluid"
                            src={imageUrl}
                            alt="Product"
                        />
                    </Column>
                </Row>

                <Row className="my-3">
                    <Column
                        size={12}
                        className="mx-auto"
                        style={{ maxWidth: '400px' }}
                    >
                        <Input
                            name="Image URL"
                            value={imageUrl}
                            placeholder="Image URL"
                            label="Image URL"
                            onChange={e => setImageUrl(e)}
                        />
                    </Column>
                </Row>

                <Row className="my-3">
                    <Column
                        size={1}
                        className="mx-auto"
                        style={{ maxWidth: '400px' }}
                    >
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={e => handleSubmit(e)}
                            data-dismiss="modal"
                        >
                            {editing ? 'Done' : 'Create'}
                        </button>
                    </Column>
                </Row>
            </Grid>
        </form>
    )
}

ProductForm.propTypes = {
    editing: PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
        rarity: PropTypes.string,
        stock: PropTypes.number,
        stats: PropTypes.shape({
            strength: PropTypes.number,
            intellect: PropTypes.number,
            agility: PropTypes.number,
            armour: PropTypes.number,
            damage: PropTypes.number
        }),
        imageUrl: PropTypes.string
    }),
    onSubmit: PropTypes.func.isRequired
}

export default ProductForm
