import React from 'react'
import Grid from '../../components/Grid/Grid'
import Row from '../../components/Grid/Row'
import Column from '../../components/Grid/Column'

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
