import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AWSAppSyncClient from 'aws-appsync';

const Rehydrate = props => (
    <div
        className={`awsappsync ${
            props.rehydrated
                ? 'awsappsync--rehydrated'
                : 'awsappsync--rehydrating'
        }`}
    >
        {props.rehydrated ? props.children : <span>Loading...</span>}
    </div>
);

class Rehydrated extends Component {
    static propTypes = {
        render: PropTypes.func,
        children: PropTypes.node,
        loading: PropTypes.node,
        client: PropTypes.instanceOf(AWSAppSyncClient).isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            rehydrated: false,
        };
    }

    async componentWillMount() {
        await this.props.client.hydrated();

        this.setState({
            rehydrated: true,
        });
    }

    render() {
        const { render, children, loading } = this.props;
        const { rehydrated } = this.state;

        if (render) return render({ rehydrated });

        if (children) {
            if (loading) return rehydrated ? children : loading;

            return <Rehydrate rehydrated={rehydrated}>{children}</Rehydrate>;
        }
    }
}

export default Rehydrated;
