import React from 'react';
import {Container, Text, Header, Content, Footer, FooterTab, Button, Icon} from 'native-base';
import {Profile} from './Profile';
import {News} from './News';

const TabScreens = [
    Profile,
    News
]

export class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabIdx: 0
        }
    }

    render() {
        const TabScreen = TabScreens[this.state.tabIdx];
        return (
            <Container>
                <Header/>
                <TabScreen>
                </TabScreen>
                <Content/>
                <Footer>
                    <FooterTab>
                        <Button active={this.state.tabIdx === 0} onPress={() => {
                            this.setState({
                                tabIdx: 0
                            })
                        }}>
                            <Icon name="person"/>
                        </Button>
                        <Button active={this.state.tabIdx === 1} onPress={() => {
                            this.setState({
                                tabIdx: 1
                            })
                        }}>
                            <Icon name="apps"/>
                        </Button>
                    </FooterTab>
                </Footer>
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
