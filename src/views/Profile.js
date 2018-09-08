import React from 'react';
import {Container, Text, Header, Content, Footer, FooterTab, Button, Icon} from 'native-base';


export class Profile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Text>Profile</Text>
            </Container>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps
    }
};

//export const Welcome = withNavigation(connect(mapStateToProps)(Home));
