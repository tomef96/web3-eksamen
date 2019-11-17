import React from 'react'
import Grid from '../Grid/Grid'
import Row from '../Grid/Row'
import Column from '../Grid/Column'

const NotFound = () => {
    return (
        <Grid className="h-100">
            <Row className="d-flex h-100 justify-content-center align-items-center text-center">
                <Column size={12}>
                    <h1>404: Not Found</h1>
                </Column>
            </Row>
        </Grid>
    )
}

export default NotFound
