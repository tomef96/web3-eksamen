import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Input from '../Input'
import { statKeys } from '../../constants'

const ProductForm = ({ editing, onSubmit }) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [currentStatKey, setCurrentStatKey] = useState(statKeys[0])
    const [currentStatValue, setCurrentStatValue] = useState('')
    const [stats, setStats] = useState({})

    const filterOutNullStats = editingStats => {
        return Object.keys(editingStats).reduce((acc, stat) => {
            if (editingStats[stat] === 0) {
                return { ...acc }
            }
            return { ...acc, [stat]: editingStats[stat] }
        }, {})
    }

    const resetState = () => {
        setName('')
        setDescription('')
        setCurrentStatKey('')
        setCurrentStatValue('')
        setStats({})
    }

    const handleRemoveStat = stat => {
        console.log('reducing')
        const reduced = Object.keys(stats).reduce((acc, s) => {
            if (stat !== s) {
                return { ...acc, [s]: stats[s] }
            }
            return { ...acc }
        }, {})
        setStats(reduced)
    }

    const renderStats = () => {
        return Object.keys(stats).map(key => (
            <li className="list-group-item" key={key}>
                <div className="d-flex flex-row align-items-center">
                    {key} : {stats[key]}
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

    const handleSetStats = () => {
        const value = parseInt(currentStatValue)
        if (isNaN(value)) {
            alert(`The value of ${currentStatKey} have to be a number`)
        } else {
            if (currentStatKey && currentStatValue) {
                setStats({
                    ...stats,
                    [currentStatKey]: value
                })
            }
        }
    }

    const handleSubmit = event => {
        event.preventDefault()
        onSubmit(name, description, stats)
        resetState()
    }

    useEffect(() => {
        if (editing) {
            const { name, description, stats } = editing
            setName(name)
            setDescription(description)
            setStats(filterOutNullStats(stats))
        }
    }, [editing])

    return (
        <div>
            <form onSubmit={e => handleSubmit(e)}>
                <div className="form-group">
                    <div className="row my-3">
                        <div
                            className="col-12 mx-auto"
                            style={{ maxWidth: '400px' }}
                        >
                            <Input
                                name={'productName'}
                                autoFocus={true}
                                onChange={e => setName(e)}
                                placeholder={'Product Name'}
                                value={name}
                            />
                        </div>
                    </div>

                    <div className="row my-3">
                        <div
                            className="col-12 mx-auto"
                            style={{ maxWidth: '400px' }}
                        >
                            <Input
                                name={'productDescription'}
                                autoFocus={true}
                                onChange={e => setDescription(e)}
                                placeholder={'Product Description'}
                                value={description}
                            />
                        </div>
                    </div>

                    <div className="row my-3">
                        <div
                            className="col-12 mx-auto"
                            style={{ maxWidth: '400px' }}
                        >
                            <ul className="list-group">{renderStats()}</ul>
                        </div>
                    </div>

                    <div className="row my-3">
                        <div
                            className="col-6 ml-auto"
                            style={{ maxWidth: '200px' }}
                        >
                            <select
                                className="custom-select mr-sm-2"
                                onChange={e =>
                                    setCurrentStatKey(e.target.value)
                                }
                            >
                                {statKeys.map(stat => (
                                    <option key={stat} value={stat}>
                                        {stat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-6" style={{ maxWidth: '200px' }}>
                            <Input
                                name={'productStatValue'}
                                autoFocus={true}
                                onChange={e => setCurrentStatValue(e)}
                                placeholder={'Set a value'}
                                value={currentStatValue}
                            />
                        </div>
                        <button
                            type="button"
                            className="btn btn-primary mr-auto"
                            onClick={handleSetStats}
                        >
                            +
                        </button>
                    </div>
                    <div className="row my-3">
                        <div
                            className="col-1 mx-auto"
                            style={{ maxWidth: '400px' }}
                        >
                            <button className="btn btn-primary">
                                {editing ? 'Done' : 'Create'}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

ProductForm.propTypes = {
    editing: PropTypes.object,
    onSubmit: PropTypes.func.isRequired
}

export default ProductForm
